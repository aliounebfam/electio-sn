import React from 'react'
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbar, frFR, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { useEffect } from 'react';
import useFirestoreQuery from '../../hook/firestore/useFirestoreQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { regionCollectionRef, deleteRegion, updateRegion } from '../../services/RegionService';
import { useState } from 'react';
import { Backdrop, Button, CircularProgress, LinearProgress } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { disableKeyboard, enableKeyboard } from '../../utils/ToogleActivationKeyboard';


export default function Regions() {
    const [oldEditingCell, setOldEditingCell] = useState({})
    let openBackdrop = true;
    let regions = [];
    const { data, status, error } = useFirestoreQuery(
        regionCollectionRef
    );
    if (status === "loading") {
        console.log("Loading...");
        openBackdrop = true;
        disableKeyboard();
    }
    if (status === "error") {
        console.log(`Error: ${error.message}`);
    }
    if (status === "success") {
        regions = data;
        openBackdrop = false;
        enableKeyboard();
    }

    const handleEditCell = (params, event, details) => {
        const { id, field, value } = params;
        if (JSON.stringify(oldEditingCell) !== JSON.stringify({ id, field, value }))
            updateRegion(id, { [field]: field != "nom" ? parseInt(value) : value });
    };


    const handleOldCell = (event) => {
        const { id, field, value } = event;
        setOldEditingCell({ id, field, value })
    };

    const handleDelete = useCallback((id) => () => {
        deleteRegion(id);
    })


    const columns = useMemo
        (() => [
            { field: 'nom', headerName: 'Nom', minWidth: 150, flex: 1, editable: true, sort: "desc" },
            { field: 'latitude', headerName: 'Latitude', type: 'number', minWidth: 100, flex: 0.5, editable: true },
            { field: 'longitude', headerName: 'Longitude', type: 'number', minWidth: 100, flex: 0.5, editable: true },
            {
                field: 'actions',
                type: 'actions',
                headerName: "Actions",
                width: 80,
                editable: false,
                getActions: ({ id }) => {

                    return [
                        <GridActionsCellItem
                            icon={<EditRoundedIcon />}
                            label="Éditer"
                            // onClick={handleEditClick(id)}
                            showInMenu
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Supprimer"
                            onClick={handleDelete(id)}
                        />,
                    ]
                },
            },
        ],
        );

    useEffect(() => {
    }, [])


    return (
        <>
            {/* <Backdrop
                className="text-violet-600 md:ml-[240px] bg-gray-700/10 backdrop-blur-[1px] z-20"
                open={openBackdrop}
            >
                <CircularProgress size={65} color="inherit" />
            </Backdrop> */}
            <span className='text-center sm:text-left text-2xl underline underline-offset-4 decoration-1'>Gestion des régions du Sénégal</span>
            <div className="bg-white mt-5 p-5 rounded-md shadow-md shadow-violet-400">
                <div className='pb-5 text-xl  font-Hind font-normal'>
                    Liste de toutes les régions
                </div>
                <div style={{ height: '70vh', width: '100%' }}>

                    <DataGrid
                        sx={{
                            bgcolor: "#0F172A",
                            color: "white",
                            border: 3,
                            textAlign: "center",
                            borderColor: '#6D28D9',
                            '& .MuiDataGrid-cell:hover': {
                                bgcolor: "#475569"
                            },
                        }}
                        components={{
                            Toolbar: CustomToolbar,
                            LoadingOverlay: LinearProgress
                        }}
                        rows={regions}
                        columns={columns}
                        disableSelectionOnClick
                        sortingOrder={['asc', 'desc']}
                        initialState={{
                            sorting: {
                                sortModel: [{
                                    field: "nom",
                                    sort: "asc"
                                }],
                            },
                        }}
                        checkboxSelection
                        onCellEditCommit={handleEditCell}
                        onCellEditStart={handleOldCell}
                        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                        loading={openBackdrop}
                    />
                </div>
            </div>
        </>
    )
}


function EditToolbar() {

    const handleClick = () => {
        console.log("test");
    };

    return (
        <GridToolbarContainer>
            <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleClick}>
                Ajouter région
            </Button>
        </GridToolbarContainer>
    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <GridToolbarContainer sx={{ mb: "2px" }}>
                <EditToolbar />
            </GridToolbarContainer>
            <GridToolbarContainer sx={{ mb: "2px" }}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
            </GridToolbarContainer>
        </GridToolbarContainer>
    );
}
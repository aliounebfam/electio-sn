import React from 'react'
import { DataGrid, GridActionsCellItem, GridToolbarContainer, frFR, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import useFirestoreQuery from '../../hook/firestore/useFirestoreQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { regionCollectionRef, deleteRegion, updateRegion, addRegion } from '../../services/RegionService';
import { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Typography, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';



export default function Regions() {
    const { enqueueSnackbar } = useSnackbar();
    const [oldEditingCell, setOldEditingCell] = useState({})
    const [openAlert, setOpenAlert] = useState(false)
    const [regionIdWhenDeleting, setRegionIdWhenDeleting] = useState()
    const [rows, setRows] = useState([]);
    let isLoading = true;
    let regions = [];
    const { data, status, error } = useFirestoreQuery(
        regionCollectionRef
    );
    if (status === "loading") {
        isLoading = true;
    }
    if (status === "error") {
        console.log(`Error: ${error.message}`);
        isLoading = false;
    }
    if (status === "success") {
        regions = data;
        if (regions.length != 0 && rows.length != 0)
            isLoading = false;
    }

    useEffect(() => {
        setRows(regions)
    }, [regions])

    const handleEditCell = (params, event, details) => {
        const { id, field, value } = params;
        if (event.type === "click")
            setRows((regions) => {
                return regions.map(region => {
                    if (region.id == params.id) {
                        return params.row;
                    }
                    else {
                        return region;
                    }
                })
            })
        if (event.type !== "click" && JSON.stringify(oldEditingCell) !== JSON.stringify({ id, field, value })) {
            updateRegion(id, { [field]: field != "nom" ? parseFloat(value) : value });
            enqueueSnackbar('Champ correctement modifié', { variant: 'success' })
        }
        else {
            enqueueSnackbar('Modification annulée', { variant: 'success' })
        }
    };
    const handleOldCell = (event) => {
        const { id, field, value } = event;
        setOldEditingCell({ id, field, value })
    };
    const handleDelete = useCallback((id) => () => {
        deleteRegion(id);
        setOpenAlert(false);
        enqueueSnackbar('Région correctement supprimée', { variant: 'success' })
    })
    const handleClickOpenAlert = useCallback((id) => () => {
        setRegionIdWhenDeleting(id)
        setOpenAlert(true);
    })
    const handleClickCloseAlert = () => {
        setOpenAlert(false);
    }
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
                            onClick={handleClickOpenAlert(id)}
                        />,
                    ]
                },
            },
        ],
        );

    return (
        <>
            <Dialog
                open={openAlert}
                onClose={handleClickCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Voulez-vous vraiment supprimer cette région ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ⚠️ Cette action est irréversible
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseAlert}>Annuler</Button>
                    <Button onClick={handleDelete(regionIdWhenDeleting)} autoFocus>
                        Oui, je veux le supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            <span className='text-center sm:text-left text-2xl underline underline-offset-4 decoration-1'>
                Gestion des régions du Sénégal
            </span>
            <div className="bg-white mt-5 p-5 rounded-md shadow-md shadow-violet-400">
                <div className='pb-5 text-xl  font-Hind font-normal'>
                    Liste de toutes les régions
                </div>
                <div style={{ height: '600px', width: '100%' }}>

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
                        rows={rows}
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
                        loading={isLoading}
                    />
                </div>
            </div>
        </>
    )
}


function AddRegionToolbar() {
    const { enqueueSnackbar } = useSnackbar();
    const [openAddRegionBackdrop, setOpenAddRegionBackdrop] = useState(false)
    const { register, handleSubmit, watch, reset, resetField, formState: { errors } } = useForm({ mode: "onChange" });
    const [openAddRegionModal, setOpenAddRegionModal] = useState(false);

    const fullScreen = useMediaQuery('(max-width:325px)');

    const handleClick = () => {
        setOpenAddRegionModal(true);
    };
    const onSubmit = () => {
        setOpenAddRegionBackdrop(true)
        addRegion(watch())
            .then(
                () => {
                    resetField('nom');
                    resetField('latitude');
                    resetField('longitude');
                    enqueueSnackbar('Région correctement ajoutée', { variant: 'success' })
                }
            )
            .finally(() => {
                setOpenAddRegionBackdrop(false)
            })
    }

    const handleCloseAddRegionModal = () => {
        setOpenAddRegionModal(false);
    };

    return (
        <>
            <Backdrop
                className="text-violet-600 bg-gray-700/25 backdrop-blur-[1px] z-50"
                open={openAddRegionBackdrop}
            >
                <CircularProgress size={65} color="inherit" />
            </Backdrop>
            <Dialog
                sx={{ zIndex: "30" }}
                maxWidth={"md"}
                fullWidth={true}
                open={openAddRegionModal}
                onClose={handleCloseAddRegionModal}
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ bgcolor: "#111827", display: "flex", justifyContent: "space-between", alignItems: "center" }} id="alert-dialog-title">
                    {"Ajouter une nouvelle région"}
                    <IconButton sx={{ display: useMediaQuery('(max-width:405px)') ? "none" : undefined }} onClick={handleCloseAddRegionModal}>
                        <CloseRoundedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ bgcolor: "#F3F4F6", color: "#374151", fontWeight: "500" }}>
                    <Box sx={{ display: 'grid', gap: "30px", mt: "5px", }} >
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Nom de la région</Typography>
                            <input type="text" autoComplete='false' name="region" id="region" placeholder='Ex:Dakar' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} sx={{ '&:focus': { borderColor: "red" } }} {...register("nom", {
                                required: "Veuillez entrez le nom de la région que vous voulez ajouter"
                            })} />
                            {errors.nom?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.nom.message}</Typography>}
                        </Box>
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Longitude de la région</Typography>
                            <input type="number" autoComplete='false' name="longitude" id="longitude" placeholder='Ex:-17.3660286' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} sx={{ '&:focus': { borderColor: "red" } }} {...register("longitude", {
                                required: "Veuillez entrez la longitude de la région que vous voulez ajouter"
                            })} />
                            {errors.longitude?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.longitude.message}</Typography>}
                        </Box>
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Latitude de la région</Typography>
                            <input type="number" autoComplete='false' name="latitude" id="latitude" placeholder='Ex:14.7645042' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} sx={{ '&:focus': { borderColor: "red" } }} {...register("latitude", {
                                required: "Veuillez entrez la latitude de la région que vous voulez ajouter"
                            })} />
                            {errors.latitude?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.latitude.message}</Typography>}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ bgcolor: "#111827", display: 'flex', justifyContent: useMediaQuery('(max-width:405px)') ? 'space-between' : "end", pt: 2 }}>
                    <Button onClick={handleCloseAddRegionModal} sx={{ display: useMediaQuery('(min-width:405px)') ? "none" : "block", color: "white", border: "1px solid rgb(109, 40, 217)" }}>
                        Annuler
                    </Button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Button type="submit" sx={{ color: "white", border: "1px solid rgb(109, 40, 217)" }}>
                            Ajouter
                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
            <GridToolbarContainer>
                <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleClick}>
                    Ajouter région
                </Button>
            </GridToolbarContainer>
        </>
    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <GridToolbarContainer sx={{ mb: "2px" }}>
                <AddRegionToolbar />
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
import React from 'react';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, frFR, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { deleteElection, updateElection, addElection, getAllElections } from '../../services/dashboard/ElectionService';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Election() {
    const { enqueueSnackbar } = useSnackbar();
    const [oldEditingCell, setOldEditingCell] = useState({});
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [electionIdWhenDeleting, setElectionIdWhenDeleting] = useState();
    const [elections, setElections] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const getElections = () => {
        setIsFetchingData(true)
        getAllElections()
            .then((response) => {
                if (!response.error)
                    setElections(response)
                else
                    enqueueSnackbar(response.message, { variant: 'error' })
            })
            .finally(() => setIsFetchingData(false))
    }

    const updateElectionStateWhenAddingNewElection = (newElectionData) => {
        const newElectionDataWithId = { id: newElectionData.year, ...newElectionData }
        setElections((elections) => [...elections, newElectionDataWithId]);
    }

    const handleStartElection = (id) => {
        updateElection(id, { state: "inProgress" })
            .then(() => {
                enqueueSnackbar('Élection correctement lancée', { variant: 'success' });
                setElections(
                    elections.map(
                        election => {
                            if (election.id != id) return election
                            else return { ...election, state: "inProgress" }
                        }
                    ));
            });
    }

    const handleStopElection = (id) => {
        updateElection(id, { state: "stopped" })
            .then(() => {
                enqueueSnackbar('Élection correctement arrêtée', { variant: 'success' });
                setElections(
                    elections.map(
                        election => {
                            if (election.id != id) return election
                            else return { ...election, state: "stopped" }
                        }
                    ));
            });
    }

    useEffect(() => {
        getElections();
    }, [])

    const handleEditCell = (params, event, details) => {
        const { id, field, value } = params;
        if (event.type === "click")
            setElections((elections) => {
                return elections.map(election => {
                    if (election.id == params.id) {
                        return params.row;
                    }
                    else {
                        return election;
                    }
                })
            });
        if (event.type !== "click" && JSON.stringify(oldEditingCell) !== JSON.stringify({ id, field, value })) {
            updateElection(id, { [field]: field != "nom" ? parseFloat(value) : value })
                .then(() => {
                    enqueueSnackbar('Champ correctement modifié', { variant: 'success' })
                });
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
        setIsDeleting(true);
        deleteElection(id).then(() => {
            enqueueSnackbar('Élection correctement supprimée', { variant: 'success' });
            setElections((elections) => elections.filter((election) => election.id != id));
            setOpenDeleteAlert(false);
        })
            .finally(() => setIsDeleting(false));
    })
    const handleClickOpenDeleteAlert = useCallback((id) => () => {
        setElectionIdWhenDeleting(id)
        setOpenDeleteAlert(true);
    });
    const handleClickCloseDeleteAlert = () => {
        if (!isDeleting)
            setOpenDeleteAlert(false);
    };

    const columns = useMemo
        (() => [
            {
                field: 'year', headerName: 'Année', minWidth: 75, flex: 1, editable: true, type: "number", sort: "desc", headerAlign: "left", align: "left",
                valueFormatter: (params) => {
                    if (params.value == null) {
                        return '';
                    }
                    const valueFormatted = params.value;
                    return `${valueFormatted}`;
                },
            },
            {
                field: 'state', headerName: 'État', minWidth: 100, flex: 1,
                type: 'singleSelect',
                valueOptions: ['created', 'inProgress', 'stopped'],
                valueFormatter: (params) => {
                    if (params.value == "inProgress") {
                        return 'En cours';
                    }
                    if (params.value == "created") {
                        return 'Créée';
                    }
                    if (params.value == "stopped") {
                        return 'Arrêtée';
                    }
                    else
                        return 'État inconnu🚨';
                },
            },
            {
                field: 'control',
                headerName: 'Contrôle',
                flex: 0.5,
                align: "center",
                headerAlign: "center",
                editable: false,
                minWidth: 130,
                filterable: false,
                sortable: false,
                renderCell: (params) => (
                    <>
                        {
                            params.row.state == "inProgress" ?
                                <Button
                                    sx={{
                                        color: "white", bgcolor: "#EF4444", "&:hover": {
                                            bgcolor: "#DC2626"
                                        }
                                    }}
                                    onClick={() => handleStopElection(params.id)}
                                    variant="contained"
                                    size="small"
                                    tabIndex={params.hasFocus ? 0 : -1}
                                >
                                    Arrêter
                                </Button> :
                                params.row.state == "created" ?
                                    <Button
                                        sx={{
                                            color: "white", bgcolor: "#7C3AED", "&:hover": {
                                                bgcolor: "#6D28D9"
                                            }
                                        }}
                                        onClick={() => handleStartElection(params.id)}
                                        variant="contained"
                                        size="small"
                                        tabIndex={params.hasFocus ? 0 : -1}
                                    >
                                        Démarrer
                                    </Button> :
                                    params.row.state == "stopped" ?
                                        <span className='select-none cursor-not-allowed inline-block bg-gray-700 text-white rounded px-2 py-1 text-sm'>Election terminée</span> :
                                        <span>
                                            🚧
                                        </span>
                        }
                    </>
                ),
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: "Actions",
                width: 80,
                editable: false,
                headerAlign: "center",
                flex: 0.2,
                minWidth: 69,
                getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Supprimer"
                            onClick={handleClickOpenDeleteAlert(id)}
                        />,
                    ]
                },
            },
        ],
        );

    return (
        <>
            <Dialog
                open={openDeleteAlert}
                onClose={handleClickCloseDeleteAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Voulez-vous vraiment supprimer cette élection ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ⚠️ Cette action est irréversible
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isDeleting} onClick={handleClickCloseDeleteAlert}>Annuler</Button>
                    <LoadingButton id="loadingIndicator" loading={isDeleting} onClick={handleDelete(electionIdWhenDeleting)} autoFocus>
                        Oui, je veux la supprimer
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <span className='text-center sm:text-left text-2xl underline underline-offset-4 decoration-1'>
                Gestion des élections du Sénégal
            </span>
            <div className="bg-white mt-5 p-5 rounded-md shadow-md shadow-violet-400">
                <div className='pb-5 text-xl  font-Hind font-normal'>
                    Liste de toutes les élections
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
                        componentsProps={{
                            toolbar: { updateElectionStateWhenAddingNewElection: updateElectionStateWhenAddingNewElection }
                        }}
                        rows={elections}
                        columns={columns}
                        disableSelectionOnClick
                        sortingOrder={['asc', 'desc']}
                        initialState={{
                            sorting: {
                                sortModel: [{
                                    field: "year",
                                    sort: "asc"
                                }],
                            },
                        }}
                        checkboxSelection
                        onCellEditCommit={handleEditCell}
                        onCellEditStart={handleOldCell}
                        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                        loading={isFetchingData}
                    />
                </div>
            </div>
        </>
    )
};


function AddElectionToolbar({ updateElectionStateWhenAddingNewElection }) {
    const { enqueueSnackbar } = useSnackbar();
    const [openAddAlert, setOpenAddAlert] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        const electionData = {
            year: new Date().getFullYear(),
            state: "created"
        };
        setIsAdding(true);
        addElection(electionData).then(() => {
            enqueueSnackbar('Élection correctement ajoutée', { variant: 'success' });
            updateElectionStateWhenAddingNewElection(electionData);
            setOpenAddAlert(false);
        })
            .finally(() => setIsAdding(false));
    }
    const handleClickOpenAddAlert = () => {
        setOpenAddAlert(true);
    };
    const handleClickCloseAddAlert = () => {
        if (!isAdding)
            setOpenAddAlert(false);
    };

    return (
        <>
            <Dialog
                open={openAddAlert}
                onClose={handleClickCloseAddAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={""}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Voulez-vous ajouter une élection pour l'année en cours ?"}
                </DialogTitle>
                <DialogActions>
                    <Button disabled={isAdding} onClick={handleClickCloseAddAlert}>Annuler</Button>
                    <LoadingButton id="loadingIndicator" loading={isAdding} onClick={handleAdd} autoFocus>
                        Oui, je le veux
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <GridToolbarContainer>
                <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleClickOpenAddAlert}>
                    Ajouter une élection
                </Button>
            </GridToolbarContainer>
        </>
    );
};

function CustomToolbar({ updateElectionStateWhenAddingNewElection }) {
    return (
        <GridToolbarContainer sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <GridToolbarContainer sx={{ mb: "2px" }}>
                <AddElectionToolbar updateElectionStateWhenAddingNewElection={updateElectionStateWhenAddingNewElection} />
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
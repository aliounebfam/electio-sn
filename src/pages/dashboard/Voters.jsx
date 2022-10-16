import React from 'react';
import { DataGrid, GridActionsCellItem, frFR, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { deleteVoter, updateVoter, getAllVoters } from '../../services/dashboard/VoterService';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuth } from '../../context/AuthContext';
import emailjs from '@emailjs/browser';

export default function Voters() {
    const { enqueueSnackbar } = useSnackbar();
    const [oldEditingCell, setOldEditingCell] = useState({})
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
    const [openValidateAlert, setOpenValidateAlert] = useState(false)
    const [voterSelectedData, setVoterSelectedData] = useState()
    const [voters, setVoters] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const { signUp } = useAuth();

    const getVoters = () => {
        setIsFetchingData(true)
        getAllVoters()
            .then((response) => {
                if (!response.error)
                    setVoters(response)
                else
                    enqueueSnackbar(response.message, { variant: 'error' })
            })
            .finally(() => setIsFetchingData(false))
    };

    useEffect(() => {
        getVoters();
    }, []);

    const handleEditCell = (params, event, details) => {
        const { id, field, value } = params;
        if (JSON.stringify(oldEditingCell) !== JSON.stringify({ id, field, value })) {
            updateVoter(id, { [field]: value })
                .then(() => {
                    enqueueSnackbar('Champ correctement modifié', { variant: 'success' })
                });
        }
        else {
            enqueueSnackbar('Aucune modification effectuée', { variant: 'success' })
        };
    };
    const handleOldCell = (event) => {
        const { id, field, value } = event;
        setOldEditingCell({ id, field, value });
    };

    const handleDelete = useCallback((id) => () => {
        setIsDeleting(true);
        deleteVoter(id).then(() => {
            enqueueSnackbar('Électeur correctement supprimé', { variant: 'success' });
            setVoters((voters) => voters.filter((voter) => voter.id != id));
            setOpenDeleteAlert(false);
        })
            .finally(() => setIsDeleting(false));
    });
    const handleClickOpenDeleteAlert = useCallback((id) => () => {
        setVoterSelectedData(id);
        setOpenDeleteAlert(true);
    });
    const handleClickCloseDeleteAlert = () => {
        if (!isDeleting)
            setOpenDeleteAlert(false);
    };

    const handleClickOpenValidateAlert = useCallback((data) => () => {
        setVoterSelectedData(data);
        setOpenValidateAlert(true);
    });
    const handleClickCloseValidateAlert = () => {
        if (!isValidating)
            setOpenValidateAlert(false);
    };
    const handleValidate = useCallback((data) => async () => {
        setIsValidating(true);
        const { emailAddress: email } = data.row;
        const { firstName } = data.row;
        const { lastName } = data.row;
        const voterName = lastName + " " + firstName;
        const password = crypto.randomUUID().slice(0, 13);
        await signUp(email, password)
            .then(() => {
                updateVoter(data.id, { isRegistered: true })
                    .then(() => {
                        setVoters(voters.map(voter => {
                            if (voter.id == data.id)
                                return { ...voter, isRegistered: true };
                            else
                                return voter;
                        }));
                        emailjs.send("service_ps3pobi", "template_5jwhysh", {
                            voterName,
                            voterEmail: email,
                            voterPassword: password,
                        }, "Me36dqvXStfJFrj6r").then(function (response) {
                            enqueueSnackbar('Un mail a été envoyé à l\'utilisateur correspondant avec ses informations de connexion', { variant: 'success' });
                            setOpenValidateAlert(false);
                        }, function (error) {
                            enqueueSnackbar('Une erreur est survenue lors de l\'envoi du mail à l\'utilisateur correspondant', { variant: 'error' });
                        })
                            .finally(() => {
                                setIsValidating(false);
                            });
                    });
            });
    });

    const columns = useMemo
        (() => [
            {
                field: 'photo', headerName: 'Photo', minWidth: 100, flex: 0.5, renderCell: (params) => (
                    <Tooltip
                        title={
                            <img
                                src={params.value}
                                alt="photo électeur"
                                style={{
                                    transform: "scaleX(-1)",
                                    width: "250px"
                                }}
                            />
                        } arrow>
                        <img src={params.value} alt='photo électeur' style={{
                            transform: "scaleX(-1)"
                        }} />
                    </Tooltip>
                )
            },
            { field: 'firstName', headerName: 'Nom', minWidth: 150, flex: 1, sort: "desc" },
            { field: 'lastName', headerName: 'Prénom', minWidth: 200, flex: 1 },
            { field: 'dateOfBirth', headerName: 'Date de Naissance', type: 'date', minWidth: 140, flex: 0.5 },
            { field: 'placeOfBirth', headerName: 'Lieu de Naissance', minWidth: 145, flex: 0.5 },
            { field: 'phoneNumber', headerName: 'Numéro de téléphone', minWidth: 160, flex: 0.5 },
            { field: 'emailAddress', headerName: 'Adresse email', minWidth: 250, flex: 0.5 },
            { field: 'district', headerName: 'Quartier', minWidth: 200, flex: 0.5 },
            { field: 'isRegistered', headerName: 'Inscrit', type: "boolean", minWidth: 60, flex: 0.2 },
            { field: 'isCandidate', headerName: 'Candidat', type: "boolean", minWidth: 85, flex: 0.2, editable: true },
            { field: 'isAdmin', headerName: 'Admin', type: "boolean", minWidth: 60, flex: 0.2, editable: true },
            { field: 'isSuperAdmin', headerName: 'Super Admin', type: "boolean", minWidth: 100, flex: 0.2, editable: true },
            {
                field: 'actions',
                type: 'actions',
                headerName: "Actions",
                width: 80,
                editable: false,
                getActions: ({ id, row }) => {

                    if (!row.isRegistered) {
                        return [
                            <GridActionsCellItem
                                icon={<DoneRoundedIcon />}
                                label="Valider"
                                onClick={handleClickOpenValidateAlert({ id, row })}
                            />,
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                label="Supprimer"
                                onClick={handleClickOpenDeleteAlert(id)}
                            />
                        ]
                    }
                    else
                        return [
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                label="Supprimer"
                                onClick={handleClickOpenDeleteAlert(id)}
                            />
                        ]
                },
            },
        ],
        );

    return (
        <>
            {/* Delete dialog */}
            <Dialog
                open={openDeleteAlert}
                onClose={handleClickCloseDeleteAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Voulez-vous vraiment supprimer cet électeur ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ⚠️ Cette action est irréversible
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isDeleting} onClick={handleClickCloseDeleteAlert}>Annuler</Button>
                    <LoadingButton id="loadingIndicator" loading={isDeleting} onClick={handleDelete(voterSelectedData)} autoFocus>
                        Oui, je veux le supprimer
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            {/* End Delete dialog */}

            {/* Validate dialog */}
            <Dialog
                open={openValidateAlert}
                onClose={handleClickCloseValidateAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Voulez-vous ajouter cet utilisateur comme électeur ?"}
                </DialogTitle>
                <DialogActions>
                    <Button disabled={isValidating} onClick={handleClickCloseValidateAlert}>Annuler</Button>
                    <LoadingButton id="loadingIndicator" loading={isValidating} onClick={handleValidate(voterSelectedData)} autoFocus>
                        Oui, je veux l'ajouter
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            {/* End Validate dialog */}

            <span className='text-center sm:text-left text-2xl underline underline-offset-4 decoration-1'>
                Gestion des électeurs du Sénégal
            </span>
            <div className="bg-white mt-5 p-5 rounded-md shadow-md shadow-violet-400">
                <div className='pb-5 text-xl  font-Hind font-normal'>
                    Liste de tous les électeurs
                </div>
                <div style={{ height: '600px', width: '100%' }}>

                    <DataGrid
                        density="comfortable"
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
                            Toolbar: GridToolbar,
                            LoadingOverlay: LinearProgress
                        }}
                        rows={voters}
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
                        loading={isFetchingData}
                    />
                </div>
            </div>
        </>
    )
}
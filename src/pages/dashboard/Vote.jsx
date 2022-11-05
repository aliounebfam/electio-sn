import React from 'react';
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { getAllCandidateFromSpecificYear, getVoterDataFromEmail, updateVoter } from '../../services/dashboard/VoterService';
import HowToVoteRoundedIcon from '@mui/icons-material/HowToVoteRounded';
import { getElectionStateFromCurrentYear } from '../../services/dashboard/ElectionService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { arrayUnion } from 'firebase/firestore';
import { updateVoteData } from '../../services/dashboard/VoteService';

export default function Votes() {
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [openVoteDialog, setOpenVoteDialog] = useState(false);
    const [selectedCandidateData, setSelectedCandidateData] = useState(undefined);
    const [candidates, setCandidates] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [isVoting, setIsVoting] = useState(false);
    const [electionState, setElectionState] = useState(undefined);
    const fullScreen = useMediaQuery('(max-width:325px)');
    const { currentUser } = useAuth();
    const [voterData, setVoterData] = useState(undefined);
    const navigate = useNavigate();

    const getCandidates = () => {
        setIsFetchingData(true)
        getAllCandidateFromSpecificYear(new Date().getFullYear())
            .then((response) => {
                if (!response.error)
                    setCandidates(response)
                else
                    enqueueSnackbar(response.message, { variant: 'error' })
            })
            .finally(() => setIsFetchingData(false))
    };

    const handleClickConfirmVote = () => {
        setIsVoting(true);
        updateVoter(voterData.id, {
            votedYears: arrayUnion(new Date().getFullYear())
        })
            .then(response => {
                updateVoteData({ candidateId: selectedCandidateData.id, voterDistrict: voterData.district })
                    .then(() => enqueueSnackbar("Vote enregistré avec succès", { variant: 'success' }))
                    .finally(() => {
                        setIsVoting(false);
                        navigate("/dashboard", { replace: true })
                    })
            })
    }

    const handleClickOpenVoteDialog = (data) => {
        setSelectedCandidateData(data)
        setOpenVoteDialog(true);
    };
    const handleClickCloseVoteDialog = () => {
        if (!isVoting)
            setOpenVoteDialog(false);
    };

    useEffect(() => {
        getCandidates();
        getVoterDataFromEmail(currentUser.email)
            .then(
                response => {
                    setVoterData(response)
                }
            );
        getElectionStateFromCurrentYear().then((r) => setElectionState(r));
    }, []);

    const columns = useMemo
        (() => [
            {
                field: 'photo', headerName: 'Photo', minWidth: 100, renderCell: (params) => (
                    <Tooltip
                        title={
                            <img
                                src={params.value}
                                alt="photo électeur"
                                style={{
                                    transform: "scaleX(-1)",
                                }}
                            />
                        } arrow>
                        <img src={params.value} alt='photo électeur' style={{
                            transform: "scaleX(-1)"
                        }} />
                    </Tooltip>
                )
            },
            {
                field: 'fullName',
                headerName: 'Nom complet',
                minWidth: 250,
                flex: 1,
                valueGetter: (params) => {
                    return `${params.row.lastName || ''} ${params.row.firstName || ''}`;
                },
            },
            {
                field: 'actions',
                headerName: "Actions",
                editable: false,
                headerAlign: "center",
                align: "center",
                flex: 0.5,
                minWidth: 150,
                disableColumnMenu: true,
                sortable: false,
                hide: electionState !== "inProgress" ||
                    voterData?.votedYears?.includes(new Date().getFullYear()) ||
                    !voterData?.canVoted
                ,
                renderCell: (params) => (
                    <Button
                        sx={{
                            color: "white", bgcolor: "#7C3AED", "&:hover": {
                                bgcolor: "#6D28D9"
                            }
                        }}
                        startIcon={<HowToVoteRoundedIcon />}
                        onClick={() => handleClickOpenVoteDialog(params.row)}
                        variant="contained"
                        size="large"
                        tabIndex={params.hasFocus ? 0 : -1}
                    >
                        Voter
                    </Button>
                )
            },
        ],
        );

    return (
        <div className="bg-white mt-5 p-5 rounded-md shadow-md shadow-violet-400">
            <div className='pb-3 text-[23px] font-Hind font-normal'>
                Voter pour le candidat de votre choix.
            </div>
            {voterData != undefined || electionState != undefined ?
                <>
                    {
                        !voterData?.canVoted ?
                            <Alert sx={{ marginBottom: "10px" }} severity="error">
                                Vous n'avez pas la possibilité de voter.
                            </Alert> :
                            undefined
                    }
                    {
                        electionState != "inProgress" && voterData?.canVoted && !voterData?.votedYears?.includes(new Date().getFullYear()) ?
                            <Alert sx={{ marginBottom: "10px" }} severity="warning">
                                Pas encore d'élection démarrée sur cette année en cours !
                            </Alert> :
                            undefined
                    }
                    {
                        voterData?.votedYears?.includes(new Date().getFullYear()) &&
                            voterData?.canVoted ?
                            <Alert sx={{ marginBottom: "10px" }} severity="success">
                                Vous avez déjà voté(e).
                            </Alert> :
                            undefined
                    }
                </> :
                undefined
            }
            <Dialog
                sx={{ zIndex: "30" }}
                maxWidth={"md"}
                fullWidth={true}
                open={openVoteDialog}
                onClose={handleClickCloseVoteDialog}
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ bgcolor: "#111827", display: "flex", justifyContent: "space-between", alignItems: "center" }} id="alert-dialog-title">
                    {"Voulez-vous votez pour ce candidat ?"}
                    <IconButton sx={{ display: useMediaQuery('(max-width:405px)') ? "none" : undefined }} onClick={handleClickCloseVoteDialog}>
                        <CloseRoundedIcon />
                    </IconButton>
                </DialogTitle>
                {/* selectedCandidateData */}
                <DialogContent dividers sx={{ bgcolor: "#F3F4F6", color: "#374151", fontWeight: "500" }}>
                    <Box sx={{ display: 'grid', gap: "30px", mt: "5px", }} >
                        <Box sx={{}}>
                            <Typography sx={{
                                fontFamily: "Hind", fontSize: "23px", textAlign: "center", textDecoration: "underline"
                            }}>
                                Informations du candidat sélectionné :
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                fontFamily: "Hind", fontSize: "20px"
                            }}>
                                Photo du candidat :
                            </Typography>
                            <img width={300} src={selectedCandidateData?.photo} alt={"photo de " + selectedCandidateData?.firstName + " " + selectedCandidateData?.lastName} />
                        </Box>
                        <Box>
                            <Typography sx={{
                                display: "inline", fontFamily: "Hind", fontSize: "20px"
                            }}>
                                Nom et Prénom(s) :&nbsp;
                            </Typography>
                            <Typography sx={{ fontSize: "20px", display: "inline", fontWeight: "600" }}>
                                {selectedCandidateData?.lastName + " " + selectedCandidateData?.firstName}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ bgcolor: "#111827", display: 'flex', justifyContent: useMediaQuery('(max-width:405px)') ? 'space-between' : "end", pt: 2 }}>
                    <Button onClick={handleClickCloseVoteDialog} sx={{ display: useMediaQuery('(min-width:405px)') ? "none" : "block", color: "white", border: "1px solid rgb(109, 40, 217)" }}>
                        Annuler
                    </Button>
                    <LoadingButton sx={{ color: "white", border: "1px solid rgb(109, 40, 217)" }} id="loadingIndicator" loading={isVoting} onClick={handleClickConfirmVote} autoFocus>
                        Oui, je le veux
                    </LoadingButton>
                </DialogActions>
            </Dialog>

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
                        }
                    }}
                    components={{
                        Toolbar: GridToolbar,
                        LoadingOverlay: LinearProgress
                    }}
                    rows={candidates}
                    columns={columns}
                    disableSelectionOnClick
                    sortingOrder={['asc', 'desc']}
                    initialState={{
                        sorting: {
                            sortModel: [{
                                field: "fullname",
                                sort: "asc"
                            }],
                        },
                    }}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    loading={isFetchingData}
                />
            </div>
        </div>
    )
}


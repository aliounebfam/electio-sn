import React from 'react'
import { DataGrid, GridActionsCellItem, GridToolbarContainer, frFR, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { deleteDepartment, updateDepartment, addDepartment, getAllDepartments } from '../../services/dashboard/DepartmentService';
import { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, LinearProgress, Typography, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { getAllRegionsNameAndId } from '../../services/dashboard/RegionService';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';


export default function Departments() {
    const { enqueueSnackbar } = useSnackbar();
    const [oldEditingCell, setOldEditingCell] = useState({})
    const [openDeleteDepartmentAlert, setOpenDeleteDepartmentAlert] = useState(false)
    const [departmentIdWhenDeleting, setDepartmentIdWhenDeleting] = useState()
    const [departments, setDepartments] = useState([]);
    const [regionsNameWithId, setRegionsNameWithId] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const updateDepartmentStateWhenAddingNewDepartment = (newDepartmentData) => {
        const newDepartmentDataWithId = { id: newDepartmentData.nom + newDepartmentData.latitude + newDepartmentData.longitude, ...newDepartmentData }
        setDepartments([...departments, newDepartmentDataWithId])
    }

    const getDepartments = () => {
        setIsFetchingData(true)
        getAllDepartments()
            .then((response) => {
                if (!response.error) {
                    setDepartments(response);
                }
                else
                    enqueueSnackbar(response.message, { variant: 'error' })
            })
            .catch(() => { })
            .finally(() => setIsFetchingData(false))
    }

    const getRegionsNameWithId = async () => {
        await getAllRegionsNameAndId()
            .then(res => setRegionsNameWithId(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getDepartments();
        getRegionsNameWithId();
    }, [])

    const handleEditCell = (params, event, details) => {
        let { id, field, value } = params;
        if (params.field != "regionName" && event.type === "click")
            setDepartments((departments) => {
                return departments.map(department => {
                    if (department.id == params.id) {
                        return params.row;
                    }
                    else {
                        return department;
                    }
                })
            })
        if ((event.type !== "click" || (params.field === "regionName" && event.type === "click")) && JSON.stringify(oldEditingCell) !== JSON.stringify({ id, field, value })) {
            if (field == "regionName") {
                const [regionNameAndId] = regionsNameWithId.filter(region => region.nom == value);
                value = regionNameAndId;
            }
            updateDepartment(id, { [field]: ((field != "nom" && field != "regionName") ? (value) : value) })
                .then(() => enqueueSnackbar('Champ correctement modifié', { variant: 'success' }));
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
        setIsDeleting(true)
        deleteDepartment(id)
            .then(() => {
                setDepartments((departments) => departments.filter((department) => department.id != id));
                enqueueSnackbar('Département correctement supprimée', { variant: 'success' })
                setOpenDeleteDepartmentAlert(false);
            })
            .finally(() => setIsDeleting(false));
    })
    const handleClickOpenAlert = useCallback((id) => () => {
        setDepartmentIdWhenDeleting(id)
        setOpenDeleteDepartmentAlert(true);
    })
    const handleClickCloseAlert = () => {
        if (!isDeleting)
            setOpenDeleteDepartmentAlert(false);
    }
    const columns = useMemo
        (() => [
            { field: 'nom', headerName: 'Nom', minWidth: 150, flex: 0.6, editable: true, sort: "desc" },
            { field: 'latitude', headerName: 'Latitude', valueFormatter: ({ value }) => (value), minWidth: 100, flex: 0.3, editable: true },
            { field: 'longitude', headerName: 'Longitude', valueFormatter: ({ value }) => (value), minWidth: 100, flex: 0.3, editable: true },
            { field: 'regionName', headerName: 'Région', type: "singleSelect", minWidth: 120, flex: 0.4, editable: true, valueOptions: () => { return regionsNameWithId.map((region) => { return region.nom }) } },
            {
                field: 'actions',
                type: 'actions',
                headerName: "Actions",
                width: 80,
                editable: false,
                getActions: ({ id }) => {
                    return [
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
                open={openDeleteDepartmentAlert}
                onClose={handleClickCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Voulez-vous vraiment supprimer ce département ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ⚠️ Cette action est irréversible
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isDeleting} onClick={handleClickCloseAlert}>Annuler</Button>
                    <LoadingButton id="loadingIndicator" loading={isDeleting} onClick={handleDelete(departmentIdWhenDeleting)} autoFocus>
                        Oui, je veux le supprimer
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <span className='text-center sm:text-left text-2xl underline underline-offset-4 decoration-1'>
                Gestion des départements du Sénégal
            </span>
            <div className="bg-white mt-5 p-5 rounded-md shadow-md shadow-violet-400">
                <div className='pb-5 text-xl  font-Hind font-normal'>
                    Liste de tout les départements
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
                            toolbar: { regionsNameWithId, updateDepartmentStateWhenAddingNewDepartment }
                        }}
                        rows={departments}
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


function AddDepartmentToolbar({ regionsNameWithId, updateDepartmentStateWhenAddingNewDepartment }) {
    const { enqueueSnackbar } = useSnackbar();
    const [openAddDepartmentBackdrop, setOpenAddDepartmentBackdrop] = useState(false)
    const { register, handleSubmit, watch, resetField, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const [openAddDepartmentModal, setOpenAddDepartmentModal] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("none");

    const fullScreen = useMediaQuery('(max-width:325px)');

    const handleClickAddDepartmentButton = () => {
        setOpenAddDepartmentModal(true);
    };

    const onSubmit = () => {
        setOpenAddDepartmentBackdrop(true)
        const [regionNameAndId] = regionsNameWithId.filter(region => region.nom == watch().regionName);
        addDepartment({ regionNameAndId, ...watch() })
            .then(
                () => {
                    updateDepartmentStateWhenAddingNewDepartment(watch());
                    setSelectedRegion('none');
                    resetField('nom');
                    resetField('latitude');
                    resetField('longitude');
                    resetField('regionName');
                    enqueueSnackbar('Département correctement ajoutée', { variant: 'success' })
                }
            )
            .finally(() => {
                setOpenAddDepartmentBackdrop(false)
            })
    }

    const handleCloseAddDepartmentModal = () => {
        setOpenAddDepartmentModal(false);
    };

    return (
        <>
            <Backdrop
                className="text-violet-600 bg-gray-700/25 backdrop-blur-[1px] z-50"
                open={openAddDepartmentBackdrop}
            >
                <CircularProgress size={65} color="inherit" />
            </Backdrop>
            <Dialog
                sx={{ zIndex: "30" }}
                maxWidth={"md"}
                fullWidth={true}
                open={openAddDepartmentModal}
                onClose={handleCloseAddDepartmentModal}
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ bgcolor: "#111827", display: "flex", justifyContent: "space-between", alignItems: "center" }} id="alert-dialog-title">
                    {"Ajouter un nouveau département"}
                    <IconButton sx={{ display: useMediaQuery('(max-width:405px)') ? "none" : undefined }} onClick={handleCloseAddDepartmentModal}>
                        <CloseRoundedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ bgcolor: "#F3F4F6", color: "#374151", fontWeight: "500" }}>
                    <Box sx={{ display: 'grid', gap: "30px", mt: "5px", }} >
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Nom du département</Typography>
                            <input type="text" autoComplete='off' name="department" id="department" placeholder='Ex:Mbour' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} {...register("nom", {
                                required: "Veuillez entrez le nom du département que vous voulez ajouter"
                            })} />
                            {errors.nom?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.nom.message}</Typography>}
                        </Box>
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Longitude du département</Typography>
                            <input type="number" autoComplete='off' name="longitude" id="longitude" placeholder='Ex:-17.3660286' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} {...register("longitude", {
                                required: "Veuillez entrez la longitude du département que vous voulez ajouter"
                            })} />
                            {errors.longitude?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.longitude.message}</Typography>}
                        </Box>
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Latitude du département</Typography>
                            <input type="number" autoComplete='off' name="latitude" id="latitude" placeholder='Ex:14.7645042' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} {...register("latitude", {
                                required: "Veuillez entrez la latitude du département que vous voulez ajouter"
                            })} />
                            {errors.latitude?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.latitude.message}</Typography>}
                        </Box>
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Région d'appartenance</Typography>
                            <FormControl>
                                <Select
                                    variant="outlined"
                                    id="region"
                                    value={selectedRegion}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{
                                        color: "#111827", borderWidth: "1.5px", borderColor: "gray", height: "43px",
                                        "& .MuiSvgIcon-root": {
                                            color: "#111827",
                                        }
                                    }}
                                    {...register("regionName", {
                                        required: "Veuillez sélectionner la région à laquelle appartient le département",
                                        onChange: (event) => setSelectedRegion(event.target.value),
                                        validate: value => value !== "none" || "Veuillez sélectionner la région à laquelle appartient le département"
                                    })}
                                >
                                    <MenuItem selected={true} disabled value="none">
                                        <em>Sélectionnez une région</em>
                                    </MenuItem>
                                    {
                                        regionsNameWithId.map((region) =>
                                        (
                                            <MenuItem key={region.id} value={region.nom}>{region.nom}</MenuItem>
                                        )
                                        )
                                    }
                                </Select>
                            </FormControl>
                            {errors.regionName?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.regionName.message}</Typography>}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ bgcolor: "#111827", display: 'flex', justifyContent: useMediaQuery('(max-width:405px)') ? 'space-between' : "end", pt: 2 }}>
                    <Button onClick={handleCloseAddDepartmentModal} sx={{ display: useMediaQuery('(min-width:405px)') ? "none" : "block", color: "white", border: "1px solid rgb(109, 40, 217)" }}>
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
                <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleClickAddDepartmentButton}>
                    Ajouter département
                </Button>
            </GridToolbarContainer>
        </>
    );
}

function CustomToolbar({ regionsNameWithId, updateDepartmentStateWhenAddingNewDepartment }) {
    return (
        <GridToolbarContainer sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <GridToolbarContainer sx={{ mb: "2px" }}>
                <AddDepartmentToolbar regionsNameWithId={regionsNameWithId} updateDepartmentStateWhenAddingNewDepartment={updateDepartmentStateWhenAddingNewDepartment} />
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
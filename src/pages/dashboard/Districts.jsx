import React from 'react'
import { DataGrid, GridActionsCellItem, GridToolbarContainer, frFR, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { deleteDistrict, updateDistrict, addDistrict, getAllDistricts } from '../../services/dashboard/DistrictService';
import { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, LinearProgress, Typography, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { getAllRegionsNameAndId } from '../../services/dashboard/RegionService';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import { getDepartmentsFromRegionName } from '../../services/dashboard/DepartmentService';
import SaveIcon from '@mui/icons-material/Save';
import { getMunicipalitiesFromDepartmentName } from '../../services/dashboard/MunicipalitieService';

export default function Districts() {
    const { enqueueSnackbar } = useSnackbar();
    const [oldEditingCell, setOldEditingCell] = useState({})
    const [openDeleteDistrictAlert, setOpenDeleteDistrictAlert] = useState(false)
    const [districtIdWhenDeleting, setDistrictIdWhenDeleting] = useState()
    const [districts, setDistricts] = useState([]);
    const [regionsNameWithId, setRegionsNameWithId] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const updateDistrictStateWhenAddingNewDistrict = (newDistrictData) => {
        const newDistrictDataWithId = { id: newDistrictData.nom + newDistrictData.latitude + newDistrictData.longitude, ...newDistrictData }
        setDistricts([...districts, newDistrictDataWithId])
    }

    const getDistricts = () => {
        setIsFetchingData(true)
        getAllDistricts()
            .then((response) => {
                if (!response.error) {
                    setDistricts(response);
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
        getDistricts();
        getRegionsNameWithId();
    }, [])

    const handleEditCell = (params, event, details) => {
        let { id, field, value } = params;
        if (params.field != "regionName" && event.type === "click")
            setDistricts((districts) => {
                return districts.map(district => {
                    if (district.id == params.id) {
                        return params.row;
                    }
                    else {
                        return district;
                    }
                })
            })
        if ((event.type !== "click" || (params.field === "regionName" && event.type === "click")) && JSON.stringify(oldEditingCell) !== JSON.stringify({ id, field, value })) {
            if (field == "regionName") {
                const [regionNameAndId] = regionsNameWithId.filter(region => region.nom == value);
                value = regionNameAndId;
            }
            updateDistrict(id, { [field]: ((field != "nom" && field != "regionName") ? (value) : value) })
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
        deleteDistrict(id)
            .then(() => {
                setDistricts((districts) => districts.filter((district) => district.id != id));
                enqueueSnackbar('Quartier correctement supprimé', { variant: 'success' })
                setOpenDeleteDistrictAlert(false);
            })
            .finally(() => setIsDeleting(false));
    })
    const handleClickOpenAlert = useCallback((id) => () => {
        setDistrictIdWhenDeleting(id)
        setOpenDeleteDistrictAlert(true);
    })
    const handleClickCloseAlert = () => {
        if (!isDeleting)
            setOpenDeleteDistrictAlert(false);
    }
    const columns = useMemo
        (() => [
            { field: 'nom', headerName: 'Nom', minWidth: 150, flex: 0.6, editable: true, sort: "desc" },
            { field: 'latitude', headerName: 'Latitude', valueFormatter: ({ value }) => (value), minWidth: 100, flex: 0.3, editable: true },
            { field: 'longitude', headerName: 'Longitude', valueFormatter: ({ value }) => (value), minWidth: 100, flex: 0.3, editable: true },
            { field: 'regionName', headerName: 'Région', type: "singleSelect", minWidth: 120, flex: 0.3, editable: true, valueOptions: () => { return regionsNameWithId.map((region) => { return region.nom }) } },
            {
                field: 'departmentName', headerName: 'Département',
                minWidth: 120, flex: 0.3
            },
            {
                field: 'municipalitieName', headerName: 'Commune',
                minWidth: 120, flex: 0.3
            },
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
                open={openDeleteDistrictAlert}
                onClose={handleClickCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Voulez-vous vraiment supprimer ce quartier ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ⚠️ Cette action est irréversible
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isDeleting} onClick={handleClickCloseAlert}>Annuler</Button>
                    <LoadingButton id="loadingIndicator" loading={isDeleting} onClick={handleDelete(districtIdWhenDeleting)} autoFocus>
                        Oui, je veux le supprimer
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <span className='text-center sm:text-left text-2xl underline underline-offset-4 decoration-1'>
                Gestion des quartiers du Sénégal
            </span>
            <div className="bg-white mt-5 p-5 rounded-md shadow-md shadow-violet-400">
                <div className='pb-5 text-xl  font-Hind font-normal'>
                    Liste de tout les quartiers
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
                            toolbar: { regionsNameWithId, updateDistrictStateWhenAddingNewDistrict }
                        }}
                        rows={districts}
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


function AddDistrictToolbar({ regionsNameWithId, updateDistrictStateWhenAddingNewDistrict }) {
    const { enqueueSnackbar } = useSnackbar();
    const [openAddDistrictBackdrop, setOpenAddDistrictBackdrop] = useState(false)
    const { register, handleSubmit, watch, resetField, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const [openAddDistrictModal, setOpenAddDistrictModal] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("none");
    const [selectedDepartment, setSelectedDepartment] = useState("none");
    const [selectedMunicipalitie, setSelectedMunicipalitie] = useState("none");
    const [departmentsNameAndId, setDepartmentsNameAndId] = useState([]);
    const [municipalitiesNameAndId, setMunicipalitiesNameAndId] = useState([]);
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [isMunicipalitiesLoading, setIsMunicipalitiesLoading] = useState(false);

    const fullScreen = useMediaQuery('(max-width:325px)');

    const handleClickAddDistrictButton = () => {
        setOpenAddDistrictModal(true);
    };

    const onSubmit = () => {
        setOpenAddDistrictBackdrop(true)
        const [regionNameAndId] = regionsNameWithId.filter(region => region.nom == watch().regionName);
        const [departmentNameAndId] = departmentsNameAndId.filter(department => department.nom == watch().departmentName);
        const [municipalitieNameAndId] = municipalitiesNameAndId.filter(municipalitie => municipalitie.nom == watch().municipalitieName);
        addDistrict({ regionNameAndId, departmentNameAndId, municipalitieNameAndId, ...watch() })
            .then(
                () => {
                    updateDistrictStateWhenAddingNewDistrict(watch());
                    setSelectedRegion('none');
                    setSelectedDepartment('none');
                    setSelectedMunicipalitie('none');
                    resetField('nom');
                    resetField('latitude');
                    resetField('longitude');
                    resetField('regionName');
                    resetField('departmentName');
                    resetField('municipalitieName');
                    enqueueSnackbar('Quartier correctement ajouté', { variant: 'success' })
                }
            )
            .finally(() => {
                setOpenAddDistrictBackdrop(false)
            })
    }

    const handleCloseAddDistrictModal = () => {
        setOpenAddDistrictModal(false);
    };

    useEffect(() => {
        if (watch().regionName != undefined && watch().regionName != "none") {
            setIsDepartmentsLoading(true);
            getDepartmentsFromRegionName(watch().regionName)
                .then((result) => setDepartmentsNameAndId(result))
                .finally(() => setIsDepartmentsLoading(false))
        }
    }, [selectedRegion])

    useEffect(() => {
        if (
            watch().regionName != undefined &&
            watch().regionName != "none" &&
            watch().departmentName != undefined &&
            watch().departmentName != "none"
        ) {
            setIsMunicipalitiesLoading(true);
            getMunicipalitiesFromDepartmentName(watch().departmentName)
                .then((result) => setMunicipalitiesNameAndId(result))
                .finally(() => setIsMunicipalitiesLoading(false))
        }
    }, [selectedDepartment])


    return (
        <>
            <Backdrop
                className="text-violet-600 bg-gray-700/25 backdrop-blur-[1px] z-50"
                open={openAddDistrictBackdrop}
            >
                <CircularProgress size={65} color="inherit" />
            </Backdrop>
            <Dialog
                sx={{ zIndex: "30" }}
                maxWidth={"md"}
                fullWidth={true}
                open={openAddDistrictModal}
                onClose={handleCloseAddDistrictModal}
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ bgcolor: "#111827", display: "flex", justifyContent: "space-between", alignItems: "center" }} id="alert-dialog-title">
                    {"Ajouter un nouveau quartier"}
                    <IconButton sx={{ display: useMediaQuery('(max-width:405px)') ? "none" : undefined }} onClick={handleCloseAddDistrictModal}>
                        <CloseRoundedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ bgcolor: "#F3F4F6", color: "#374151", fontWeight: "500" }}>
                    <Box sx={{ display: 'grid', gap: "30px", mt: "5px", }} >
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Nom du quartier</Typography>
                            <input type="text" autoComplete='off' name="district" id="district" placeholder='Ex:Hersent' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} {...register("nom", {
                                required: "Veuillez entrez le nom du quartier que vous voulez ajouter"
                            })} />
                            {errors.nom?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.nom.message}</Typography>}
                        </Box>
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Longitude du quartier</Typography>
                            <input type="number" autoComplete='off' name="longitude" id="longitude" placeholder='Ex:-17.3660286' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} {...register("longitude", {
                                required: "Veuillez entrez la longitude du quartier que vous voulez ajouter"
                            })} />
                            {errors.longitude?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.longitude.message}</Typography>}
                        </Box>
                        <Box sx={{ display: 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Latitude du quartier</Typography>
                            <input type="number" autoComplete='off' name="latitude" id="latitude" placeholder='Ex:14.7645042' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} {...register("latitude", {
                                required: "Veuillez entrez la latitude du quartier que vous voulez ajouter"
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
                                        required: "Veuillez sélectionner la région à laquelle appartient le quartier",
                                        onChange: (event) => (setSelectedRegion(event.target.value), setSelectedDepartment("none"), setDepartmentsNameAndId([]), setMunicipalitiesNameAndId([])),
                                        validate: value => value !== "none" || "Veuillez sélectionner la région à laquelle appartient le quartier"
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
                        <Box sx={{ display: (watch().regionName == 'none' || watch().regionName == undefined) ? "none" : 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Département d'appartenance</Typography>

                            {
                                isDepartmentsLoading ? <LoadingButton sx={{ bgcolor: "#334155", height: "43px" }} id="loadingIndicator" loading endIcon={<SaveIcon />} loadingPosition="end">
                                    <Typography sx={{ color: "white" }}>  Récupération des départements de la région...</Typography>
                                </LoadingButton> : <FormControl>
                                    <Select
                                        variant="outlined"
                                        id="region"
                                        value={selectedDepartment}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            color: "#111827", borderWidth: "1.5px", borderColor: "gray", height: "43px",
                                            "& .MuiSvgIcon-root": {
                                                color: "#111827",
                                            }
                                        }}
                                        {...register("departmentName", {
                                            required: "Veuillez sélectionner le département auquel appartient le quartier",
                                            onChange: (event) => (setSelectedDepartment(event.target.value), setSelectedMunicipalitie("none"), setMunicipalitiesNameAndId([])),
                                            validate: value => value !== "none" || "Veuillez sélectionner le département auquel appartient le quartier"
                                        })}
                                    >
                                        <MenuItem selected={true} disabled value="none">
                                            <em>Sélectionnez un département</em>
                                        </MenuItem>
                                        {
                                            departmentsNameAndId.map(
                                                department =>
                                                (
                                                    <MenuItem key={department.id} value={department.nom}>{department.nom}</MenuItem>
                                                )
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            }
                            {errors.departmentName?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.departmentName.message}</Typography>}
                        </Box>
                        <Box sx={{ display: (selectedRegion == 'none' || selectedDepartment == "none") ? "none" : 'grid', gap: "5px" }}>
                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Commune d'appartenance</Typography>

                            {
                                isMunicipalitiesLoading ? <LoadingButton sx={{ bgcolor: "#334155", height: "43px" }} id="loadingIndicator" loading endIcon={<SaveIcon />} loadingPosition="end">
                                    <Typography sx={{ color: "white" }}>  Récupération des communes du département...</Typography>
                                </LoadingButton> : <FormControl>
                                    <Select
                                        variant="outlined"
                                        id="region"
                                        value={selectedMunicipalitie}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            color: "#111827", borderWidth: "1.5px", borderColor: "gray", height: "43px",
                                            "& .MuiSvgIcon-root": {
                                                color: "#111827",
                                            }
                                        }}
                                        {...register("municipalitieName", {
                                            required: "Veuillez sélectionner la commune à laquelle appartient le quartier",
                                            onChange: (event) => setSelectedMunicipalitie(event.target.value),
                                            validate: value => value !== "none" || "Veuillez sélectionner la commune à laquelle appartient le quartier"
                                        })}
                                    >
                                        <MenuItem selected={true} disabled value="none">
                                            <em>Sélectionnez une commune</em>
                                        </MenuItem>
                                        {
                                            municipalitiesNameAndId.map(
                                                municipalitie =>
                                                (
                                                    <MenuItem key={municipalitie.id} value={municipalitie.nom}>{municipalitie.nom}</MenuItem>
                                                )
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            }
                            {errors.municipalitieName?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.municipalitieName.message}</Typography>}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ bgcolor: "#111827", display: 'flex', justifyContent: useMediaQuery('(max-width:405px)') ? 'space-between' : "end", pt: 2 }}>
                    <Button onClick={handleCloseAddDistrictModal} sx={{ display: useMediaQuery('(min-width:405px)') ? "none" : "block", color: "white", border: "1px solid rgb(109, 40, 217)" }}>
                        Annuler
                    </Button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Button disabled={isDepartmentsLoading} type="submit" sx={{ color: "white", border: "1px solid rgb(109, 40, 217)" }}>
                            Ajouter
                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
            <GridToolbarContainer>
                <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={handleClickAddDistrictButton}>
                    Ajouter quartier
                </Button>
            </GridToolbarContainer>
        </>
    );
}

function CustomToolbar({ regionsNameWithId, updateDistrictStateWhenAddingNewDistrict }) {
    return (
        <GridToolbarContainer sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <GridToolbarContainer sx={{ mb: "2px" }}>
                <AddDistrictToolbar regionsNameWithId={regionsNameWithId} updateDistrictStateWhenAddingNewDistrict={updateDistrictStateWhenAddingNewDistrict} />
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

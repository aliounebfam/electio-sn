import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack'
import { useEffect } from 'react';
import { useState } from 'react';
import DatePicker from "react-multi-date-picker";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import fr from "./../../../utils/frenchLocaleDatePicker";
import './../../../utils/PurpleColorDatePicker.css';
import { TextField, Autocomplete, Button, FormControl, FormControlLabel, Radio, RadioGroup, Tooltip, Modal, Skeleton, Box, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Camera } from "react-camera-pro";
import { useRef } from 'react';
import { getAllDistricts } from '../../../services/dashboard/DistrictService';
import { addVoter, isEmailAddressAlreadyUsed } from '../../../services/dashboard/VoterService';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [datePickerValue, setDatePickerValue] = useState(undefined);
    const [districts, setDistricts] = useState([]);
    const [randomKeyForResetField, setRandomKeyForResetField] = useState();
    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting, touchedFields } } = useForm({ mode: "onChange" });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const camera = useRef(null);
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);
    const [openTakeAPictureModal, setOpenTakeAPictureModal] = React.useState(false);
    const handleOpenTakeAPictureModal = () => setOpenTakeAPictureModal(true);
    const handleCloseTakeAPictureModal = () => setOpenTakeAPictureModal(false);
    const [openValidatePictureModal, setOpenValidatePictureModal] = React.useState(false);
    const handleOpenValidatePictureModal = () => setOpenValidatePictureModal(true);
    const handleCloseValidatePictureModal = () => setOpenValidatePictureModal(false);
    const [lastFindErrorInFieldSnackbarId, setLastFindErrorInFieldSnackbarId] = useState(undefined);
    const navigate = useNavigate();

    const resetForm = () => {
        reset();
        setImage(null);
        setDatePickerValue(undefined);
        setRandomKeyForResetField(crypto.randomUUID());
    }

    const getDistricts = () => {
        getAllDistricts().then((response) => {
            if (!response.error)
                setDistricts(response);
            else
                enqueueSnackbar('Une erreur est survenue lors de la récupération des quartiers', { variant: 'error' })
        });
    }

    useEffect(() => {
        if (Object.keys(errors).length != 0) {
            let fieldValues = Object.values(watch()).filter((e) => e !== "" && e !== undefined && e != null);
            if (fieldValues.length != 8) {
                setLastFindErrorInFieldSnackbarId(enqueueSnackbar('Veuillez remplir tous les champs correctement', { variant: 'warning' }))
            }
            setTimeout(() => {
                closeSnackbar(lastFindErrorInFieldSnackbarId);
            }, 3000);
        }
    }, [isSubmitting])

    const onSubmit = async () => {
        if (image != null) {
            const voterData = { ...watch(), photo: image, canVoted: false, isAdmin: false, isSuperAdmin: false, isCandidate: false, isRegistered: false };
            addVoter(voterData)
                .then(() => {
                    closeSnackbar(lastFindErrorInFieldSnackbarId);
                    navigate("/");
                    enqueueSnackbar('Votre demande d\'enregistrement à la plateforme a été correctement envoyée.\nVous recevrez un mail contenant vos identifiants de connexion dans maximum 48h.', {
                        variant: 'success', autoHideDuration: 7500,
                        style: {
                            whiteSpace: 'pre-line'
                        }
                    });
                    resetForm();
                })
                .catch(() => {
                    closeSnackbar(lastFindErrorInFieldSnackbarId);
                    enqueueSnackbar('Une erreur est survenue lors de la création de votre compte', { variant: 'error' });
                });
        }
        else {
            closeSnackbar(lastFindErrorInFieldSnackbarId);
            enqueueSnackbar('Veuillez d\'abord prendre une photo de vous', { variant: 'warning' })
        }
    };

    return (
        <div className='flex-1 bg-gray-300/25'>
            <div className="mx-auto max-w-[1310px]">
                <div className='flex-1 lg:p-12 p-8  bg-gray-300/5'>
                    <div className='text-center font-Hind text-xl md:text-2xl'>
                        <div className="select-none text-lg md:text-xl lg:text-2xl uppercase mb-4">
                            <span className="bg-violet-600 text-white pt-[5px] px-2 rounded-md">
                                Inscription
                            </span>
                        </div>
                        <div className='text-xl text-slate-800'>
                            Ouvrez un compte et commencez à voter avec toute <span className='relative before:absolute before:bg-gradient-to-r before:from-[#007E3C] before:via-[#F0E33F] before:to-[#D71A21] before:w-full before:h-[2.5px] before:top-[calc(100%-8px)] before:scale-x-100 before:transition-transform before:duration-300 before:origin-[0_50%]'>simplicité</span>.
                        </div>
                    </div>
                    <div className=' shadow-lg shadow-violet-600/10 pt-3'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="firstName" className="block text-md font-medium text-gray-700">Nom de famille</label>
                                            <input autoComplete="off" aria-invalid={errors.firstName?.message} placeholder="Ex:FALL" type="text" name="firstName" id="firstName" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.firstName?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("firstName", {
                                                required: "Veuillez saisir votre nom de famille"
                                            })} />
                                            {errors.firstName?.message && <span className='text-red-600'>{errors.firstName.message}</span>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="lastName" className="block text-md font-medium text-gray-700">Prénom</label>
                                            <input autoComplete="off" placeholder="Ex:Moustapha" type="text" name="lastName" id="lastName" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.lastName?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("lastName", { required: "Veuillez saisir votre prénom" })} />
                                            {errors.lastName?.message && <span className='text-red-600'>{errors.lastName.message}</span>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="dateOfBirth" className="block text-md font-medium text-gray-700">Date de naissance</label>
                                            <DatePicker
                                                {...register("dateOfBirth", { validate: value => value !== undefined || "Veuillez indiquez votre date de naissance" })}
                                                containerStyle={{
                                                    width: "100%"
                                                }}
                                                format="DD/MM/YYYY"
                                                inputMode="none"
                                                value={datePickerValue}
                                                key={randomKeyForResetField}
                                                onChange={(value) => (setDatePickerValue(value.format()), setValue('dateOfBirth', value.format()))}
                                                locale={fr}
                                                weekStartDayIndex={1}
                                                hideOnScroll
                                                calendarPosition={'top-center'}
                                                className="purple"
                                                render={(value, openCalendar) => {
                                                    return (
                                                        <Button sx={{
                                                            color: "#1E293B", border: "1.5px solid " + (datePickerValue == undefined && errors.date?.message ? "#DC2626" : "#d1d5db"), mt: "4px", width: "100%", height: "38px", '&:focus': {
                                                                boxShadow: "0px 0px 0px 1.5px #7C3AED"
                                                            },
                                                            '&:hover': {
                                                                "bgcolor": "transparent"
                                                            },
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            borderRadius: "5px"
                                                        }}
                                                            onClick={openCalendar}
                                                            endIcon={<CalendarMonthRoundedIcon sx={{ color: "#6D28D9" }} />}
                                                        >
                                                            {value ? value : "Appuyez pour ouvrir"}
                                                        </Button>
                                                    )
                                                }}
                                            />
                                            {datePickerValue == undefined && errors.dateOfBirth?.message && <span className='text-red-600'>{errors.dateOfBirth.message}</span>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="placeOfBirth" className="block text-md font-medium text-gray-700">Lieu de naissance</label>
                                            <input autoComplete="off" type="text" placeholder='Ex:Thies' name="placeOfBirth" id="placeOfBirth" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.placeOfBirth?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("placeOfBirth", {
                                                required: "Veuillez saisir votre lieu de naissance inscrit sur votre carte d'identité"
                                            })} />
                                            {errors.placeOfBirth?.message && <span className='text-red-600'>{errors.placeOfBirth.message}</span>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="emailAddress" className="block text-md font-medium text-gray-700">Adresse email</label>
                                            <input autoComplete="off" placeholder='Ex:moustaphafall@gmail.com' type="email" name="emailAddress" id="emailAddress" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.emailAddress?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("emailAddress", {
                                                required: "Veuillez saisir votre adresse email",
                                                pattern: {
                                                    value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                                                    message: "L'adresse email saisie est invalide"
                                                },
                                                validate: async (value) => !await isEmailAddressAlreadyUsed(value) || "Il existe déjà un compte avec cette adresse email"
                                            })} />
                                            {errors.emailAddress?.message && <span className='text-red-600'>{errors.emailAddress.message}</span>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phoneNumber" className="block text-md font-medium text-gray-700">Numéro de téléphone (<span className="text-violet-800">Optionnel</span>) </label>
                                            <input autoComplete="off" placeholder='Ex:+221701060661' type="number" name="phoneNumber" id="phoneNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm" {...register("phoneNumber")} />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="districts" className="mb-1 block text-md font-medium text-gray-700">Nom de votre quartier actuel</label>

                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={districts}
                                                key={randomKeyForResetField}
                                                loading={!districts.length ? true : false}
                                                loadingText="Récupération de la liste des quartiers..."
                                                onChange={(e, value) => setValue("district", value.nom)}
                                                isOptionEqualToValue={(option, value) => option.nom === value.nom}
                                                getOptionLabel={(option) => option.nom}
                                                onOpen={getDistricts}
                                                noOptionsText="Quartier introuvable | Veuillez vérifier l'orthographe de votre quartier."
                                                sx={{
                                                    border: "1.5px solid " + (!watch().district && errors.district?.message ? "#DC2626" : "#d1d5db"), borderRadius: "5px", padding: "0px",
                                                    '&:focus-within': {
                                                        boxShadow: !watch().district && errors.district?.message ? "0px 0px 0px 0.8px #DC2626" : "0px 0px 0px 1.3px #7C3AED"
                                                    }
                                                }}
                                                style={{
                                                    borderLeft: !watch().district && errors.district?.message ? "10px solid #DC2626" : undefined,
                                                }}
                                                renderInput={
                                                    (params) => <TextField {...params} sx={{
                                                        input: {
                                                            color: '#1E293B',
                                                            '&:focus': {
                                                                boxShadow: "none"
                                                            },
                                                            height: '4px',
                                                        },
                                                        "& .MuiOutlinedInput-root.Mui-focused": {
                                                            "& > fieldset": {
                                                                border: "none",
                                                            },
                                                        },
                                                    }} placeholder="Ex:Hersent"
                                                        hiddenLabel
                                                        fullWidth
                                                        {...register("district", { required: "Veuillez sélectionner le nom du quartier auquel vous habitez" })}
                                                    />
                                                }
                                            />
                                            {!watch().district && errors.district?.message && <span className='text-red-600'>{errors.district.message}</span>}
                                        </div>

                                        <div className="col-span-6">
                                            <FormControl>
                                                <label htmlFor="sex" className="block text-md font-medium text-gray-700">Sexe</label>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    key={randomKeyForResetField}
                                                >
                                                    <FormControlLabel {...register("sex", { required: "Veuillez indiquez votre sexe" })} labelPlacement="bottom" value="M" control={<Radio sx={{
                                                        color: (errors?.sex ? "#DC2626" : '#4B5563'),
                                                        '&.Mui-checked': {
                                                            color: "rgb(109, 40, 217)",
                                                        }
                                                    }} />} label="Masculin" />
                                                    <FormControlLabel {...register("sex", { required: "Veuillez indiquez votre sexe" })} labelPlacement="bottom" value="F" control={<Radio sx={{
                                                        color: (errors?.sex ? "#DC2626" : '#4B5563'),
                                                        '&.Mui-checked': {
                                                            color: "rgb(109, 40, 217)",
                                                        }
                                                    }} />} label="Féminin" />
                                                </RadioGroup>
                                                {errors.sex?.message && <span className='text-red-600'>{errors.sex.message}</span>}
                                            </FormControl>
                                        </div>
                                        <div className="col-span-6">
                                            <Box sx={{ display: 'grid', gap: "5px" }}>
                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>
                                                    Pour confirmer votre identité, veuillez prendre une photo de vous avec votre carte d'identité près de votre visage.
                                                </Typography>
                                                <Typography sx={{ color: "#4C1D95", fontFamily: "Hind", fontSize: "15px", fontWeight: '500' }}>
                                                    Tenez à ce que vous soyez dans une pièce bien éclairée.
                                                </Typography>
                                                <Button onClick={handleOpenTakeAPictureModal} sx={{ maxWidth: "fit-content", bgcolor: "#7C3AED", color: "white", '&:hover': { bgcolor: "#5B21B6" } }} size="small" variant="contained" startIcon={<PhotoCamera />}>
                                                    Prendre une photo
                                                </Button>
                                                <Box sx={{ maxWidth: "50%" }}>
                                                    <Modal
                                                        open={openTakeAPictureModal}
                                                        onClose={handleCloseTakeAPictureModal}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box sx={{ bgcolor: "transparent", height: '100%' }}>
                                                            <Box sx={{
                                                                maxWidth: "90%", position: "relative", top: "50%", left: "50%", transform: "translate(-50%,-50%)", '@media screen and (min-width: 460px)': {
                                                                    maxWidth: "80%"
                                                                }, '@media screen and (min-width: 590px)': {
                                                                    maxWidth: "70%"
                                                                }, '@media screen and (min-width: 720px)': {
                                                                    maxWidth: "50%"
                                                                }
                                                                , '@media screen and (min-width: 1338px)': {
                                                                    maxWidth: "40%"
                                                                }
                                                            }}>
                                                                <Camera facingMode={'user'} ref={camera} errorMessages={{
                                                                    noCameraAccessible: 'Pas d\'appareil photo accessible. Veuillez connectez votre caméra ou essayez avec un navigateur différent.',
                                                                    permissionDenied: 'Permission refusée. Veuillez donnez la permission au site d\'accéder à votre caméra',
                                                                    switchCamera:
                                                                        '...',
                                                                    canvas: '...',
                                                                }} aspectRatio={4 / 4} />

                                                                <IconButton onClick={() => { setOldImage(camera.current.takePhoto()); handleOpenValidatePictureModal(); handleCloseTakeAPictureModal() }} sx={{ position: "absolute", top: "100%", left: "50%", transform: "translate(-50%,-50%)", bgcolor: "#7C3AED", color: "white", '&:hover': { bgcolor: "#5B21B6" } }} aria-label="prendre une photo" component="label">
                                                                    <PhotoCamera />
                                                                </IconButton>
                                                                <IconButton size="small" onClick={() => { handleCloseTakeAPictureModal() }} sx={{ position: "absolute", top: "0", left: "calc(100%)", transform: "translate(-50%,-50%)", bgcolor: "#7C3AED", color: "white", '&:hover': { bgcolor: "#5B21B6" } }} aria-label="quitter l'option prendre une photo" component="label">
                                                                    <ClearIcon />
                                                                </IconButton>

                                                            </Box>

                                                        </Box>
                                                    </Modal>
                                                    <Modal
                                                        open={openValidatePictureModal}
                                                        onClose={handleCloseValidatePictureModal}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box sx={{ bgcolor: "transparent", height: '100%' }}>
                                                            <Box sx={{
                                                                maxWidth: "90%", position: "relative", top: "50%", left: "50%", transform: "translate(-50%,-50%)", '@media screen and (min-width: 460px)': {
                                                                    maxWidth: "80%"
                                                                }, '@media screen and (min-width: 590px)': {
                                                                    maxWidth: "70%"
                                                                }, '@media screen and (min-width: 720px)': {
                                                                    maxWidth: "50%"
                                                                }
                                                                , '@media screen and (min-width: 1338px)': {
                                                                    maxWidth: "40%"
                                                                }
                                                            }}>
                                                                <img src={oldImage} alt='Taken photo' style={{ transform: "scaleX(-1)" }} />

                                                                <IconButton onClick={() => { handleCloseValidatePictureModal(); setImage(oldImage) }} sx={{ position: "absolute", top: "100%", left: "40%", transform: "translate(-50%,-50%)", bgcolor: "#16A34A", color: "white", '&:hover': { bgcolor: "#15803D" } }} aria-label="valider la photo prise" component="label">
                                                                    <CheckIcon />
                                                                </IconButton>
                                                                <IconButton onClick={() => { handleCloseValidatePictureModal(); handleOpenTakeAPictureModal() }} sx={{ position: "absolute", top: "100%", left: "60%", transform: "translate(-50%,-50%)", bgcolor: "#DC2626", color: "white", '&:hover': { bgcolor: "#B91C1C" } }} aria-label="annuler la photo prise" component="label">
                                                                    <ClearIcon />
                                                                </IconButton>

                                                            </Box>
                                                        </Box>
                                                    </Modal>
                                                </Box>
                                                <Box sx={{ maxWidth: "fit-content", borderRadius: "5px", display: "flex", justifyContent: "center", padding: "10px", border: "3px dashed #4C1D95" }}>
                                                    <Tooltip title={!image ? "Vous n'avez pas encore pris de photo" : "Votre photo actuel"} placement='bottom-end' arrow>
                                                        {
                                                            image ?
                                                                <img src={image} alt='Taken photo' style={{
                                                                    transform: "scaleX(-1)", maxWidth: "250px", borderRadius: "3.5px"
                                                                }} /> :
                                                                < Skeleton sx={{ bgcolor: '#DDD6FE' }} variant="rounded" width={250} height={250} />
                                                        }
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        </div>


                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right">
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-violet-600 py-3 px-6 text-sm sm:text-[17px] font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1">
                                        S'inscrire
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

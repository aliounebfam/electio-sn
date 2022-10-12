import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, DialogActions } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { QontoConnector, QontoStepIcon } from './QontoConnector';
import { useForm } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Camera } from "react-camera-pro";
import { useRef } from 'react';
import { useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Skeleton from '@mui/material/Skeleton';
import { Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack'

const steps = ['Affichage informations électorales', 'Enregistrement informations supplémentaires'];

export default function CustomModalStepper({ userElectoralData }) {
    const { enqueueSnackbar } = useSnackbar();
    const [openModal, setOpenModal] = React.useState(true);
    const handleClose = () => {
        setOpenModal(false);
    };
    const fullScreen = useMediaQuery('(max-width:500px)');
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: "onChange" });
    const onSubmit = data => {
        if (image != null) {
            handleNext();
        }
        else {
            enqueueSnackbar('Veuillez d\'abord prendre une photo de vous', { variant: 'warning' })
        }
    };

    const camera = useRef(null);

    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    const [openTakeAPictureModal, setOpenTakeAPictureModal] = React.useState(false);
    const handleOpenTakeAPictureModal = () => setOpenTakeAPictureModal(true);
    const handleCloseTakeAPictureModal = () => setOpenTakeAPictureModal(false);

    const [openValidatePictureModal, setOpenValidatePictureModal] = React.useState(false);
    const handleOpenValidatePictureModal = () => setOpenValidatePictureModal(true);
    const handleCloseValidatePictureModal = () => setOpenValidatePictureModal(false);

    return (
        <>
            <Dialog
                maxWidth={false}
                fullWidth={true}
                open={openModal}
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ bgcolor: "#111827" }} id="alert-dialog-title">
                    {"Étapes de création de compte"}
                    <Stepper sx={{ paddingY: "10px" }} activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </DialogTitle>
                <DialogContent dividers sx={{ paddingY: "30px", bgcolor: "#F3F4F6", color: "#374151", fontWeight: "500" }}>
                    <Box sx={{ width: '100%' }}>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1, fontWeight: "600", fontFamily: "Hind", fontSize: "20px" }}>
                                    Toutes les étapes ont été complétées. Vous recevrez un mail ou un SMS contenant vos identifiants de connexion dans maximum 48h.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {
                                    activeStep == 0 ?
                                        <>
                                            <Box sx={{
                                                display: 'grid', gap: "50px", '@media screen and (min-width: 750px)': {
                                                    display: 'flex',
                                                    justifyContent: "space-between"
                                                }
                                            }} >
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant='h5' textAlign={"center"}>[ Etat Civil ] </Typography>
                                                    <Box sx={{ display: 'grid', gap: "30px", mt: "25px", }} >
                                                        <Box sx={{ display: 'grid', gap: "7px" }}>
                                                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Numéro d'Identification Nationale (<b>N.I.N</b>)</Typography>
                                                            <input type="text" value={userElectoralData.nin} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Nom</Typography>
                                                                <input type="text" value={userElectoralData.nom} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Prénom</Typography>
                                                                <input type="text" value={userElectoralData.prenom} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Date de naissance</Typography>
                                                                <input type="text" value={userElectoralData.datenaissance} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Lieu de naissance</Typography>
                                                                <input type="text" value={userElectoralData.lieunaissance} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant='h5' textAlign={"center"}>[ Données Électorales ] </Typography>
                                                    <Box sx={{ display: 'grid', gap: "30px", mt: "25px", }} >
                                                        <Box sx={{ display: 'grid', gap: "7px" }}>
                                                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Numéro électeur</Typography>
                                                            <input type="text" value={userElectoralData.numerodemande} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Région / Représentation diplomatique</Typography>
                                                                <input type="text" value={userElectoralData.region} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>

                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Département</Typography>
                                                                <input type="text" value={userElectoralData.departement} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Commune / Localité</Typography>
                                                                <input type="text" value={userElectoralData.commune} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Lieu de vote</Typography>
                                                                <input type="text" value={userElectoralData.lieuvote} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Bureau de vote</Typography>
                                                                <input type="text" value={userElectoralData.bureauvote} readOnly={true} disabled={true} style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </> :
                                        activeStep == 1 ?
                                            <Box>
                                                <Box>
                                                    <Typography variant='h5' textAlign={"center"}>Remplissez les champs suivants</Typography>
                                                    <Box sx={{ display: 'grid', gap: "30px", mt: "25px", }} >
                                                        <Box sx={{ display: 'grid', gap: "5px" }}>
                                                            <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Nom de votre quartier actuel</Typography>
                                                            <input type="text" placeholder='Ex:Diamagueune' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} sx={{ '&:focus': { borderColor: "red" } }} {...register("quartier", {
                                                                required: "Veuillez saisir le nom du quartier où vous habitez"
                                                            })} />
                                                            {errors.quartier?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.quartier.message}</Typography>}
                                                        </Box>
                                                        <Box>
                                                            <FormControl>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Avez-vous une adresse email ?</Typography>

                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="row-radio-buttons-group"
                                                                >
                                                                    <FormControlLabel {...register("haveEmailAdress", { required: true })} labelPlacement="bottom" value="true" control={<Radio sx={{
                                                                        color: (errors?.haveEmailAdress ? "#DC2626" : '#4B5563'),
                                                                        '&.Mui-checked': {
                                                                            color: "rgb(109, 40, 217)",
                                                                        }
                                                                    }} />} label="Oui" />
                                                                    <FormControlLabel {...register("haveEmailAdress", { required: true })} labelPlacement="bottom" value="false" control={<Radio sx={{
                                                                        color: (errors?.haveEmailAdress ? "#DC2626" : '#4B5563'),
                                                                        '&.Mui-checked': {
                                                                            color: "rgb(109, 40, 217)",
                                                                        }
                                                                    }} />} label="Non" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Box>
                                                        {watch().haveEmailAdress == "true" && <Box>
                                                            <Box sx={{ display: 'grid', gap: "5px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Adresse email</Typography>
                                                                <input type="email" name="emailAddress" id="emailAddress" placeholder='Ex:mouhamedfall@gmail.com' autoComplete="off" style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }} sx={{ '&:focus': { borderColor: "red" } }} {...register("emailAddress", {
                                                                    required: "Veuillez saisir votre adresse email",
                                                                    pattern: {
                                                                        value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                                                                        message: "L'adresse email saisie est invalide"
                                                                    }
                                                                })} />
                                                                {errors.emailAddress?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.emailAddress.message}</Typography>}
                                                            </Box>
                                                        </Box>}
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "5px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>Numéro de téléphone 1</Typography>
                                                                <input type="number" placeholder='Ex:+2217703509610' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }}  {...register("numberPhone1", {
                                                                    required: "Veuillez saisir votre numéro de téléphone"
                                                                })} />
                                                                {errors.numberPhone1?.message && <Typography sx={{ color: "#DC2626", fontFamily: "Hind" }}>{errors.numberPhone1.message}</Typography>}
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "5px" }}>
                                                                <Typography sx={{ color: "#111827", fontFamily: "Hind", fontSize: "17.5px", fontWeight: '500' }}>
                                                                    Numéro de téléphone 2 (Optionnel)
                                                                </Typography>
                                                                <input type="number" placeholder='Ex:+2217601208635' style={{ borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "1.5px" }}  {...register("numberPhone2", {
                                                                })} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
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
                                                                                < Skeleton sx={{ bgcolor: '#DDD6FE' }} variant="rounded" width={250} height={145} />
                                                                        }
                                                                    </Tooltip>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>


                                            </Box >
                                            :
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                Step 3
                                            </Typography>
                                }
                            </React.Fragment>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ bgcolor: "#111827", display: 'flex', justifyContent: 'space-between', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Précédent
                    </Button>
                    {activeStep === steps.length ? <Button onClick={handleClose} sx={{ color: "white", border: "1px solid rgb(109, 40, 217)" }}>
                        D'accord
                    </Button> :
                        activeStep !== steps.length - 1 ?
                            <Button sx={{ color: "white", border: "1px solid rgb(109, 40, 217)" }} onClick={handleNext}>
                                Suivant
                            </Button> : <form onSubmit={handleSubmit(onSubmit)}>
                                <Button type="submit" sx={{ color: "white", border: "1px solid rgb(109, 40, 217)" }} /*onClick={handleNext}*/>
                                    Valider les informations
                                </Button>
                            </form>
                    }
                </DialogActions>
            </Dialog >
        </ >
    )
}
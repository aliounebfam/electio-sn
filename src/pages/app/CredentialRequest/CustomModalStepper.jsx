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
import { QontoConnector, QontoStepIcon } from './QontoConnector'

const steps = ['Récupération informations électorales', 'Confirmation de l\'identité', 'Obtention des identifiants de connexion'];

export default function CustomModalStepper({ userElectoralData }) {

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const fullScreen = useMediaQuery('(max-width:650px)');


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

    console.log(userElectoralData);


    return (
        <>
            <Dialog
                maxWidth={false}
                fullWidth={true}
                open={open}
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
                <DialogContent dividers sx={{ paddingY: "30px", bgcolor: "#111827" }}>
                    <Box sx={{ width: '100%' }}>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box> */}
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
                                                            <Typography>Numéro d'Identification Nationale (<b>N.I.N</b>)</Typography>
                                                            <input type="text" value={userElectoralData.nin} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Nom</Typography>
                                                                <input type="text" value={userElectoralData.nom} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Prénom</Typography>
                                                                <input type="text" value={userElectoralData.prenom} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Date de naissance</Typography>
                                                                <input type="text" value={userElectoralData.datenaissance} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Lieu de naissance</Typography>
                                                                <input type="text" value={userElectoralData.lieunaissance} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant='h5' textAlign={"center"}>[ Données Électorales ] </Typography>
                                                    <Box sx={{ display: 'grid', gap: "30px", mt: "25px", }} >
                                                        <Box sx={{ display: 'grid', gap: "7px" }}>
                                                            <Typography>Numéro électeur</Typography>
                                                            <input type="text" value={userElectoralData.numerodemande} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Région / Représentation diplomatique</Typography>
                                                                <input type="text" value={userElectoralData.region} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>

                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Département</Typography>
                                                                <input type="text" value={userElectoralData.departement} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Commune / Localité</Typography>
                                                                <input type="text" value={userElectoralData.commune} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Lieu de vote</Typography>
                                                                <input type="text" value={userElectoralData.lieuvote} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            <Box sx={{ display: 'grid', gap: "7px" }}>
                                                                <Typography>Bureau de vote</Typography>
                                                                <input type="text" value={userElectoralData.bureauvote} readOnly={true} disabled={true} style={{ color: "white", borderRadius: "0.375rem", backgroundColor: "transparent", borderWidth: "2px", borderColor: "rgb(109, 40, 217)" }} />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </> :
                                        activeStep == 1 ?
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                Step 2
                                            </Typography> :
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
                    <Button sx={{ color: "white", border: "1px solid rgb(109, 40, 217)" }} onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Fin' : 'Suivant'}
                    </Button>
                </DialogActions>
            </Dialog>
        </ >
    )
}

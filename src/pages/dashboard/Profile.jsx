import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Backdrop, CircularProgress, Skeleton } from '@mui/material';
import { getAllDistricts } from '../../services/dashboard/DistrictService';
import { useAuth } from '../../context/AuthContext';
import { getVoterDataFromEmail, updateVoter } from '../../services/dashboard/VoterService';

export default function Profile() {
    const { register, setValue } = useForm();
    const { register: registerChangePassword, handleSubmit: handleSubmitChangePassword, reset: resetChangePassword, watch: watchChangePassword, formState: { errors: errorsChangePassword } } = useForm({ mode: "onChange" });
    const { register: registerChangeEmail, handleSubmit: handleSubmitChangeEmail, setValue: setValueChangeEmail, reset: resetChangeEmail, watch: watchChangeEmail, formState: { errors: errorsChangeEmail } } = useForm({ mode: "onChange" });
    const { enqueueSnackbar } = useSnackbar();
    const [districts, setDistricts] = useState([]);
    const { currentUser, updateEmailService, updatePasswordService, reauthenticateUser } = useAuth();
    const [voter, setVoter] = useState();
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const onChangePasswordSubmit = async () => {
        setOpenBackdrop(true);
        reauthenticateUser(voter.emailAddress, watchChangePassword().oldPassword)
            .then(() => {
                updatePasswordService(watchChangePassword().newPassword)
                    .then(() => {
                        enqueueSnackbar('Mot de passe modifié avec succès', { variant: 'success' });
                    })
                    .finally(() => setOpenBackdrop(false));
            })
            .catch((error) => {
                if (error = "FirebaseError: Firebase: Error (auth/wrong-password).")
                    enqueueSnackbar('Ancien mot de passe incorrect', { variant: 'error' });
                else {
                    enqueueSnackbar('Une erreur est survenue lors de la modification de votre adresse email', { variant: 'error', autoHideDuration: 5000 });
                    enqueueSnackbar('Déconnectez-vous, reconnectez-vous puis réessayez', { variant: 'warning', autoHideDuration: 5000 });
                };
                setOpenBackdrop(false);
            });
    };

    const onChangeEmailSubmit = async () => {
        if (voter.emailAddress != watchChangeEmail().emailAddress) {
            setOpenBackdrop(true);
            updateEmailService(watchChangeEmail().emailAddress)
                .then(() => {
                    updateVoter(voter.id, { emailAddress: watchChangeEmail().emailAddress })
                        .then(() => {
                            enqueueSnackbar('Adresse email modifiée avec succès', { variant: 'success' });
                        })
                        .finally(() => {
                            setOpenBackdrop(false);
                        });
                })
                .catch(() => {
                    enqueueSnackbar('Une erreur est survenue lors de la modification de votre adresse email', { variant: 'error', autoHideDuration: 5000 });
                    enqueueSnackbar('Déconnectez-vous, reconnectez-vous puis réessayez', { variant: 'warning', autoHideDuration: 5000 });
                    setValueChangeEmail("emailAddress", voter.emailAddress);
                });
        }
        else {
            enqueueSnackbar('Aucune modification détectée', { variant: 'warning' });
        }
    };

    useEffect(() => {
        if (voter) {
            setValueChangeEmail("emailAddress", voter.emailAddress);
            setValue("firstName", voter.firstName);
            setValue("lastName", voter.lastName);
            setValue("placeOfBirth", voter.placeOfBirth);
            setValue("dateOfBirth", voter.dateOfBirth);
        }
    }, [voter])

    useEffect(() => {
        getVoterDataFromEmail(currentUser.email).then(
            response => setVoter(response)
        );
    }, []);

    const getDistricts = () => {
        getAllDistricts().then((response) => {
            if (!response.error)
                setDistricts(response);
            else
                enqueueSnackbar('Une erreur est survenue lors de la récupération des quartiers', { variant: 'error' })
        });
    }

    return (
        <div className="bg-white mt-5 p-5 rounded-md shadow-md shadow-violet-400">
            <Backdrop
                className="text-violet-600 bg-gray-700/25 backdrop-blur-[3px] z-50"
                open={openBackdrop}
            >
                <CircularProgress size={65} color="inherit" />
            </Backdrop>
            <div className='pb-5 text-2xl font-Hind font-normal'>
                Gestion de votre profil
            </div>
            <div className='space-y-10'>
                <form>
                    <div className="border-violet-500 border overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className='underline inline-block text-xl font-medium text-gray-700 mb-4 font-Hind'>
                                Vos informations
                                <span className='inline-block bg-violet-700 text-white rounded-full px-2 pt-1 ml-3 text-sm'>Non éditable</span>
                            </div>
                            {voter ? <div>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="firstName" className="block text-md font-medium text-gray-700">Nom de famille</label>
                                        <input disabled={true} autoComplete="off" aria-disabled type="text" name="firstName" id="firstName" className={"italic font-medium mt-1 block w-full rounded-md  shadow-sm sm:text-sm border-violet-300"} {...register("firstName")} />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="lastName" className="block text-md font-medium text-gray-700">Prénom</label>
                                        <input disabled={true} autoComplete="off" type="text" name="lastName" id="lastName" className={"italic font-medium mt-1 block w-full rounded-md  shadow-sm sm:text-sm border-violet-300"} {...register("lastName")} />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="dateOfBirth" className="block text-md font-medium text-gray-700">Date de naissance</label>
                                        <input disabled={true} autoComplete="off" type="text" name="dateOfBirth" id="dateOfBirth" className={"italic font-medium mt-1 block w-full rounded-md  shadow-sm sm:text-sm border-violet-300"} {...register("dateOfBirth")} />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="placeOfBirth" className="block text-md font-medium text-gray-700">Lieu de naissance</label>
                                        <input disabled={true} autoComplete="off" type="text" aria-disabled name="placeOfBirth" id="placeOfBirth" className={"italic font-medium mt-1 block w-full rounded-md  shadow-sm sm:text-sm border-violet-300"} {...register("placeOfBirth")} />
                                    </div>

                                    <div className="col-span-6 ">
                                        <span className='text-md font-medium text-gray-700'>
                                            Sexe :
                                        </span>
                                        &nbsp;
                                        <span className='italic font-medium'>
                                            {voter?.sex == "M" ? "Masculin" : "Féminin"}
                                        </span>
                                    </div>
                                </div>
                            </div> : <Skeleton sx={{ bgcolor: '#DDD6FE' }} variant="rounded" height={193} />}
                        </div>
                    </div>
                </form>

                <form onSubmit={handleSubmitChangeEmail(onChangeEmailSubmit)}>
                    <div className="border-violet-500 border overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className='underline text-xl font-medium text-gray-700 mb-4 font-Hind'>
                                Changement d'adresse email
                            </div>
                            {voter ? <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label htmlFor="emailAddress" className="block text-md font-medium text-gray-700">Adresse email</label>
                                    <input autoComplete="off" type="email" name="emailAddress" id="emailAddress" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errorsChangeEmail.emailAddress?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...registerChangeEmail("emailAddress", {
                                        required: "Veuillez saisir votre adresse email",
                                        pattern: {
                                            value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                                            message: "L'adresse email saisie est invalide"
                                        }
                                    })} />
                                    {errorsChangeEmail.emailAddress?.message && <span className='text-red-600'>{errorsChangeEmail.emailAddress.message}</span>}
                                </div>
                            </div> : <Skeleton sx={{ bgcolor: '#DDD6FE' }} variant="rounded" height={148} />}
                        </div>
                        {voter ? <div className="bg-gray-50 px-4 py-3 text-right">
                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm sm:text-[15px] font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1">
                                Changer d'adresse email
                            </button>
                        </div> : undefined}
                    </div>
                </form>

                <form onSubmit={handleSubmitChangePassword(onChangePasswordSubmit)}>
                    <div className="border-violet-500 border overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className='underline text-xl font-medium text-gray-700 mb-4 font-Hind'>
                                Changement de mot de passe
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label htmlFor="oldPassword" className="block text-md font-medium text-gray-700">Ancien mot de passe</label>
                                    <input autoComplete="off" aria-invalid={errorsChangePassword.oldPassword?.message} placeholder="Entrez votre ancien mot de passe" type="password" name="oldPassword" id="oldPassword" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errorsChangePassword.oldPassword?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...registerChangePassword("oldPassword", {
                                        required: "Veuillez saisir ancien votre mot de passe",
                                    })} />
                                    {errorsChangePassword.oldPassword?.message && <span className='text-red-600'>{errorsChangePassword.oldPassword.message}</span>}
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="newPassword" className="block text-md font-medium text-gray-700">Nouveau mot de passe</label>
                                    <input autoComplete="off" aria-invalid={errorsChangePassword.newPassword?.message} placeholder="Entrez votre nouveau mot de passe" type="password" name="newPassword" id="newPassword" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errorsChangePassword.newPassword?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...registerChangePassword("newPassword", {
                                        required: "Veuillez saisir votre nouveau mot de passe",
                                        minLength: {
                                            value: 6,
                                            message: 'Le mot de passe doit comporter au moins 6 caractères'
                                        }
                                    })} />
                                    {errorsChangePassword.newPassword?.message && <span className='text-red-600'>{errorsChangePassword.newPassword.message}</span>}
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="newPasswordConfirmation" className="block text-md font-medium text-gray-700">Confirmation du nouveau mot de passe</label>
                                    <input autoComplete="off" aria-invalid={errorsChangePassword.newPasswordConfirmation?.message} type="password" name="newPasswordConfirmation" id="newPasswordConfirmation" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errorsChangePassword.newPasswordConfirmation?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...registerChangePassword("newPasswordConfirmation", {
                                        required: "Veuillez saisir votre mot de passe",
                                        validate: value => value == watchChangePassword().newPassword || "Les mots de passe ne correspondent pas"
                                    })} />
                                    {errorsChangePassword.newPasswordConfirmation?.message && <span className='text-red-600'>{errorsChangePassword.newPasswordConfirmation.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right">
                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm sm:text-[15px] font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1">
                                Changer de mot de passe
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

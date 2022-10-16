import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import Backdrop from '@mui/material/Backdrop';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

export default function Login() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ mode: "onChange" });
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const onSubmit = async () => {
        setOpenBackdrop(true);
        await login(watch().emailAddress, watch().password)
            .then((response) => {
                if (response.code) {
                    if (response.code == "auth/user-not-found") {
                        enqueueSnackbar('Email et/ou mot de passe incorrect(s)', { variant: 'error' });
                    }
                }
                else {
                    enqueueSnackbar('Vous êtes correctement connecté(e)', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    });
                    reset();
                    navigate("/");
                }
            })
            .catch((error) => {
                enqueueSnackbar('Une erreur est survenue lors de la tentative de connexion', { variant: 'error' });
            })
            .finally(() => {
                setOpenBackdrop(false);
            });

    };

    return (
        <div className='flex-1 bg-gray-300/25'>
            <Backdrop
                className="text-violet-600 bg-gray-700/25 backdrop-blur-[3px] z-20"
                open={openBackdrop}
            >
                <CircularProgress size={65} color="inherit" />
            </Backdrop>
            <div className="mx-auto max-w-[1000px]">
                <div className='flex-1 lg:p-12 p-8  bg-gray-300/5'>
                    <div className='text-center font-Hind text-xl md:text-2xl'>
                        <div className="select-none text-lg md:text-xl lg:text-2xl uppercase mb-4">
                            <span className="bg-violet-600 text-white pt-[5px] px-2 rounded-md">
                                Connexion
                            </span>
                        </div>
                        <div className='text-xl text-slate-800'>
                            Heureux de vous revoir parmi nous.
                        </div>
                        <div className='text-lg text-slate-800'>

                            Connectez-vous et ayez accès à plus de <span className='relative before:absolute before:bg-gradient-to-r before:from-[#007E3C] before:via-[#F0E33F] before:to-[#D71A21] before:w-full before:h-[1.8px] before:top-[calc(100%-7px)] before:scale-x-100 before:transition-transform before:duration-300 before:origin-[0_50%]'>fonctionnalités</span>.
                        </div>
                    </div>
                    <div className=' shadow-lg shadow-violet-600/10 pt-3'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6">
                                            <label htmlFor="emailAddress" className="block text-md font-medium text-gray-700">Adresse email</label>
                                            <input autoComplete="off" placeholder='Ex:moustaphafall@gmail.com' type="email" name="emailAddress" id="emailAddress" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.emailAddress?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("emailAddress", {
                                                required: "Veuillez saisir votre adresse email",
                                                pattern: {
                                                    value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                                                    message: "L'adresse email saisie est invalide"
                                                }
                                            })} />
                                            {errors.emailAddress?.message && <span className='text-red-600'>{errors.emailAddress.message}</span>}
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="password" className="block text-md font-medium text-gray-700">Mot de passe</label>
                                            <input autoComplete="off" aria-invalid={errors.password?.message} placeholder="Entrez votre mot de passe" type="password" name="password" id="password" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.password?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("password", {
                                                required: "Veuillez saisir votre mot de passe"
                                            })} />
                                            {errors.password?.message && <span className='text-red-600'>{errors.password.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right">
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-violet-600 py-3 px-6 text-sm sm:text-[17px] font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1">
                                        Se connecter
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

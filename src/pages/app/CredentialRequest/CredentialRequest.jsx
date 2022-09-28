import React from 'react'
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack'
import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function CredentialRequest() {

    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitSuccessful } } = useForm({ mode: "onChange" });
    const { enqueueSnackbar } = useSnackbar();
    const researchValue = watch().research;
    const proxy_url = "http://api.allorigins.win/get?url=https://thingproxy.freeboard.io/fetch/";
    const api_election_url = "https://elections.sec.gouv.sn/election/";

    const disableKeyboard = () => {
        document.onkeydown = function (e) {
            return false;
        }
    }

    const enableKeyboard = () => {
        document.onkeydown = function (e) {
            return true;
        }
    }

    const getUserElectionData = () => {
        setOpen(true);
        disableKeyboard();
        fetch(`${proxy_url}${api_election_url}${researchValue}/${watch().number}/${watch().firstName}/${watch().lastName}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const actualData = data.contents;
                actualData ? console.log(JSON.parse(actualData)) : console.log("Les informations saisies ne correspondent à personne dans le fichier électoral actuel.");
            })
            .catch(() => {
                enqueueSnackbar('Une erreur est survenue lors de la récupération de vos informations dans le fichier électoral', { variant: 'error', autoHideDuration: 5000 })
            })
            .finally(() => {
                enableKeyboard();
                setOpen(false);
            })
    }

    const onSubmit = data => {
        getUserElectionData();
    };

    useEffect(() => {
        // reset();
    }, [isSubmitSuccessful])


    return (
        <div className='flex-1 bg-gray-300/25'>
            <Backdrop
                className="text-violet-600 bg-gray-700/25 backdrop-blur-[3px] z-20"
                open={open}
            // onClick={handleClose}
            >
                <CircularProgress size={65} color="inherit" />
            </Backdrop>
            <div className=' max-w-7xl mx-auto shadow-lg shadow-violet-600/10 pt-3'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">

                                <fieldset className='col-span-6 text-lg'>
                                    <legend className="contents font-medium text-gray-900">Faire une recherche par</legend>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                {...register('research', { required: true })}
                                                id="research-nin"
                                                name="research"
                                                type="radio"
                                                value={"nin"}
                                                className={"h-4 w-4 " + (!errors?.research ? "border-gray-300 text-violet-600 focus:ring-violet-500" : "border-red-500 text-red-600 focus:ring-red-500")}
                                            />
                                            <label htmlFor="research-nin" className={"ml-3 block text-base font-medium " + (errors?.research ? "text-red-500" : "text-gray-700")}>
                                                Numéro d'Identification Nationale (N.I.N)
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                {...register('research', { required: true })}
                                                id="research-elector"
                                                name="research"
                                                type="radio"
                                                value={"electeur"}
                                                className={"h-4 w-4 " + (!errors?.research ? "border-gray-300 text-violet-600 focus:ring-violet-500" : "border-red-500 text-red-600 focus:ring-red-500")}
                                            />
                                            <label htmlFor="research-elector" className={"ml-3 block text-base font-medium " + (errors?.research ? "text-red-500" : "text-gray-700")}>
                                                Numéro d'électeur
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className={"col-span-6 " + ((researchValue === undefined) || (researchValue === null) ? "hidden" : undefined)}>
                                    <label htmlFor="number" className="block text-md font-medium text-gray-700">Numéro d'{researchValue != "nin" ? "électeur" : "Identification Nationale (NIN)"}</label>
                                    <input aria-invalid={true} type="number" name="number" id="number" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.number?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("number", { required: "Veuillez saisir votre numéro d'" + (researchValue == 'nin' ? "Identification Nationale (NIN)" : "électeur"), minLength: { value: researchValue == 'nin' ? "13" : "9", message: "Le numéro saisi est invalide" } })} maxLength={researchValue == 'nin' ? "14" : "9"} onInput={(e) => {
                                        if (e.target.value.length > e.target.maxLength)
                                            e.target.value = e.target.value.slice(0, e.target.maxLength);
                                    }} />
                                    {researchValue !== undefined && errors.number?.message && <span className='text-red-600'>{errors.number.message}</span>}

                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="firstName" className="block text-md font-medium text-gray-700">Nom de famille</label>
                                    <input type="text" name="firstName" id="firstName" autoComplete='off' className={"uppercase mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.firstName?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("firstName", {
                                        required: "Veuillez saisir votre nom de famille"
                                    })} />
                                    {errors.firstName?.message && <span className='text-red-600'>{errors.firstName.message}</span>}
                                </div>


                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="lastName" className="block text-md font-medium text-gray-700">Prénom</label>
                                    <input type="text" name="lastName" id="lastName" autoComplete='off' className={"uppercase mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.lastName?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("lastName", { required: "Veuillez saisir votre prénom" })} />
                                    {errors.lastName?.message && <span className='text-red-600'>{errors.lastName.message}</span>}
                                </div>

                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right">
                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-violet-600 py-3 px-6 text-sm sm:text-md font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1">Envoyer</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

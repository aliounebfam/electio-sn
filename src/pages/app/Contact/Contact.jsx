import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { Tooltip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack'
import { useEffect } from 'react';

export default function Contact() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({ mode: "onChange" });
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = data => {
        enqueueSnackbar('Message envoyée avec succès', { variant: 'success' })
    };

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful])

    return (
        <div className='flex-1 bg-gray-300/25'>
            <div className="mx-auto">
                <div className='flex flex-col lg:flex-row'>
                    <div className='flex-shrink text-white lg:text-right lg:max-w-lg lg:p-12 p-8 space-y-8 bg-violet-800'>
                        <div className='text-2xl mx-auto text-center'>
                            Informations de contact
                        </div>
                        <div className='flex mx-auto sm:mx-0 items-center flex-col sm:flex-row sm:space-x-10 justify-center space-y-7 sm:space-y-0 lg:flex-col lg:space-y-8 lg:items-start lg:space-x-0 lg:justify-start'>
                            <div>
                                <Tooltip title="Cliquez pour appeler" placement='top' arrow>
                                    <a href="tel:+221771560761">
                                        <span className='bg-violet-500 rounded-full p-2'>
                                            <PhoneIcon />
                                        </span>
                                        &nbsp;+221 77 156 07 61
                                    </a>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip title="Cliquez pour envoyer un mail à cette adresse" placement='bottom' arrow>
                                    <a href="mailto:abadara.fam@univ-thies.sn">
                                        <span className='bg-violet-500 rounded-full p-2'>
                                            <MailIcon />
                                        </span>
                                        &nbsp;abadara.fam@univ-thies.sn
                                    </a>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 lg:p-12 p-8  bg-gray-300/5'>
                        <span className='font-Hind text-xl md:text-2xl'>
                            Envoyez-nous un message
                        </span>
                        <div className=' shadow-lg shadow-violet-600/10 pt-3'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="firstName" className="block text-md font-medium text-gray-700">Nom de famille</label>
                                                <input aria-invalid={true} type="text" name="firstName" id="firstName" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.firstName?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("firstName", {
                                                    required: "Veuillez saisir votre nom de famille"
                                                })} />
                                                {errors.firstName?.message && <span className='text-red-600'>{errors.firstName.message}</span>}
                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="lastName" className="block text-md font-medium text-gray-700">Prénom</label>
                                                <input type="text" name="lastName" id="lastName" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.lastName?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("lastName", { required: "Veuillez saisir votre prénom" })} />
                                                {errors.lastName?.message && <span className='text-red-600'>{errors.lastName.message}</span>}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="emailAddress" className="block text-md font-medium text-gray-700">Adresse email</label>
                                                <input type="email" name="emailAddress" id="emailAddress" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.emailAddress?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("emailAddress", {
                                                    required: "Veuillez saisir votre adresse email",
                                                    pattern: {
                                                        value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                                                        message: "L'adresse email saisie est invalide"
                                                    }
                                                })} />
                                                {errors.emailAddress?.message && <span className='text-red-600'>{errors.emailAddress.message}</span>}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="phoneNumber" className="block text-md font-medium text-gray-700">Numéro de téléphone (Optionnel)</label>
                                                <input type="number" name="phoneNumber" id="phoneNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm" {...register("phoneNumber")} />
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="subject" className="block text-md font-medium text-gray-700">Objet du message </label>
                                                <input type="text" name="subject" id="subject" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.subject?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} {...register("subject", { required: "Veuillez saisir l'objet du message" })} />
                                                {errors.subject?.message && <span className='text-red-600'>{errors.subject.message}</span>}
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="message" className="block text-md font-medium text-gray-700">Message </label>
                                                <textarea type="text" name="message" id="message" className={"mt-1 block w-full rounded-md  shadow-sm sm:text-sm " + (errors.message?.message ? "border-red-500 border-l-[10px] focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-violet-500 focus:ring-violet-500")} rows="4" {...register("message", { required: "Veuillez saisir le corps du message" })} />
                                                {errors.message?.message && <span className='text-red-600'>{errors.message.message}</span>}
                                            </div>


                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 text-right">
                                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-violet-600 py-3 px-6 text-sm sm:text-md font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1">Envoyer</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

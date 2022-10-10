import React from 'react'
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack'
import { useEffect } from 'react';
import { useState } from 'react';
import DatePicker from "react-multi-date-picker"

import fr from "./../../../utils/frenchLocaleDatePicker"

export default function SignUp() {
    const maDate = new Date().toLocaleDateString("fr-FR")
    const [datePickerValue, setDatePickerValue] = useState(maDate);
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
            <div className="mx-auto max-w-[1310px]">
                <div className='flex-1 lg:p-12 p-8  bg-gray-300/5'>
                    <div className='text-center font-Hind text-xl md:text-2xl'>
                        <div className="text-lg md:text-xl lg:text-2xl uppercase mb-4">
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
                                            <label htmlFor="phoneNumber" className="block text-md font-medium text-gray-700">Date de naissance</label>
                                            <DatePicker
                                                value={datePickerValue}
                                                onChange={setDatePickerValue}
                                                locale={fr}
                                            />
                                            {/* <input type="number" name="phoneNumber" id="phoneNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm" {...register("phoneNumber")} /> */}
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phoneNumber" className="block text-md font-medium text-gray-700">Lieu de naissance</label>
                                            <input type="number" name="phoneNumber" id="phoneNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm" {...register("phoneNumber")} />
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



                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-left">
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

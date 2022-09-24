import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { Tooltip } from '@mui/material';


export default function Contact() {

    const handleSubmit = (e) => {
        e.preventDefault();
        //form action
    }


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
                            <form onSubmit={(e) => { handleSubmit(e) }} action="#" method="POST">
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-md font-medium text-gray-700">Nom de famille</label>
                                                <input type="text" name="first-name" id="first-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-md font-medium text-gray-700">Prénom</label>
                                                <input type="text" name="last-name" id="last-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email-address" className="block text-md font-medium text-gray-700">Adresse email</label>
                                                <input type="text" name="email-address" id="email-address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="phone-number" className="block text-md font-medium text-gray-700">Numéro de téléphone (Optionnel)</label>
                                                <input type="number" name="phone-number" id="phone-number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="subject" className="block text-md font-medium text-gray-700">Objet du message </label>
                                                <input type="text" name="subject" id="subject" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                            </div>
                                            <div className="col-span-6">
                                                <label htmlFor="message" className="block text-md font-medium text-gray-700">Message </label>
                                                <textarea type="text" name="message" id="message" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" rows="4" />
                                            </div>


                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 text-right">
                                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-sm sm:text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">Envoyer</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

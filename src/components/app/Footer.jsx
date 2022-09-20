import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='fixed bottom-0 w-screen'>
            <footer className="bg-black  body-font">
                <div className=" px-7 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <Link to={'/'} className="hover:text-indigo-500 transition duration-500 flex title-font font-medium items-center md:justify-start justify-center text-gray-100">
                        <img className='mb-2' src="electio_sn_logo.png" alt="logo" width={80} />
                        <span className="mt-4 sm:mr-10 text-2xl font-Comfortaa font-bold">Electio•SN</span>
                    </Link>
                    <p className="text-base text-gray-200 sm:ml-0 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-3 mt-4 ">Copyright &copy; 2022{new Date().getFullYear() != "2022" ? ' - ' + new Date().getFullYear() : ''}. Electio•SN. Tous droits réservés.
                    </p>
                    <span className="text-gray-200 inline-flex sm:ml-auto mt-4 justify-center sm:justify-start">
                        <a className="cursor-pointer hover:text-indigo-400 transition duration-300">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a className="cursor-pointer hover:text-indigo-400 transition duration-300 ml-3">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a className="cursor-pointer hover:text-indigo-400 transition duration-300 ml-3">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import CustomLinkUnderline from '../../utils/CustomLinkUnderline'

export default function Footer() {
    return (
        <>
            <footer className="flex-shrink-0 p-5 sm:flex-none lg:py-4 md:px-6 md:py-3 bg-gray-900">
                <div className='max-w-[1208px] mx-auto'>
                    <div className="flex flex-col items-center sm:flex sm:flex-row sm:items-center sm:justify-between">
                        <Link to={'/'} className="hover:text-transparent text-white transition-all duration-[350ms] flex items-center">
                            <img className='mb-5' src="../electio_sn_logo.png" alt="Logo Electio SN" width={75} />
                            <span className="self-center hover:bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br bg-clip-text from-[#007E3C] via-[#F0E33F] to-[#D71A21] text-xl sm:text-2xl font-Comfortaa font-bold whitespace-nowrap ">Electio•SN</span>
                        </Link>
                        <ul className="flex flex-wrap items-center mb-6 sm:text-lg font-Trykker sm:mb-0 text-gray-200">
                            <li>
                                <CustomLinkUnderline text='Foire aux questions' path='faq' className="mr-4 md:mr-6 " isNavLink={true} />
                            </li>
                            <li>
                                <CustomLinkUnderline text='Contact' path='contact' className="mr-4 md:mr-6 " isNavLink={true} />
                            </li>
                        </ul>
                    </div>
                    <hr className="mb-3 sm:mx-auto border-gray-700 lg:mt-[-5px] lg:mb-4" />
                    <span className="block sm:text-lg font-Trykker text-gray-300 text-center ">Copyright &copy; 2022{new Date().getFullYear() != "2022" ? ' - ' + new Date().getFullYear() : ''}. Electio•SN. Tous droits réservés.
                    </span>
                </div>

            </footer>
        </>
    )
}

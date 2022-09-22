import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './Home.css'

export default function Home() {
    const [src, setSrc] = useState("femme_senegalaise.jpg");

    useEffect(() => {
        setTimeout(() => {
            setSrc('drapeau-senegal.jpg');
        }, 3500)
    })

    return (
        <div className='flex-1 bg-gray-800'>
            <div className="relative h-full lg:h-screen pb-16">
                <img className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-1000" src={"src/assets/images/" + src} alt="" />
                <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-gray-900/70 backdrop-blur-md"></div>
                <div className="relative">
                    <div className="mb-12 space-y-16 md:mb-20 pt-20 sm:pt-40 w-11/12 mx-auto">
                        <h1 className="relative leading-[48px]  lg:leading-[66px] text-white md:leading-[58px] sm:leading-[55px] text-3xl font-bold font-Comfortaa lg:text-[38px] md:text-4xl">
                            <span className='text-transparent font-extrabold bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br bg-clip-text from-[#007E3C] via-[#F0E33F] to-[#D71A21]'>
                                Electio•SN
                            </span>
                            ,&nbsp;l'application&nbsp;
                            <span className='text-transparent font-extrabold bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br bg-clip-text from-[#007E3C] via-[#F0E33F] to-[#D71A21]'>
                                sénégalaise
                            </span>
                            &nbsp;de&nbsp;
                            <div className='lg:before:absolute relative inline-block before:bg-gradient-to-r before:from-[#007E3C] before:via-[#F0E33F] before:to-[#D71A21] before:w-full before:h-[3px] before:top-[calc(100%-10px)] before:scale-x-100 before:transition-transform before:duration-300 before:origin-[0_50%]'>
                                vote en ligne
                            </div>

                            &nbsp;et de&nbsp;
                            <div className='lg:before:absolute relative inline-block before:bg-gradient-to-r before:from-[#007E3C] before:via-[#F0E33F] before:to-[#D71A21] before:w-full before:h-[3px] before:top-[calc(100%-10px)] before:scale-x-100 before:transition-transform before:duration-300 before:origin-[0_50%]'>
                                visualisations des résultats en temps réel
                            </div>
                            &nbsp;avec des&nbsp;
                            <div className='lg:before:absolute relative inline-block before:bg-gradient-to-r before:from-[#007E3C] before:via-[#F0E33F] before:to-[#D71A21] before:w-full before:h-[3px] before:top-[calc(100%-10px)] before:scale-x-100 before:transition-transform before:duration-300 before:origin-[0_50%]'>
                                statistiques avancées
                            </div>
                        </h1>
                    </div>
                </div>

            </div>
            {/* <div className='max-w-2xl mx-auto'>Vous êtes déjà un électeur ?
                <a
                    className="cta-pr-btn px-4 py-2 text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center"
                    href="">
                    Demander des identifiants de connexion
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </a>
            </div> */}
        </div>
    )
}

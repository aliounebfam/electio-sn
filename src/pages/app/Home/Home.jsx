import React from 'react'
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

export default function Home() {
    const [src, setSrc] = useState("femme_senegalaise.jpg");

    const [mainHeight, setMainHeight] = useState(0);
    const main = useRef();
    const content = useRef();

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const newMainHeight = content.current.clientHeight + 40;
        setMainHeight(newMainHeight);

        function handleResize() {

            console.log(window.innerWidth);
            if (window.innerWidth <= "1535") {
                const newMainHeight = content.current.clientHeight + 40;
                setMainHeight(newMainHeight + "px");
            }
            else {
                setMainHeight("100vh");
            }

            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // window.addEventListener("resize", handleResize);

        handleResize();

        setTimeout(() => {
            setSrc('drapeau-senegal.jpg');
        }, 2000)

    }, [])


    return (
        <main>
            <div ref={main} style={{ height: mainHeight }} className={"flex-1 relative lg:h-screen pb-16"}>
                <div>
                    <img className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000" src={"src/assets/images/" + src} alt="" />
                    <div aria-hidden="true" className={"absolute inset-0 w-full h-full backdrop-blur-md bg-[rgba(17,24,39)]/" + (src === "femme_senegalaise.jpg" ? "[0.75] " : "[0.55]")}></div>
                    <div ref={content} className="relative">
                        <div className="mb-12 space-y-16 md:mb-20 pt-12 sm:pt-32 w-11/12 mx-auto">
                            <h1 className="relative leading-[48px]  lg:leading-[66px] text-white md:leading-[58px] sm:leading-[55px] text-3xl font-bold font-Comfortaa lg:text-[38px] md:text-4xl">
                                <div className='inline-block text-transparent font-extrabold bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br bg-clip-text from-[#007E3C] via-[#F0E33F] to-[#D71A21]'>
                                    Electio•SN
                                    <span className='text-white'>,&nbsp;</span>
                                </div>
                                l'application&nbsp;
                                <div className='inline-block text-transparent font-extrabold bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br bg-clip-text from-[#007E3C] via-[#F0E33F] to-[#D71A21]'>
                                    sénégalaise
                                </div>
                                &nbsp;de&nbsp;
                                <div className='lg:before:absolute relative inline-block before:bg-gradient-to-r before:from-[#007E3C] before:via-[#F0E33F] before:to-[#D71A21] before:w-full before:h-[3px] before:top-[calc(100%-10px)] before:scale-x-100 before:transition-transform before:duration-300 before:origin-[0_50%]'>
                                    vote en ligne
                                </div>
                                &nbsp;et de&nbsp;
                                <div className='lg:before:absolute relative inline-block before:bg-gradient-to-r before:from-[#007E3C] before:via-[#F0E33F] before:to-[#D71A21] before:w-full before:h-[3px] before:top-[calc(100%-10px)] before:scale-x-[0.989] before:transition-transform before:duration-300 before:origin-[0_50%]'>
                                    visualisations des résultats en temps réel&nbsp;
                                </div>
                                avec des&nbsp;
                                <div className='lg:before:absolute relative inline-block before:bg-gradient-to-r before:from-[#007E3C] before:via-[#F0E33F] before:to-[#D71A21] before:w-full before:h-[3px] before:top-[calc(100%-10px)] before:scale-x-100 before:transition-transform before:duration-300 before:origin-[0_50%]'>
                                    statistiques avancées
                                </div>&nbsp;
                                <div className='pt-0 inline-block'>
                                    <button className='text-3xl login'>
                                        Se connecter
                                        <div className="arrow-wrapper">
                                            <div className="arrow"></div>
                                        </div>
                                    </button>
                                </div>
                                <div className='mt-9 font-Hind flex items-center flex-wrap space-y-2 md:space-y-0'>
                                    <span className='mt-1 sm:mr-1'>
                                        Vous êtes déjà un électeur ?
                                    </span>&nbsp;
                                    <Link to={'/credential-request'} className="text-2xl py-10 sm:py-0 cssbuttons-io-button">
                                        <span className='mt-1'>
                                            Demander des identifiants de connexion
                                        </span>
                                        <div className="icon">
                                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                                        </div>
                                    </Link>
                                </div>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div class="py-16 bg-white">
                    <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                        <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                            <div class="md:5/12 lg:w-5/12">
                                <img src="src/assets/images/question.jpg" className='shadow-violet-700 drop-shadow-2xl' alt="image" loading="lazy" width="" height="" />
                            </div>
                            <div class="md:7/12 lg:w-6/12">
                                <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Nuxt development is carried out by passionate developers</h2>
                                <p class="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
                                <p class="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

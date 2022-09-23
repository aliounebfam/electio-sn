import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomLinkBackground from './../../../utils/CustomLinkBackground';
import './Home.css'
import Tooltip from '@mui/material/Tooltip';

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
        <main className='flex-1'>

            {/* HERO */}
            <section ref={main} style={{ height: mainHeight }} className={"relative lg:h-screen pb-16"}>
                <div>
                    <img className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000" src={"src/assets/images/" + src} alt="" />
                    <div aria-hidden="true" style={{ backgroundColor: "rgba(17, 24, 39," + (src === "femme_senegalaise.jpg" ? "0.75" : "0.5") + ")" }} className={"absolute inset-0 w-full h-full backdrop-blur-md "}></div>
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
                                        <span className=' mt-1'>
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
            </section>

            {/* FAQ */}
            <section className='container mx-auto'>
                <div className="py-16 bg-gray-300/[0.57]">
                    <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                            <div className="md:5/12 lg:w-5/12">
                                <Tooltip className='bg-red-800' title="Accéder à la rubrique FAQ" placement='right-start' arrow>
                                    <Link to='/faq'>
                                        <img src="src/assets/images/question.jpg" className='rounded-sm drop-shadow-2xl' alt="" loading="lazy" width="" height="" />
                                    </Link>
                                </Tooltip>
                            </div>
                            <div className="md:7/12 lg:w-6/12">
                                <h2 className="text-3xl font-Hind text-gray-900 font-bold md:text-4xl">Foire aux questions (FAQ)</h2>
                                <p className="text-xl mt-6 font-Trykker text-gray-700">Rubrique regroupant les réponses aux questions les plus fréquemment posées.</p>
                                <p className="text-xl mt-2 font-Trykker text-gray-700">Vous avez des questions ? Vérifiez <CustomLinkBackground className={"text-violet-800 font-bold"} text={"ici"} path='/faq' /> si elles n'ont pas déjà été traitées.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}

            <section className="container mx-auto">

                <div className="py-20 bg-gray-300/40">
                    <div className="container mx-auto px-6 md:px-12 text-center">
                        <div className="mb-16">
                            <h2 className="mb-4 font-Hind text-center text-2xl text-gray-900 font-bold md:text-[38px]">Équipe de développement</h2>
                        </div>
                        <div className="py-20 grid gap-28 md:gap-12 md:grid-cols-3">
                            <div className="border-t-4 border-violet-500 space-y-8 group">
                                <div className="w-36 h-36 -mt-16 mx-auto rounded-[2rem] rotate-45 overflow-hidden">
                                    <img className="w-full h-full object-cover object-center -rotate-45 scale-125 mx-auto transition duration-300 group-hover:scale-[1.4]"
                                        src="/src/assets/images/abf.jpg" alt="woman" loading="lazy" width="640" height="805" />
                                </div>
                                <div className="space-y-4 text-center">
                                    <div>
                                        <h4 className="text-2xl font-Hind">Alioune Badara FAM</h4>
                                        <span className="block text-md text-gray-800 font-Trykker">Génie Logiciel</span>
                                    </div>
                                    <a href="https://www.linkedin.com/in/alioune-badara-fam" class="w-max mx-auto flex items-center space-x-3 hover:text-violet-800 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 m-auto" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                </div>
                            </div>

                            <div className=" border-t-4 border-violet-500 space-y-8 group">
                                <div className="w-36 h-36 -mt-16 mx-auto rounded-[2rem] rotate-45 overflow-hidden">
                                    <img className="w-full h-full object-cover  -rotate-45 scale-125 mx-auto transition duration-300 group-hover:scale-[1.4]"
                                        src="https://avatars.dicebear.com/api/adventurer/oka.svg" alt="woman" loading="lazy" width="100" height="66" />
                                </div>
                                <div className="space-y-4 text-center">
                                    <div>
                                        <h4 className="text-2xl font-Hind">Mouhamed NDOYE</h4>
                                        <span className="block text-md text-gray-800 font-Trykker">Génie Logiciel</span>
                                    </div>
                                    <a href="#" class="w-max mx-auto flex items-center space-x-3 hover:text-violet-800 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 m-auto" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                </div>
                            </div>

                            <div className="border-t-4 border-violet-500 space-y-8 group">
                                <div className="w-36 h-36 -mt-16 mx-auto rounded-[2rem] rotate-45 overflow-hidden">
                                    <img className="w-full h-full object-cover -rotate-45 scale-125 mx-auto transition duration-300 group-hover:scale-[1.4]"
                                        src="https://avatars.dicebear.com/api/adventurer/oops.svg" alt="man" loading="lazy" width="1000" height="667" />
                                </div>
                                <div className="space-y-4 text-center">
                                    <div>
                                        <h4 className="text-2xl font-Hind">Mouhamadou Lamine SANE</h4>
                                        <span className="block text-md text-gray-800 font-Trykker">Intelligence Artificielle</span>
                                    </div>
                                    <a href="#" class="w-max mx-auto flex items-center space-x-3 hover:text-violet-800 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 m-auto" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                    {/* <a href="#" className="block w-max mx-auto text-blue-600">View Bio</a> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>


        </main>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { Turn as Hamburger } from 'hamburger-react'
import { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import { Tooltip } from '@mui/material';
import AsideNavbarContent from './AsideNavbarContent';


export default function HeaderDash() {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1)
    }, [isMobileMenuVisible]);

    return (
        <>
            <header className="sticky flex-shrink-0 flex w-full top-0 z-30 shadow-md shadow-violet-600/40 h-16 md:border-l-[1px] md:rounded-l-sm border-gray-300  bg-gray-900 text-white lg:py-2.5">
                <div className="px-6 flex-1 flex items-center justify-between 2xl:container">
                    <div className='select-none hover:text-transparent hidden md:flex items-center'>
                        <h5 className="pt-2 hover:bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br bg-clip-text from-[#007E3C] via-[#F0E33F] to-[#D71A21] font-Comfortaa text-xl lg:text-2xl font-medium">Tableau de bord</h5>
                    </div>

                    {/* Start Menu Button */}
                    <button type="button" className="transition-all duration-200 rounded-md md:hidden bg-gray-800 hover:bg-gray-700 ">
                        <Hamburger size={29} label="Afficher le menu" rounded toggled={isMobileMenuVisible}
                            onToggle={toggled => {
                                if (toggled) { setIsMobileMenuVisible(!isMobileMenuVisible) }
                                if (count != 0 && count % 2 == 0) setIsMobileMenuVisible(false)
                            }}
                        />
                    </button>
                    {/* End Menu Button */}

                    <Link to={'profil'}>
                        <Tooltip title="Cliquez pour accéder à votre profil" placement='bottom' arrow>
                            <div className="flex group items-center">
                                <span className="font-Comfortaa text-lg font-medium">
                                    Mon profil
                                </span>
                                <img className="ml-4 cursor-pointer inline-block h-10 w-10 rounded-full ring-2 ring-violet-700/40 group-hover:ring-violet-700 transition duration-300" src="https://avatars.dicebear.com/api/adventurer/oka.svg" alt="" />
                            </div>
                        </Tooltip>
                    </Link>
                </div>

                {/* Start Mobile nav bar */}
                <Backdrop
                    className="flex justify-start items-center h-screen text-violet-600 bg-gray-700/25 backdrop-blur-[1px] z-50"
                    open={isMobileMenuVisible}
                    onClick={() => setIsMobileMenuVisible(false)}
                >
                    <Slide direction="right" in={isMobileMenuVisible} appear={isMobileMenuVisible} timeout={300}>
                        <nav className="fixed text-white h-screen z-30 flex-shrink-0 w-[200px] xs:w-60 overflow-y-auto bg-gray-900 block">
                            <div className="pt-[6px]">
                                <div className='hover:text-transparent px-2 flex items-center space-x-2'>
                                    <img className='pb-2' src="./../electio_sn_logo.png" alt="Logo Electio SN" width={50} />
                                    <Link to={'/'} className="pt-2">
                                        <span className="bg-clip-text hover:bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br  from-[#007E3C] via-[#F0E33F] to-[#D71A21] text-xl font-bold font-Comfortaa" >
                                            Electio•SN
                                        </span>
                                    </Link>
                                </div>
                                <AsideNavbarContent />
                            </div>
                        </nav>
                    </Slide>
                </Backdrop>
                {/* End Mobile nav bar */}

            </header>
        </>
    )
}

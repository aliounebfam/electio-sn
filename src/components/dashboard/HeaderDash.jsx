import React from 'react'
import { Link } from 'react-router-dom'
import { Turn as Hamburger } from 'hamburger-react'
import { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import AsideNavbarItem from './AsideNavbarItem';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import OtherHousesRoundedIcon from '@mui/icons-material/OtherHousesRounded';
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from 'notistack';


export default function HeaderDash() {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleSignOutClick = async () => {
        await logout().then(() => {
            navigate("/login");
            enqueueSnackbar('Vous êtes correctement déconnecté(e)', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            });
        });
    };

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

                    <Tooltip title="Cliquez pour accéder à votre profil" placement='bottom' followCursor>
                        <img className="ml-4 cursor-pointer inline-block h-10 w-10 rounded-full ring-2 ring-violet-700/40 hover:ring-violet-700 transition duration-300" src="https://avatars.dicebear.com/api/adventurer/oka.svg" alt="" />
                    </Tooltip>
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
                                <div>
                                    <div className='m-6 flex flex-col space-y-8'>
                                        <AsideNavbarItem text={"Électeurs"} icon={<PersonRoundedIcon />} path={'voters'} />
                                        <AsideNavbarItem text={"Régions"} icon={<ApartmentRoundedIcon />} path={'regions'} />
                                        <AsideNavbarItem text={"Départements"} icon={<LocationCityRoundedIcon />} path={'departments'} />
                                        <AsideNavbarItem text={"Communes"} icon={<OtherHousesRoundedIcon />} path={'municipalities'} />
                                        <AsideNavbarItem text={"Quartiers"} icon={<RoofingRoundedIcon />} path={'districts'} />
                                    </div>
                                    <div onClick={handleSignOutClick} className='cursor-pointer sticky space-x-3 text-gray-300 rounded-t-md hover:text-white bg-gray-900 shadow-[0_-1px_4px_0_rgba(0,0,0,0.1)] shadow-violet-500 inset-0 p-3 pl-6'>
                                        <LogoutRoundedIcon />
                                        <span>
                                            Déconnexion
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </Slide>
                </Backdrop>
                {/* End Mobile nav bar */}

            </header>
        </>
    )
}

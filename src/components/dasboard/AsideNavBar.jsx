import React from 'react'
import { Link } from 'react-router-dom'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import AsideNavbarItem from './AsideNavbarItem';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function AsideNavBar() {
    return (
        <aside className=" text-white h-screen z-30 flex-shrink-0 hidden w-60 overflow-y-auto bg-gray-900 md:block">
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
                        <AsideNavbarItem text={"Quartiers"} icon={<LocationCityRoundedIcon />} path={'districts'} />
                    </div>
                    <div className='sticky space-x-3 text-gray-300 rounded-t-md hover:text-white bg-gray-900 shadow-[0_-1px_4px_0_rgba(0,0,0,0.1)] shadow-violet-500 inset-0 p-3 pl-6'>
                        <LogoutRoundedIcon />
                        <span>
                            Déconnexion
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

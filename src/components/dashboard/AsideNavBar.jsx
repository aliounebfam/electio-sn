import React from 'react';
import { Link } from 'react-router-dom';
import AsideNavbarContent from './AsideNavbarContent';

export default function AsideNavBar() {
    return (
        <aside className=" text-white h-screen z-30 flex-shrink-0 hidden w-60 overflow-y-auto bg-gray-900 md:block">
            <div className="pt-[6px]">
                <div className='hover:text-transparent px-2 flex items-center space-x-2'>
                    <img className='pb-2' src="./../electio_sn_logo.png" alt="Logo Electio SN" width={50} />
                    <Link to={'/'} className="pt-2">
                        <span className="bg-clip-text hover:bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br from-[#007E3C] via-[#F0E33F] to-[#D71A21] text-xl font-bold font-Comfortaa" >
                            Electio•SN
                        </span>
                    </Link>
                </div>
                <AsideNavbarContent />
            </div>
        </aside>
    )
}

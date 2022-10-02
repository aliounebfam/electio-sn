import React from 'react'
import { Link } from 'react-router-dom'
import { Turn as Hamburger } from 'hamburger-react'
import { useState, useEffect } from 'react';

export default function HeaderDash() {

    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1)
    }, [isMobileMenuVisible])

    return (
        <>
            <header className="sticky flex-shrink-0 flex w-full top-0 z-30 shadow-md shadow-violet-600/40 h-16 border-l-[1px] rounded-l-sm border-gray-300  bg-gray-900 text-white lg:py-2.5">
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

                    <img className="ml-4 cursor-pointer inline-block h-10 w-10 rounded-full ring-2 ring-violet-700" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
            </header>
        </>
    )
}

import React from 'react';
import { useState } from 'react';
import { Turn as Hamburger } from 'hamburger-react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CustomLinkUnderline from '../../utils/CustomLinkUnderline';
import { useAuth } from '../../context/AuthContext';


export default function Header() {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [count, setCount] = useState(0);
    const ref = useRef(null)
    const handleClickOutside = (e) => {
        if (ref.current) if (count % 2 != 0 && isMobileMenuVisible && (!ref.current.contains(e.target) || ref.current.contains(e.target.parentElement.parentElement.parentElement) || ref.current.contains(e.target.parentElement.parentElement))) {
            setIsMobileMenuVisible(!isMobileMenuVisible)
        }
    }
    const { currentUser } = useAuth();

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser])


    useEffect(() => {
        document.addEventListener('click', e => handleClickOutside(e), true)
        setCount(count + 1)
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMobileMenuVisible])

    return (
        <>
            <header className="shadow-md shadow-violet-600/30 z-10 sticky bg-gray-900 text-white top-0 pt-3 lg:pb-0 lg:pt-2">
                <div className=" px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16 lg:h-20">
                        <Link to={'/'} className="flex-shrink-0 hover:text-transparent text-white transition-all duration-[350ms] flex items-center">
                            <img className='pb-4' src="electio_sn_logo.png" alt="Logo Electio SN" width={65} />
                            <span className="self-center hover:bg-[length:100%_100%] bg-no-repeat bg-gradient-to-br bg-clip-text from-[#007E3C] via-[#F0E33F] to-[#D71A21] text-xl sm:text-2xl font-Comfortaa font-bold whitespace-nowrap ">Electio•SN</span>
                        </Link>
                        <button type="button" className="inline-flex p-0 md:p-1 transition-all duration-200 rounded-md lg:hidden hover:bg-gray-800 ">
                            <Hamburger size={30} label="Afficher le menu" rounded toggled={isMobileMenuVisible}
                                onToggle={toggled => {
                                    if (toggled) {
                                        setIsMobileMenuVisible(!isMobileMenuVisible)
                                    }
                                    if (count != 0 && count % 2 == 0) setIsMobileMenuVisible(false)
                                }}
                            />
                        </button>
                        <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-8">
                            <CustomLinkUnderline text='Accueil' path='/' className="font-Hind text-lg" isNavLink={true} />
                            <CustomLinkUnderline text='Elections Présidentielles' path='/presidential-election' className="font-Hind text-lg" isNavLink={true} />
                            <CustomLinkUnderline text='FAQ' path='/faq' className="font-Hind text-lg" isNavLink={true} />
                            <CustomLinkUnderline text='Contact' path='/contact' className="font-Hind text-lg" isNavLink={true} />
                        </div>

                        {
                            currentUser == "undefined" ? <>
                                <Link to='/sign-up' className="items-center justify-center hidden px-4 py-2 ml-10 text-base font-semibold text-white transition-all duration-200 bg-transparent border-2 border-violet-700 rounded-md lg:inline-flex hover:bg-violet-700 focus:bg-violet-700" role="button"> S'inscrire </Link>
                                <Link to='/login' className="items-center justify-center hidden px-4 py-2 ml-7 text-base font-semibold text-white transition-all duration-200 bg-violet-600 border border-transparent rounded-md lg:inline-flex hover:bg-violet-700 focus:bg-violet-700" role="button"> Se connecter </Link>
                            </> :
                                <Link to='/dashboard' className="items-center justify-center hidden px-4 py-2 ml-10 text-base font-semibold text-white transition-all duration-200 bg-transparent border-2 border-violet-700 rounded-md lg:inline-flex hover:bg-violet-700 focus:bg-violet-700" role="button"> Accéder au tableau de bord </Link>

                        }
                    </nav>
                    <nav ref={ref} className={isMobileMenuVisible ? "isolate fixed top-[76px] left-0 w-full h-min visible opacity-100 max-h-min pt-4 pb-6 bg-gray-900 border border-violet-600/40 shadow-2xl shadow-violet-600/30 lg:hidden" : "left-0 top-[88px] w-full h-50 fixed transition-all max-h-0"}>
                        <div className={isMobileMenuVisible ? "flow-root" : "pointer-events-none"}>
                            <div tabIndex="-1" className={isMobileMenuVisible ? " flex flex-col px-6 -my-2 space-y-4 opacity-100 duration-500 transition-transform-[opacity]" : "pointer-events-none opacity-0"}>
                                <CustomLinkUnderline text='Accueil' path='/' className="font-Hind text-lg" isNavLink={true} />
                                <CustomLinkUnderline text='Election Présidentielles' path='/presidential-election' className="font-Hind text-lg" isNavLink={true} />
                                <CustomLinkUnderline text='FAQ' path='/faq' className="font-Hind text-lg" isNavLink={true} />
                                <CustomLinkUnderline text='Contact' path='/contact' className="font-Hind text-lg" isNavLink={true} />
                            </div>
                        </div>
                        {
                            currentUser == "undefined" ? <>
                                <div className={isMobileMenuVisible ? "px-6 mt-6 opacity-100 transition-all duration-500 translate-x-0" : "-translate-x-[3px] opacity-0 pointer-events-none"}>
                                    <Link to={'/sign-up'} className="inline-flex justify-center px-6 py-3 text-base font-semibold text-white transition-all duration-200 bg-transparent border-2 border-violet-600 rounded-md  hover:bg-violet-700 focus:bg-violet-700" role="button"> S'inscrire </Link>
                                </div>
                                <div className={isMobileMenuVisible ? "px-6 mt-5 opacity-100 transition-all duration-500 translate-x-0" : "-translate-x-[3px] opacity-0 pointer-events-none"}>
                                    <Link to={'/login'} className="inline-flex justify-center px-6 py-3 text-base font-semibold text-white transition-all duration-200 bg-violet-600 border border-transparent rounded-md  hover:bg-violet-700 focus:bg-violet-700" role="button"> Se connecter </Link>
                                </div>
                            </> :
                                <div className={isMobileMenuVisible ? "px-6 mt-5 opacity-100 transition-all duration-500 translate-x-0" : "-translate-x-[3px] opacity-0 pointer-events-none"}>
                                    <Link to={'/dashboard'} className="inline-flex justify-center px-6 py-3 text-base font-semibold text-white transition-all duration-200 bg-violet-600 border border-transparent rounded-md  hover:bg-violet-700 focus:bg-violet-700" role="button"> Accéder au tableau de bord </Link>
                                </div>
                        }
                    </nav>
                </div>
            </header>
        </>

    )
}

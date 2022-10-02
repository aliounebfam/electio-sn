import React from 'react'
import { Outlet } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';
import './../app/App.css'
import HeaderDash from '../../components/dasboard/HeaderDash';
import AsideNavBar from '../../components/dasboard/AsideNavBar';

export default function Dashboard() {
    return (
        <>
            <div className='flex'>
                <AsideNavBar />
                <div className='w-full h-screen flex flex-col '>
                    <HeaderDash />
                    <main className='bg-gray-300/[0.5] h-full w-full overflow-y-auto'>
                        <div className='sm:container grid px-6 py-3 mx-auto '>

                            <Outlet />

                        </div>
                    </main>
                </div>
            </div>

            <ScrollRestoration />
        </>
    )
}

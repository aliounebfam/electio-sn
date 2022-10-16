import './../app/App.css'
import React from 'react'
import { Outlet } from 'react-router-dom';
import { Detector } from "react-detect-offline";
import { useSnackbar } from 'notistack'
import { useEffect } from 'react';
import { useState } from 'react';
import HeaderDash from '../../components/dashboard/HeaderDash';
import AsideNavBar from '../../components/dashboard/AsideNavBar';

export default function Dashboard() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [online, setOnline] = useState(true);

    useEffect(() => {
        if (!online) {
            enqueueSnackbar('Veuillez vous connectez sinon certaines de vos actions ne seront pas prises en compte.', {
                variant: 'warning', persist: true, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                },
                style: { whiteSpace: "pre-line", textAlign: "center" },
                className: "bg-[#ed8d00]"
            });
            enqueueSnackbar('Vous êtes actuellement hors ligne !', {
                variant: 'error', persist: true, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                }
            });
        }
        else {
            closeSnackbar();
        }
    }, [online]);

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
            <Detector
                onChange={online => setOnline(online)}
                render={() => (
                    <></>
                )}
                polling={
                    {
                        url: "https://ipv4.icanhazip.com",
                    }
                }
            />
        </>
    )
}

import './../app/App.css'
import React from 'react'
import { Outlet } from 'react-router-dom';
import { Detector } from "react-detect-offline";
import { useSnackbar } from 'notistack'
import { useEffect } from 'react';
import { useState } from 'react';
import HeaderDash from '../../components/dashboard/HeaderDash';
import AsideNavBar from '../../components/dashboard/AsideNavBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [online, setOnline] = useState(true);
    const [dashboardOfflineFirstSnackbarId, setDashboardOfflineFirstSnackbarId] = useState(null);
    const [dashboardOfflineSecondSnackbarId, setDashboardOfflineSecondSnackbarId] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser == null) {
            navigate('/login');
            enqueueSnackbar('Vous n\'êtes pas connecté(e) !', {
                variant: 'warning'
            });
        }
    }, []);

    useEffect(() => {
        if (!online) {
            setDashboardOfflineFirstSnackbarId(enqueueSnackbar('Veuillez vous connectez sinon certaines de vos actions ne seront pas prises en compte.', {
                variant: 'warning', persist: true, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                },
                style: { whiteSpace: "pre-line", textAlign: "center" },
                className: "bg-[#ed8d00]"
            }));
            setDashboardOfflineSecondSnackbarId(enqueueSnackbar('Vous êtes actuellement hors ligne !', {
                variant: 'error', persist: true, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                }
            }));
        }
        else {
            if (dashboardOfflineFirstSnackbarId != null && dashboardOfflineSecondSnackbarId != null)
                closeSnackbar(dashboardOfflineFirstSnackbarId);
            closeSnackbar(dashboardOfflineSecondSnackbarId);
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

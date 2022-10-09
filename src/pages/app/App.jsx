import Header from './../../components/app/Header'
import Footer from './../../components/app/Footer'
import './App.css'
import { Outlet } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';
import { Detector } from "react-detect-offline";
import { useSnackbar } from 'notistack'
import { useEffect } from 'react';
import { useState } from 'react';


function App() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [online, setOnline] = useState(true);

    useEffect(() => {
        if (!online) {
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
    });

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
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

export default App

import Header from './../../components/app/Header'
import Footer from './../../components/app/Footer'
import './App.css'
import { Outlet } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';


function App() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
        </>
    )
}

export default App

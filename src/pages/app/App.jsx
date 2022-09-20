import { useState } from 'react';
import reactLogo from './../../assets/react.svg';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Header from './../../components/app/Header'
import Footer from './../../components/app/Footer'
import './App.css'


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Header />
            <div className="App">
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src="/vite.svg" className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://reactjs.org" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <h1>Vite and React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.jsx</code> aHMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vit
                </p>
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Alert severity="success">
                    This is a success alert — <strong>check it out!</strong>
                </Alert>
            </div>
            <Footer />
        </>
    )
}

export default App

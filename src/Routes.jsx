import {
    createBrowserRouter,
} from "react-router-dom";
import App from "./pages/app/App";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
]);
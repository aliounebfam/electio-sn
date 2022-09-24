import {
    createBrowserRouter,
} from "react-router-dom";
import App from "./pages/app/App";
import Contact from "./pages/app/Contact/Contact";
import Faq from "./pages/app/FAQ/Faq";
import Home from "./pages/app/Home/Home";
import NotFoundPage from "./pages/NotFoundPage";


export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/faq",
                    element: <Faq />
                },
                {
                    path: "/contact",
                    element: <Contact />
                },
            ]
        },
        {
            path: "*",
            element: <NotFoundPage />,
        }
    ]
);
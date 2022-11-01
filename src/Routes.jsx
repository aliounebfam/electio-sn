import App from "./pages/app/App";
import Contact from "./pages/app/Contact/Contact";
import Faq from "./pages/app/FAQ/Faq";
import Home from "./pages/app/Home/Home";
import SignUp from "./pages/app/SignUp/SignUp";
import Login from "./pages/app/Login/Login";
import NotFoundPage from "./pages/NotFoundPage";
import CredentialRequest from "./pages/app/CredentialRequest/CredentialRequest";
import Dashboard from "./pages/dashboard/Dashboard";
import Voters from "./pages/dashboard/Voters";
import Regions from "./pages/dashboard/Regions";
import Departments from "./pages/dashboard/Departments";
import Districts from "./pages/dashboard/Districts";
import Municipalities from "./pages/dashboard/Municipalities";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Profile from "./pages/dashboard/Profile";
import Election from "./pages/dashboard/Election";
import Vote from "./pages/dashboard/Vote";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "",
                    element: <Home />
                },
                {
                    path: "faq",
                    element: <Faq />
                },
                {
                    path: "contact",
                    element: <Contact />
                },
                {
                    path: "sign-up",
                    element: <SignUp />
                },
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "credential-request",
                    element: <CredentialRequest />
                },
                {
                    path: "dashboard",
                    element: <Dashboard />,
                    children: [
                        {
                            path: "vote",
                            element: <Vote />
                        },
                        {
                            path: "elections",
                            element: <Election />
                        },
                        {
                            path: "voters",
                            element: <Voters />
                        },
                        {
                            path: "regions",
                            element: <Regions />
                        },
                        {
                            path: "departments",
                            element: <Departments />
                        },
                        {
                            path: "districts",
                            element: <Districts />
                        },
                        {
                            path: "municipalities",
                            element: <Municipalities />
                        },
                        {
                            path: "profile",
                            element: <Profile />
                        },
                        {
                            path: "",
                            element: <Navigate to="vote" />
                        },
                    ]
                },
            ]
        },
        {
            path: "*",
            element: <NotFoundPage />,
        }
    ]
);
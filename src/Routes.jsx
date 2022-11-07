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
import AdminRoute from "./utils/AdminRoute";
import SuperAdminRoute from "./utils/SuperAdminRoute";
import PresidentialElection from "./pages/app/PresidentialELection/PresidentialElection";
import PresidentialElectionYear from "./pages/app/PresidentialELection/PresidentialElectionYear";
import CheckElectionYearRoute from "./utils/CheckElectionYearRoute";
import { getElectionDataFromSpecificYear } from "./services/dashboard/ElectionService";


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
                    path: "presidential-election",
                    element: <PresidentialElection />,
                },
                {
                    path: "presidential-election/:year",
                    element:
                        <CheckElectionYearRoute>
                            <PresidentialElectionYear />
                        </CheckElectionYearRoute>,
                    loader: async ({ params }) => {
                        let election = undefined;
                        await getElectionDataFromSpecificYear(Number(params.year))
                            .then(r => election = r);
                        return election;
                    }
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
                            element:
                                <SuperAdminRoute>
                                    <Election />
                                </SuperAdminRoute>
                        },
                        {
                            path: "voters",
                            element:
                                <AdminRoute>
                                    <Voters />
                                </AdminRoute>
                        },
                        {
                            path: "regions",
                            element:
                                <SuperAdminRoute>
                                    <Regions />
                                </SuperAdminRoute>
                        },
                        {
                            path: "departments",
                            element:
                                <SuperAdminRoute>
                                    <Departments />
                                </SuperAdminRoute>
                        },
                        {
                            path: "districts",
                            element:
                                <SuperAdminRoute>
                                    <Districts />
                                </SuperAdminRoute>
                        },
                        {
                            path: "municipalities",
                            element:
                                <SuperAdminRoute>
                                    <Municipalities />
                                </SuperAdminRoute>
                        },
                        {
                            path: "profile",
                            element: <Profile />
                        },
                        {
                            path: "",
                            element: <Navigate to="vote" replace={true} />
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
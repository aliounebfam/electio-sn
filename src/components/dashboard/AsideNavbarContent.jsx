import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import AsideNavbarItem from './AsideNavbarItem';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import OtherHousesRoundedIcon from '@mui/icons-material/OtherHousesRounded';
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useAuth } from '../../context/AuthContext';

export default function AsideNavbarContent() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleSignOutClick = async () => {
        await logout().then(() => {
            navigate("/login");
            enqueueSnackbar('Vous êtes correctement déconnecté(e)', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            });
        });
    };

    return (
        <div>
            <div className='m-6 flex flex-col space-y-8'>
                <AsideNavbarItem text={"Électeurs"} icon={<PersonRoundedIcon />} path={'voters'} />
                <AsideNavbarItem text={"Régions"} icon={<ApartmentRoundedIcon />} path={'regions'} />
                <AsideNavbarItem text={"Départements"} icon={<LocationCityRoundedIcon />} path={'departments'} />
                <AsideNavbarItem text={"Communes"} icon={<OtherHousesRoundedIcon />} path={'municipalities'} />
                <AsideNavbarItem text={"Quartiers"} icon={<RoofingRoundedIcon />} path={'districts'} />
            </div>
            <div onClick={handleSignOutClick} className='cursor-pointer sticky space-x-3 text-gray-300 rounded-t-md hover:text-white bg-gray-900 shadow-[0_-1px_4px_0_rgba(0,0,0,0.1)] shadow-violet-500 inset-0 p-3 pl-6'>
                <LogoutRoundedIcon />
                <span>
                    Déconnexion
                </span>
            </div>
        </div>
    )
}

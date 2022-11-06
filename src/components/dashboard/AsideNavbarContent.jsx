import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import AsideNavbarItem from './AsideNavbarItem';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import OtherHousesRoundedIcon from '@mui/icons-material/OtherHousesRounded';
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import HowToVoteRoundedIcon from '@mui/icons-material/HowToVoteRounded';
import BallotIcon from '@mui/icons-material/Ballot';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useAuth } from '../../context/AuthContext';

export default function AsideNavbarContent() {
    const navigate = useNavigate();
    const { logout, currentDataUser } = useAuth();
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
        <div className='flex flex-col justify-between h-[calc(100vh-65px)]'>

            <div className='my-9 mx-6 flex flex-col space-y-10'>
                <AsideNavbarItem text={"Voter"} icon={<BallotIcon />} path={'vote'} />

                {(currentDataUser?.isAdmin || currentDataUser?.isSuperAdmin) && <div className='flex flex-col space-y-8'>
                    <p className='text-sm text-gray-200 decoration-white underline underline-offset-1 decoration-wavy italic font-semibold'>Section administrateur</p>
                    <AsideNavbarItem text={"Électeurs"} icon={<PersonRoundedIcon />} path={'voters'} />
                </div>}

                {currentDataUser?.isSuperAdmin && <div className='flex flex-col space-y-8'>
                    <p className='text-sm text-gray-200 underline-offset-1 decoration-white underline decoration-wavy italic font-semibold'>Section super administrateur</p>
                    <AsideNavbarItem text={"Élections"} icon={<HowToVoteRoundedIcon />} path={'elections'} />
                    <AsideNavbarItem text={"Régions"} icon={<ApartmentRoundedIcon />} path={'regions'} />
                    <AsideNavbarItem text={"Départements"} icon={<LocationCityRoundedIcon />} path={'departments'} />
                    <AsideNavbarItem text={"Communes"} icon={<OtherHousesRoundedIcon />} path={'municipalities'} />
                    <AsideNavbarItem text={"Quartiers"} icon={<RoofingRoundedIcon />} path={'districts'} />
                </div>}
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

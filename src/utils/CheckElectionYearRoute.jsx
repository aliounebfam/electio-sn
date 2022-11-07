import { useLoaderData, Navigate } from 'react-router-dom';

export default function CheckElectionYearRoute({ children, redirectPath = "/presidential-election" }) {
    const isExist = useLoaderData();
    if (isExist)
        return children
    return <Navigate to={redirectPath} replace={true} />;
}
import { useLoaderData, Navigate } from 'react-router-dom';

export default function CheckElectionYearRoute({ children, redirectPath = "/presidential-election" }) {
    const election = useLoaderData();

    if (election?.state == "inProgress" || election?.state == "stopped")
        return children
    return <Navigate to={redirectPath} replace={true} />;
}
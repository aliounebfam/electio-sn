import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function SuperAdminRoute({ children, redirectPath = "/dashboard" }) {
    const { currentDataUser } = useAuth();

    if (currentDataUser?.isSuperAdmin) {
        return children;
    }
    return <Navigate to={redirectPath} replace={true} />;
}
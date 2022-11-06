import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function AdminRoute({ children, redirectPath = "/dashboard" }) {
    const { currentDataUser } = useAuth();

    // console.log(currentDataUser?.isAdmin);

    if (currentDataUser?.isAdmin) {
        return children;
    }
    return <Navigate to={redirectPath} replace={true} />;
}
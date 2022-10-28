import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

type ProtectedRouteProps = {
    children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const context = useContext(AppContext);
    if (!context.username) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute
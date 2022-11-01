import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { auth } from '../firebase-config';

type ProtectedRouteProps = {
    children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // const context = useContext(AppContext);
    // if (!context.user) {
    if (!auth.currentUser) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute
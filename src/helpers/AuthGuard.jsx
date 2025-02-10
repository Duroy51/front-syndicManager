import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/AccountService';

export const AuthGuard = ({ children }) => {

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;

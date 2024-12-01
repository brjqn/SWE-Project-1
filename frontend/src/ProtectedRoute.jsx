import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const ProtectedRoute = ({children}) => {
    const{currentUser} = useContext(UserContext);

    if(!currentUser){
        return <Navigate to="/login" />
    }

    return children;
};

export default ProtectedRoute;
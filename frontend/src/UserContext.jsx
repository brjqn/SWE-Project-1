import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const contextValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

//This allows us to store and use the user within the entire app
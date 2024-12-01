import React, { createContext, useState, useMemo } from 'react';

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
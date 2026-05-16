import React from 'react';
const { createContext, useContext, useState } = React;

const SocialContext = createContext();

export const SocialProvider = ({ children }) => {
    const [social, setSocial] = useState({
        notifications: [],
        followers: [],
        following: [],
        followRequests: [],
    });

    return (
        <SocialContext.Provider value={{social,setSocial,}}>
            {children}
        </SocialContext.Provider>
    );
};

export const useSocial = () => {
    return useContext(SocialContext);
};
import { createContext, useEffect, useState } from 'react';
import { getMe } from './services/auth.api.js';

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getMe();
                setUser(response.user);
            } catch (error) {
                setUser(null);
            }
        }

        loadUser();
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
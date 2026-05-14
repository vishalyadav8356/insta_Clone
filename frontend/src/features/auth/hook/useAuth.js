import {useContext} from 'react';
import { AuthContext } from '../auth.context.jsx';
import {login, register, logout} from '../services/auth.api.js'

export const useAuth =()=>{

    const context = useContext(AuthContext);

    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async (username, password)=>{
        try {
            setLoading(true)
            const response = await login(username, password);
            setUser(response.user);
            setLoading(false);
            return response;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }

    const handleRegister = async (username , email, password)=>{
        try {
            setLoading(true)
            const response = await register(username, email, password);
            setUser(response.user);
            setLoading(false);
            return response;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }

    const handleLogout = async ()=>{
        try {
            setLoading(true)
            await logout();
            setUser(null);
            setLoading(false)
        } catch (error) {
            console.error("Logout error:", error);
            // Still clear user state even if API call fails
            setUser(null);
            setLoading(false)
        }
    }   

    return{
        user,
        setUser,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    }

}
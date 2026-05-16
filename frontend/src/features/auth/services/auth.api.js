import axios from "axios";

{/* creating an axios instance with baseURL and withCredentials set to true */}
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

{/* function to register a new user */}
export const register = async (username, email, password)=>{
    try{
        const response = await api.post("/register",{
            username,
            email,
            password
        })
        return response.data
    }catch(err){
        throw err
    }

}

{/* function to login a user */}
export const login = async (username, password)=>{
    try{
        const response = await api.post("/login", {
            username,
            password
        })
        return response.data
    }catch(err){
        throw err
    }
}

{/* function to get the current logged in user */}
export const getMe = async ()=>{
    try{    
        const response = await api.get("/get-me")
        return response.data
    }catch(err){
        throw err
    }
}

{/* function to logout a user */}
export const logout = async ()=>{
    try{
        const response = await api.post("/logout")
        return response.data
    }catch(err){
        throw err
    }
}

{/* function to check if the username is already taken or not */}
export const checkUsername = async (username)=>{
    try{
        const response = await api.get(`/checkUsername/${username}`)
        return response.data
    }catch(err){
        throw err
    }
}
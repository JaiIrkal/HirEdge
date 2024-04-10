import {  useAuth } from './AuthContext'
import { useContext } from 'react'
import useAxiosPrivate from './axiosPrivate'

import { deleteItem, getValueFor } from './useSecureStore'

const useLogout = () =>{

    const {setAuthState} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const logout = async () =>{
        console.log("logout called  ")
        try{

            const refresh_token  = await getValueFor('refresh_token');
            const response = await axiosPrivate.get('/logout',{
                headers: {
                    "Content-Type":'application/json',
                    "Cookie": `refresh_token=${refresh_token}`
                },
                withCredentials: true
            })

            if(response.status==200){
                {await deleteItem('refresh_token');
                setAuthState(null) } 
            }
        }catch(err){
            console.log(err);
        }
        
    }
    return logout;
}

export default useLogout;
import axios from "axios";


//replace the baseURL with IP of your machine
// ipconfig - to find the ip address of mac
const baseURL = 'https://hiredge-api.onrender.com/';

const instance = axios.create({
    baseURL:baseURL,
    responseType: 'json'

})


export const axiosPrivate = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers:{
        "Content-Type": 'application/json',
    }
});

/* fdafasfasf*/
export default instance;
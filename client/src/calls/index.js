import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json', // communication will happen in json format
        'authorization': `Bearer ${localStorage.getItem('token')}` // token will be sent in the header for authentication
    }
})
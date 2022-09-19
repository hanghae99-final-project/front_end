
import axios from 'axios';

// const accessToken = localStorage.getItem('token');

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export default instance;


import axios from 'axios';

// const accessToken = localStorage.getItem('token');

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    // headers: {
    //     Authorization: `Bearer ${accessToken || JSON.parse(accessToken)}`,
    // },
});

export default instance;

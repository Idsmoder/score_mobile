import axios from 'axios';

const API_URL = 'https://api.score.gx.uz/api/'; // Replace with your API base URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (body) => {
    try {
        const response = await api.post('auth/login',  body);
        console.log(response.data,'data');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export default api;

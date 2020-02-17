import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-ee433.firebaseio.com/'
});

export default instance;
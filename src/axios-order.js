import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-build-17cdf-default-rtdb.firebaseio.com/'
})

export default instance;
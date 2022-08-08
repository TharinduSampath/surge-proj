import axios from 'axios';

//Used to configure baseUrl
export default axios.create({
    baseURL: "http://localhost:8080"
});
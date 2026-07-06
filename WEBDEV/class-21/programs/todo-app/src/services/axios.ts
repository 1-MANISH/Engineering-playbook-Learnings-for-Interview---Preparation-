import axios from "axios";

export const axiosInstance = axios.create({
        baseURL:"http://jsonplaceholder.typicode.com/"
}) 
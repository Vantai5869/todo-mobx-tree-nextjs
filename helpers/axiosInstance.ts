import axios from "axios";
import * as Config from './../constants/Config';
const axiosInstance = (history = null) => {
    const baseURL = Config.API_URL
    let headers: any = { 'Content-Type': 'application/json;charset=utf-8', };
   
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers,
    });

    axiosInstance.interceptors.response.use(
        (response) =>
            new Promise((resolve, reject) => {
                resolve(response);
            }),
        (error) => {
            if (!error.response) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        }
    );

    return axiosInstance;
};

export default axiosInstance
import axios from 'axios';
import toast from 'react-hot-toast';

const AxiosInterceptors = axios.create();

AxiosInterceptors.interceptors.response.use(
    (response) => {
        console.log('axios interceptor: ', response)

        if (response?.status === 401) {
            toast.error("Unauthorized")
            // sessionStorage.clear()
            // window.location.href = '/'
        }

        return response;
    },
    (error) => {
        console.log('axios interceptor: ', error)
        if (error?.response && error?.response?.status === 401) {
            toast.error("Unauthorized")
            // sessionStorage.clear()
            // window.location.href = '/'
        }
        return Promise.reject(error);
    }
);

export default AxiosInterceptors
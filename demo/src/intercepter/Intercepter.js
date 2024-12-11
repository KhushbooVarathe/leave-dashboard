import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
//   timeout: 10000, 
});
const refreshtoken = JSON.parse(localStorage.getItem('refreshtoken'));

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('accesstoken'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('Request Interceptor:', config);
    return config;
  },
  (error) => {
    // console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    // console.log('Response Interceptor:', response);
    return response;
  },
 async (error) => {
    // console.error('Response Error:', error);
    if (error.response && error.response.status === 401) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/refresh-token`, { refreshtoken });
        if (res.status === 200) {
            console.log('res: ', res);
            localStorage.setItem('accesstoken', JSON.stringify(res.data.access));
            localStorage.setItem('refreshtoken', JSON.stringify(res.data.refresh));
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        if (error.response) {
            // Server responded with a status code other than 2xx
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something else happened in setting up the request
            console.error('Error setting up the request:', error.message);
        }
    
        // Optionally, redirect to login or show a notification to the user
        alert('Session expired. Please log in again.');
        window.location.href = '/';
    }
    
    }
    else if(error.response && error.response.status === 400){
        window.location.href = '/';

    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;

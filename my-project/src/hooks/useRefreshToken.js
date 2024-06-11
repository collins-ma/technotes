import axios from 'axios';
import useAuth from '../useAuth';

// const REFRESH_URL = 'http://localhost:3500/refresh';
const apiUrl = process.env.REACT_APP_API_URL

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get(`${apiUrl}/refresh`, {
                withCredentials: true,
            });
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return { 
                    ...prev,
                    roles:response.data.roles,
                    
                    accessToken: response.data.accessToken };
            });
            return response.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    };

    return refresh;
};

export default useRefreshToken;

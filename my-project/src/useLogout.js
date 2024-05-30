
import axios from 'axios';
import useAuth from './useAuth';


// const LOGOUT_URL = "http://localhost:3500/logout";
const API_URL = process.env.REACT_APP_API_URL

const useLogout = () => {
  const { setAuth}=useAuth()

    const logout = async () => {
        setAuth({}); 

        try {
            const response = await axios.get(`${API_URL}/logout`, {
                withCredentials: true
            });
            console.log(response.data); 

        } catch (error) {
            console.log(error);
        }
    };

    return logout;
};

export default useLogout;


import axios from 'axios';
import useAuth from './useAuth';


// const LOGOUT_URL = "http://localhost:3500/logout";
const apiUrl = process.env.REACT_APP_API_URL

const useLogout = () => {
  const { setAuth}=useAuth()

    const logout = async () => {
        setAuth({}); 

        try {
            const response = await axios.get(`${apiUrl}/logout`, {
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

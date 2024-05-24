// import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import useAuth from "../useAuth";
// import { useNavigate, useLocation } from "react-router-dom";

//  const useAxiosPrivate = () => {
//     const location=useLocation()
//     const refresh=useRefreshToken()
//     const{auth,setAuth}=useAuth()
//     const navigate=useNavigate()

//     useEffect(()=>{
//         const requestIntercept=axiosPrivate.interceptors.request.use(
//             config=>{
//                 if(!config.headers['Authorization']){
//                     config.headers['Authorization']=`Bearer ${auth?.accessToken}`;
                    
//                 }
//                 return config;
//             },
//             (error)=>Promise.reject(error)



//         )


//         const responseIntercept=axiosPrivate.interceptors.response.use(
//             response=>response,
//             async(error)=>{
//                 const prevRequest=error?.config;
//                 if(error?.response?.status===403 && !prevRequest.sent){
//                     prevRequest.sent=true
//                     setAuth({});
//                     navigate('/login', { state: { from: location }, replace: true });
            
//                     const newAccessToken=await refresh()
//                     prevRequest.headers['Authorization']=`Bearer ${newAccessToken}`;
//                     return axiosPrivate(prevRequest)

//                 }
//                 return Promise.reject(error)



//             }
            
//         );
//         return ()=>{
//             axiosPrivate.interceptors.response.eject(responseIntercept)
//             axiosPrivate.interceptors.request.eject(requestIntercept)



//         }



//     },[auth ,refresh,navigate,setAuth])

//     return axiosPrivate
 
// }

// export default useAxiosPrivate





import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "../useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const useAxiosPrivate = () => {
  const location = useLocation();
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            setAuth(prev => ({
              ...prev,
              accessToken: newAccessToken
            }));
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (err) {
            setAuth({});
            navigate('/login', { state: { from: location }, replace: true });
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh, navigate, setAuth, location]);

  return axiosPrivate;
};

export default useAxiosPrivate;

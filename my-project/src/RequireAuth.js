// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "./useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         auth?.roles?.find(role => allowedRoles?.includes(role))
//             ? <Outlet />
//             : auth?.user
//                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//                 : <Navigate to="/login" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;

// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "./useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     const userHasRequiredRole = auth?.roles?.some(role => allowedRoles.includes(role));

//     if (userHasRequiredRole) {
//         return <Outlet />;
//     }

//     if (auth?.user) {
//         return <Navigate to="/unauthorized" state={{ from: location }} replace />;
//     }
//     // else{
//     //     return <Navigate to="/login" state={{ from: location }} replace />;
//     // }

 
// }

// export default RequireAuth;


// import React from 'react';
// import { useLocation, Navigate, Outlet } from 'react-router-dom';
// import useAuth from './useAuth'; // Adjust the import based on your actual useAuth hook location

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     const hasRequiredRole = auth?.roles?.some(role => allowedRoles?.includes(role));

//     if (hasRequiredRole) {
//         return <Outlet />;
//     }

//     else{
//         return <Navigate to="/unauthorized" state={{ from: location }} replace />;

//     } 
//         // User is authenticated but does not have the required role

//     //  else {
//     //     // User is not authenticated
//     //     return <Navigate to="/login" state={{ from: location }} replace />;
//     // }
// };

// export default RequireAuth;



// import { Navigate, Outlet } from "react-router-dom";
// import useAuth from "./useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();

  

//     if (!auth?.roles?.some(role => allowedRoles?.includes(role))) {
//         // If the user is authenticated but does not have the required roles, navigate to the unauthorized page
//         return <Navigate to="/login" />;
//     }

//     // If the user is authenticated and has the required roles, render the Outlet
//     return <Outlet />;
// }

// export default RequireAuth;



import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;

// import { useContext } from 'react';
// import { useLocation, Navigate, Outlet } from 'react-router-dom';
// import AuthContext from './AuthProvider';

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useContext(AuthContext);
//     const location = useLocation();

//     // if (!auth?.user) {
//     //     // User is not authenticated
//     //     return <Navigate to="/login" state={{ from: location }} replace />;
//     // }

//     if (!auth?.roles?.some(role => allowedRoles.includes(role))) {
//         // User is authenticated but does not have the required role
//         return <Navigate to="/unauthorized" state={{ from: location }} replace />;
//     }

//     // User is authenticated and has the required role
//     return <Outlet />;
// };

// export default RequireAuth;
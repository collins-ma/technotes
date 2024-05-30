import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from './useAuth';

// const LOGIN_URL = '/auth';
const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setAuth, persist, setPersist } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/auth`,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ roles, accessToken });
      setUserName('');
      setPassword('');
      setSuccess(true);
      // const from = location.state?.from?.pathname || '/dashboard'; // Conditionally navigate
      // navigate(from, { replace: true });
      navigate('/dashboard')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 429) {
        setErrMsg('Too many requests, try again after 60s pause');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <>
      {success ? (
        <section className="flex justify-center items-center h-screen bg-cyan-950">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">You are logged in!</span>
          </div>
        </section>
      ) : (
        <section className="flex justify-center items-center h-screen bg-cyan-950">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 md:w-1/2 lg:w-1/3">
            <p
              ref={errRef}
              className={errMsg ? 'errmsg text-red-500' : 'offscreen'}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="text-2xl mb-4 text-center text-green-500">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                  value={username}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={persist}
                  onChange={togglePersist}
                  className="mr-2 leading-tight"
                />
                <label htmlFor="rememberMe" className="text-gray-700 text-sm">
                  Keep me logged in
                </label>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Auth/authSlice'; 
import LoadingSpinner from './LoadingSpinner';

const Signin = () => {
    const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('password') || '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Access auth state from Redux
  const { isLoggedIn, isLoading, role, error } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  // Handle sign-in
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })); 
  };

  // Toast notifications and navigation on state changes
  useEffect(() => {
    if (isLoggedIn) {
      toast.success('Login successful!', {
        autoClose: 5000,
        onClose: () => navigate('/'),
      });
    }
    if (error) {
      toast.error('Login failed. Please check your credentials.', {
        autoClose: 5000,
      });
    }
  }, [isLoggedIn, error, navigate]);

  return (
    <>
      <ToastContainer />
      {isLoading && <LoadingSpinner />}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Use setEmail here
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;

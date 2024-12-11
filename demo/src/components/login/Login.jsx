import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [remember, setRemember] = useState(false);
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);
            if (response.status == 200) {
                setSuccess(true);
                const { access, refresh,userDetails } = response.data;
              
                    localStorage.setItem('userDetails', JSON.stringify(userDetails));
                    localStorage.setItem('accesstoken', JSON.stringify(access));
                    localStorage.setItem('refreshtoken', JSON.stringify(refresh));
               
                //     sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
                //     sessionStorage.setItem('accesstoken', JSON.stringify(access));
                //     sessionStorage.setItem('refreshtoken', JSON.stringify(refresh));
                // } 
                navigate('/dashboard');
            }

        } catch (err) {
            console.error(err);
            if (err.status == 401) {
                setError(err.response.data.error)
            } else if (err.status == 404) {
                setError(err.response.data.error)

            }
            else {

                setError(
                    err.response && err.response.data && err.response.data.message
                        ? err.response.data.message
                        : 'Something went wrong. Please try again.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {error && (
                    <div className="mb-4 m-auto text-red-600 text-sm">
                        {error}
                    </div>
                )}
                {success && <p className='bg-green-300'>User LoggedIn Successfully</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                            Email :
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="name@example.com"
                            value={formData?.email}
                            onChange={handleChangeData}
                            required
                        />
                    </div>

                    <div className="mb-5 relative">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Password :
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData?.password}
                            onChange={handleChangeData}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-10 text-sm text-blue-500"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                      
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center mb-5">
                        <input
                            id="remember"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : null}
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Additional Links */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

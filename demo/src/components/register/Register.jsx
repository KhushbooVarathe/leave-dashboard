import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validation logic
        if (name === "password") {
            if (value.length < 6) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "Password should contain at least 6 characters",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        } else if (name === "cpassword") {
            if (formData.password !== value) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "Password and Confirm Password must match",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        } else if (!value.trim()) {
            setErrors((prev) => ({
                ...prev,
                [name]: `${name} is required`,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        submitData();
    };

    const submitData = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData)
            if (response.status == 200) {
                setSuccess(true);
                setError("");
                navigate('/')
            }
        } catch (error) {
            setSuccess(false);
            if (error.status == 404) {
                setError(error?.response?.data?.error)
            } else {
                setError(error?.response?.data?.error)
            }
        }
    }

    return (
        <div className="shadow max-w-md mx-auto mt-10 p-6 bg-white rounded-lg">
            <h1 className="text-xl font-bold text-center mb-5">Register</h1>
            {error && (
                <div className="mb-4 m-auto text-red-600 text-sm">
                    {error}
                </div>
            )}
            {success && <p className='bg-green-300 text-sm'>User Created Successfully</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="firstname"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your first name"
                        required
                    />
                    {errors.firstname && (
                        <span className="text-red-500 text-sm">{errors.firstname}</span>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="lastname"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your last name"
                        required
                    />
                    {errors.lastname && (
                        <span className="text-red-500 text-sm">{errors.lastname}</span>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your email"
                        required
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                </div>

                <div className="mb-5 relative">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-10 text-sm text-blue-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password}</span>
                    )}
                </div>

                <div className="mb-5 relative">
                    <label
                        htmlFor="cpassword"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="cpassword"
                        name="cpassword"
                        value={formData.cpassword}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Confirm your password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-10 text-sm text-blue-500"
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                    {errors.cpassword && (
                        <span className="text-red-500 text-sm">{errors.cpassword}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;

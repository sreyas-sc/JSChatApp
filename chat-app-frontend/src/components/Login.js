
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogin = async (e) => {
      // navigate('/home')
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email,
                password,
            });
            const user = response.data.user;

            console.log('Login response:', response);
            if (response.data) {
                const { id } = response.data;
                console.log(response.data.id)

            // Store user data in localStorage
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('userEmail', user.email);
                
            const storedEmail = localStorage.getItem('userEmail');
            console.log('Stored Email:', storedEmail);
                navigate('/home'); // Use navigate to change routes
            } else {
                setError('Login failed.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
                      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-indigo-600 bg-clip-text text-transparent">GoFiber</h1>

            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-indigo-600 bg-clip-text text-transparent">Login</h1>
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80 drop-shadow-xl">
            
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                    Login
                </button>
                <p className="mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;

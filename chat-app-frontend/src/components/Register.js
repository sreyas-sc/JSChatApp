
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', {
                email,
                password,
                username, // Include username in the request
            });
            console.log('Register response:', response);
            if (response.data) {
                setRegistered(true);
            } else {
                setError('Registration failed.');
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-indigo-600 bg-clip-text text-transparent">GoFiber</h1>
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-indigo-600 bg-clip-text text-transparent">Register</h1>
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
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
                    <label className="block text-gray-700">User Name</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                {registered && <p className="text-green-500 mb-4">Registration successful! You can now log in.</p>}
                <button
                    type="submit"
                    className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                    Register
                </button>
                <p className="mt-4">
                    Already have an account? <a href="/" className="text-blue-500">Login</a>
                </p>
            </form>
        </div>
        
    );
};

export default Register;

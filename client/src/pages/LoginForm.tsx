import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/user-request';

const Login: React.FC = () => {
    const [email, setEmail] = useState('amy@gmail.com');
    const [password, setPassword] = useState('12345');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const { doRequest, errors } = useRequest({
      url: '/api/users/signin',
      method: 'post',
      onSuccess: (data) => { 
        setUser(data);
        navigate('/');
      },
    });

    const handleLogin = async(e: React.FormEvent) => {
        
        e.preventDefault();
      
        await doRequest({ email, password} );  
      
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {errors}
        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded">
          Login
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
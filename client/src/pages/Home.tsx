import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import useRequest from '../hooks/user-request';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { user,setUser } = useAuth();
  const navigate = useNavigate();

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: (data) => { 
      setUser(null);
       
      navigate('/login');
    },
  });

  const handleLogout = () => {
    doRequest();
  }

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

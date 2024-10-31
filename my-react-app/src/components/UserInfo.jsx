import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get("http://127.0.0.1:8000/api/current-user/", {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`, 
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const setDynamicGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        setGreeting('Good Morning');
      } else if (hours < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    fetchUser();
    setDynamicGreeting();
  }, []);

  if (!user) {
    return <div role="status" class="max-w-sm animate-pulse">
    <div class="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-70 mb-4"></div>
    <span class="sr-only">Loading...</span>
</div>;
  }

  return (
    <div>
      <h1 className='text-3xl font-medium dark:text-white'>
        {greeting}, <span className='text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent'>{user.full_name}</span>
      </h1>
    </div>
  );
};

export default UserInfo;

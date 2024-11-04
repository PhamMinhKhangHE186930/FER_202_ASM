import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.get('http://localhost:9999/customers')
      .then(response => {
        const user = response.data.find(
          customer => customer.username === username && customer.password === password
        );

        if (user) {
          alert("Login successful!");
          localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save user in local storage
          navigate('/');
          window.location.reload();
        } else {
          alert("Incorrect username or password.");
        }
      })
      .catch(error => console.error("Error fetching customers:", error));
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p className="mt-3">
        New to eBay? <a href="/register">Create account</a>
      </p>
    </div>
  );
};

export default LoginPage;

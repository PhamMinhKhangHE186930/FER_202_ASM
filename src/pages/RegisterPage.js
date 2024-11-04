import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== rePassword) {
      setError("Passwords do not match");
      setSuccess('');
      return;
    }

    // Prepare new customer data
    const newCustomer = {
      id: Date.now(),
      username,
      password,
      name,
      email,
      phone,
      address,
    };

    try {
      const response = await axios.post('http://localhost:9999/customers', newCustomer);
      if (response.status === 201) {
        setSuccess("Account created successfully!");
        setError('');
        
        // Redirect to login page after account creation
        setTimeout(() => navigate('/login'), 1000); // Delay to show success message

        // Clear the form fields
        setUsername('');
        setPassword('');
        setRePassword('');
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
      }
    } catch (error) {
      setError("There was an error creating your account. Please try again.");
      setSuccess('');
      console.error("Error registering user:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create an Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="rePassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter your password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="mt-3">
          Create Account
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </Container>
  );
};

export default RegisterPage;

import React, { useEffect, useState } from 'react';

const PersonalPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
  }, []);

  if (!user) return <p>Please log in to view your personal information.</p>;

  return (
    <div>
      <h2>Personal Information</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address}</p>
    </div>
  );
};

export default PersonalPage;

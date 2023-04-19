import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentProfile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get('/api/student/me')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Student Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Age: {profile.age}</p>
      {/* Render other fields from the profile object as needed */}
    </div>
  );
}

export default StudentProfile;

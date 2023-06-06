import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [company, setCompany] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
    phoneNumber: '',
    description: '',
    companySize: '',
    logo: '',
    website: '',
    linkedIn: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        setCompany(response.data);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanyProfile();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setFormData(company);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put('/api/profile', formData);
      setCompany(response.data);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          {!editing ? (
            <>
              <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
              <p className="text-gray-600 mb-6">{company.description}</p>
              <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
              <p className="text-gray-600 mb-2">Email: {company.email}</p>
              <p className="text-gray-600 mb-2">Phone Number: {company.phoneNumber}</p>
              <p className="text-gray-600 mb-2">Website: {company.website}</p>
              <p className="text-gray-600 mb-2">LinkedIn: {company.linkedIn}</p>
              <p className="text-gray-600 mb-2">
                Address: {company.address?.street}, {company.address?.city},{' '}
                {company.address?.state}, {company.address?.zip}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleEdit}
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Company Size</label>
                  <input
                    type="text"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Logo</label>
                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Street</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">ZIP</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BiEditAlt } from 'react-icons/bi'
const ProfilePage = () => {
  const [company, setCompany] = useState({})
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phoneNumber: '',
    description: '',
    companySize: '',
    website: '',
    linkedIn: '',
    address: '',
  })

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get('/api/company/profile')
        setCompany(response.data)
        setFormData(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCompanyProfile()
  }, [])

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancelEdit = () => {
    setEditing(false)
    setFormData(company)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        '/api/company/profile/update',
        formData,
        { withCredentials: true, credentials: 'include' },
      )
      setCompany(response.data)
      setEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto py-8 pt-28">
      <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          {!editing ? (
            <>
              <h2 className="text-3xl font-semibold mb-2">Profile</h2>
              <span className="text-2xl font-bold mb-4">{company.companyName}</span>
              <button
                className="text-right scale-125 py-2 px-4 rounded mt-4"
                onClick={handleEdit}
              >
                <BiEditAlt />
              </button>
              <hr />
              <div className='my-2'>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  className="text-gray-600 mb-2 hover:underline"
                >
                  Website{' '}
                </a>
              )}
              {company.linkedIn && (
                <a
                  href={company.linkedIn}
                  target="_blank"
                  className="text-gray-600 mb-2 hover:underline"
                >
                  LinkedIn
                </a>
              )}
              </div>
              <p className="text-gray-600 mb-2">Your Name: {company.name}</p>
              <p className="text-gray-600 mb-2">Email: {company.email}</p>
              <p className="text-gray-600 mb-2">
                Phone Number: {company.phoneNumber}
              </p>
              <p className="text-gray-600 mb-2">
                Company Size: {company.companySize} employees
              </p>
              <p className="text-gray-600 mb-2">Address: {company.address}</p>
              <p className="text-gray-600 mt-6"> About Company</p>
              <p className="text-gray-600 mb-6 text-justify">
                {company.description}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Company Size
                  </label>
                  <input
                    type="text"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
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
  )
}

export default ProfilePage

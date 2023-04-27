import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddEducation from './AddEducation'
import {RiDeleteBin6Line} from 'react-icons/ri'
function StudentProfile() {
  const [profile, setProfile] = useState({})
  const [educationModal, setEducationModal] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('/api/student/me')
      .then((response) => {
        setProfile(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError(error.message)
      })
  }, [])
  console.log(profile)

  const deleteEducation = async (_id)=>{
    await axios.delete(`/api/student/education/`+_id)
      .then(() => {
        console.log('Education deleted successfully')
      })
      .catch((error) => {
        console.error(error)
      })
    window.location.reload()
  }
  if (error) <div>Error: {error}</div>
  if (!profile) <div>..Loading</div>
  return (
    <div className="max-w-4xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-2">{profile.name}'s Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex mb-4 items-center">
          <img
            src="https://media.istockphoto.com/id/1288538088/photo/portrait-young-confident-smart-asian-businessman-look-at-camera-and-smile.jpg?b=1&s=170667a&w=0&k=20&c=EcjlfC0hE33usx5Ys_ftE1iC0TlgKG1pSqclpOULGLk="
            alt="Profile"
            className="w-32 h-32 rounded-full mr-4 object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-gray-600">{profile.phone}</p>
            {/* <Link
              to="/student/edit-profile"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Edit Profile
            </Link> */}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Education{' '}
            <span
              className="text-blue-700 text-sm cursor-pointer"
              onClick={() => setEducationModal(true)}
            >
              Add+
            </span>
          </h3>
          {educationModal && <AddEducation />}
          {profile.education?.length > 0 ? (
            profile.education.map(({degree, school, startYear, endYear, _id}) => 
              <div className='flex w-full justify-between'>
                <div key={_id} className="mb-2">
                <p className="font-semibold">{degree}</p>
                <p className="text-gray-600">{school}</p>
                <p className="text-gray-600">
                  {startYear} - {endYear}
                </p>
              </div>
                <div className='cursor-pointer' onClick={()=>deleteEducation(_id)}><RiDeleteBin6Line/></div>
              </div>
            )
          ) : (
            <p className="text-gray-500">No education added.</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Work Experience <span className="text-blue-700 text-sm cursor-pointer">Add+</span>
          </h3>
          {profile.workExperience?.length > 0 ? (
            profile.workExperience.map((exp) => (
              <div key={exp._id} className="mb-2">
                <p className="font-semibold">{exp.position}</p>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-600">
                  {new Date(exp.startDate).toLocaleDateString()} -{' '}
                  {new Date(exp.endDate).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No work experience added.</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Skills <span className="text-blue-700 text-sm cursor-pointer">Add+</span>
          </h3>
          {profile.skills?.length > 0 ? (
            <ul>
              {profile.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No skills added.</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Certifications <span className="text-blue-700 text-sm cursor-pointer">Add+</span>
          </h3>
          {profile.certifications?.length > 0 ? (
            profile.certifications.map((cert) => (
              <div key={cert._id} className="mb-2">
                <p className="font-semibold">{cert.name}</p>
                <p className="text-gray-500">{cert.issuingOrganization}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No certifications added.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentProfile

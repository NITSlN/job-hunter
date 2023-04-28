import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddEducation from './AddEducation'
import { RiDeleteBin6Line } from 'react-icons/ri'
import AddWorkExperience from './AddWorkExperience'
import AddSkills from './AddSkills'
function StudentProfile() {
  const [profile, setProfile] = useState({})
  const [educationModal, setEducationModal] = useState(false)
  const [workModal, setWorkModal] = useState(false)
  const [skillInput, setSkillInput] = useState(false)
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

  const deleteEducation = async (_id) => {
    await axios
      .delete(`/api/student/education/` + _id)
      .then(() => {
        console.log('Education deleted successfully')
      })
      .catch((error) => {
        console.error(error)
      })
    window.location.reload()
  }
  const deleteExp = async (_id) => {
    await axios
      .delete(`/api/student/work-experience/` + _id)
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
            <hr />
          </h3>
          {educationModal && (
            <AddEducation setEducationModal={setEducationModal} />
          )}
          {profile.education?.length > 0 ? (
            profile.education.map(
              ({ degree, school, startYear, endYear, _id }) => (
                <div className="flex w-full justify-between">
                  <div key={_id} className="mb-2">
                    <p className="font-semibold">{degree}</p>
                    <p className="text-gray-600">{school}</p>
                    <p className="text-gray-600">
                      {startYear} - {endYear}
                    </p>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => deleteEducation(_id)}
                  >
                    <RiDeleteBin6Line />
                  </div>
                </div>
              ),
            )
          ) : (
            <p className="text-gray-500">No education added.</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Work Experience{' '}
            <span
              onClick={() => setWorkModal(true)}
              className="text-blue-700 text-sm cursor-pointer"
            >
              Add+
            </span>
            <hr />
          </h3>
          {workModal && <AddWorkExperience setWorkModal={setWorkModal} />}
          {profile.workExperience?.length > 0 ? (
            profile.workExperience.map((exp) => (
              <div className="flex w-full justify-between">
                <div key={exp._id} className="mb-2">
                  <span className="font-semibold">{exp.company}</span> -
                  <span className="text-gray-600"> {exp.position}</span>
                  <p className="text-gray-600 text-sm">
                    {new Date(exp.startDate).toLocaleDateString()} -{' '}
                    {new Date(exp.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className="cursor-pointer mt-2"
                  onClick={() => deleteExp(exp._id)}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No work experience added.</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Skills{' '}
            <span
              onClick={() => setSkillInput(true)}
              className="text-blue-700 text-sm cursor-pointer"
            >
              Add+
            </span>
          </h3>
          {skillInput && (
            <AddSkills
              setSkillInput={setSkillInput}
              skills={profile.skills ? profile.skills?.join(', ') : ''}
            />
          )}
          {profile.skills?.length > 0 ? (
            <div className="my-3">
              {profile.skills.map((skill) => (
                <span
                  className="rounded-full px-4 py-2 pb-[10px] mx-1 bg-gray-200"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills added.</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Certifications{' '}
            <span className="text-blue-700 text-sm cursor-pointer">Add+</span>
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

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AddEducation from '../../components/student/AddEducation'
import { RiDeleteBin6Line } from 'react-icons/ri'
import AddWorkExperience from '../../components/student/AddWorkExperience'
import AddSkills from '../../components/student/AddSkills'
import AddCertificate from '../../components/student/AddCertificate'
import AddResumeLink from '../../components/student/AddResumeLink'
function StudentProfile({OwnProfile}) {
  const [profile, setProfile] = useState({})
  const [educationModal, setEducationModal] = useState(false)
  const [workModal, setWorkModal] = useState(false)
  const [skillInput, setSkillInput] = useState(false)
  const [certiModal, setCertiModal] = useState(false)
  const [resumeModal, setResumeModal] = useState(false)
  const [error, setError] = useState(null)

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(OwnProfile?'/api/student/me':'/api/student/profile/'+id)
      .then((response) => {
        setProfile(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError(error.message)
      })
  }, [])
  

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
        console.log('Experience deleted successfully')
      })
      .catch((error) => {
        console.error(error)
      })
    window.location.reload()
  }
  const deleteCerti = async (_id) => {
    await axios
      .delete(`/api/student/certificates/` + _id)
      .then(() => {
        console.log('Certificate deleted successfully')
      })
      .catch((error) => {
        console.error(error)
      })
    window.location.reload()
  }

  if (error) <div>Error: {error}</div>
  if (!profile) <div>..Loading</div>
  return (
    <div className='pt-24'>
    <div className="min-w-[400px] max-w-4xl mx-auto pt-12 px-[8px] bg-green-400 rounded-lg">
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
            {resumeModal ? (
              <AddResumeLink setResumeModal={setResumeModal} />
            ) : (
              <div className='flex gap-2 items-center'>
                <a href={profile.resumeLink} target='_blank' className='cursor-pointer hover:underline'>Resume</a>
                {OwnProfile && <span
                  onClick={() => setResumeModal(true)}
                  className="text-blue-700 text-sm cursor-pointer self-end"
                >
                  Edit
                </span>}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Education{' '}
            {OwnProfile && <span
              className="text-blue-700 text-sm cursor-pointer"
              onClick={() => setEducationModal(true)}
            >
              Add+
            </span>}
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
           {OwnProfile && <span
              onClick={() => setWorkModal(true)}
              className="text-blue-700 text-sm cursor-pointer"
            >
              Add+
            </span>}
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
            {OwnProfile && <span
              onClick={() => setSkillInput(true)}
              className="text-blue-700 text-sm cursor-pointer"
            >
              Add+
            </span>}
          </h3>
          {profile.skills?.length > 0 ? (
            <div className="my-3 flex flex-wrap">
              {profile.skills.map((skill) => (
                <span
                  className="rounded-full px-4 py-2 my-1 pb-[10px] mx-1 bg-gray-200"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills added.</p>
          )}
          {skillInput && (
            <AddSkills
              setSkillInput={setSkillInput}
              skills={profile.skills ? profile.skills?.join(', ') : ''}
            />
          )}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">
            Certifications{' '}
            {OwnProfile && <span
              onClick={() => setCertiModal(true)}
              className="text-blue-700 text-sm cursor-pointer"
            >
              Add+
            </span>}
          </h3>
          {certiModal && <AddCertificate setCertiModal={setCertiModal} />}
          {profile.certifications?.length > 0 ? (
            profile.certifications.map((cert) => (
              <div className="flex w-full justify-between">
                <div key={cert._id} className="mb-2">
                  <a
                    href={cert.certificateLink}
                    target="_blank"
                    className="cursor-pointer hover:underline"
                  >
                    <span className="font-semibold">
                      {cert.certificateName}
                    </span>
                    <span className="text-gray-500">
                      {' '}
                      - {cert.issuingOrganization}
                    </span>
                  </a>
                  <p className="text-gray-600 text-sm">
                    Issued on - {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className="cursor-pointer mt-2"
                  onClick={() => deleteCerti(cert._id)}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No certifications added.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default StudentProfile

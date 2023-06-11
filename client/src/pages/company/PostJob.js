import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {
  const [role, setRole] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState('')
  const [duration, setDuration] = useState('')
  const [stipend, setStipend] = useState('')
  const [positions, setPositions] = useState('')
  const [type, setType] = useState('')
  const [mode, setMode] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !role ||
      !description ||
      !skills ||
      !duration ||
      !stipend ||
      !positions ||
      !type ||
      !mode
    ) {
      // return an alert that states "Please fill all the required fields"
      return alert('Please fill all the required fields')
    }
    axios
      .post(
        '/api/company/postJob',
        {
          role,
          description,
          skills,
          duration,
          stipend,
          positions,
          type,
          mode,
        },
        { withCredentials: true },
      )
      .then(() => {
        navigate('/company/posts')
      }) // for cookies this must be set
  }

  return (
    <div className="max-w-2xl mx-auto pt-28">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            type="text"
            placeholder="Enter role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Job Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="skills"
          >
            Skills
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="skills"
            type="text"
            placeholder="Enter skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="duration"
          >
            Duration <span className="text-sm text-gray-500">(in Months)</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="duration"
            type="text"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="stipend"
          >
            Stipend
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stipend"
            type="text"
            placeholder="Enter stipend"
            value={stipend}
            onChange={(e) => setStipend(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="positions"
          >
            Positions
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="positions"
            type="text"
            placeholder="Enter positions"
            value={positions}
            onChange={(e) => setPositions(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <div className="relative">
            <select
              className="block w-full rounded-md border-green-300 text-gray-700 focus:outline-none font-bold text-md mt-2 mb-4"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select job type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="semi-full-time">Semi-full-time</option>
            </select>
          </div>
          <div className="relative">
            <select
              className="block w-full rounded-md border-green-300 text-gray-700 focus:outline-none font-bold text-md mt-2 mb-4"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="">Select mode of work</option>
              <option value="wfh">Work from home</option>
              <option value="in-office">In-office</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-blgreenue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostJob

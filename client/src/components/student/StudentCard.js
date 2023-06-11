import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const StudentCard = ({ props }) => {
  const {
    _id,
    companyRef,
    companyName,
    role,
    skills,
    stipend,
    duration,
    type,
    positions,
  } = props

  const handleApply = async (id) => {
    const res = await axios.post('/api/student/apply/' + id, {
      withCredentials: true,
      credentials: 'include',
    })
    console.log(res)
  }
  return (
    <div className="">
      <div className="border-r-2 rounded-tl-lg rounded-tr-lg bg-white w-48 py-4 px-4 min-w-[500px]">
        <h1 className="font-semibold">{role}</h1>
        <Link to={'/student/companyProfile/'+companyRef} className="text-xs">{companyName}</Link>
        <div className="text-xs flex gap-2 my-3">
          {skills?.map((tag) => {
            return (
              <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-gray-700 bg-gray-300">
                {tag}
              </span>
            )
          })}
        </div>
        <div className="flex gap-2 mt-2 items-center text-gray-600 justify-between text-sm">
          <span>
            Stipend: <span className="font-bold">{stipend / 1000}K</span>
          </span>
          <span>
            Duration: <span className="font-bold">{duration} M</span>
          </span>
          <span>
            Type:{' '}
            <span className="font-bold text-xs">{type.toUpperCase()}</span>
          </span>
          <span>
            Positions: <span className="font-bold">{positions}</span>
          </span>
        </div>
      </div>
      <button
        onClick={() => handleApply(_id)}
        className="w-full bg-green-500 font-semibold mb-12 rounded-br-lg rounded-bl-lg py-1"
      >
        Apply
      </button>
    </div>
  )
}

export default StudentCard

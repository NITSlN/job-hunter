import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CompanyCard = ({ props }) => {
  console.log(props)
  const {
    _id,
    companyName,
    role,
    skills,
    stipend,
    duration,
    type,
    positions,
  } = props

  const navigate = useNavigate()
  const seeApplications = async (id) => {
    console.log("ok");
    navigate('/company/posts/'+id)
  }
  const deletePost = async (id) => {
    const res = await axios.delete('/api/company/deletePost/' + id, {
      withCredentials: true,
      credentials: 'include',
    })
    window.location.reload()
  }
  return (
    <div className="scale-[110%]">
      <div className="border-r-2 rounded-tl-lg rounded-tr-lg bg-white w-48 py-4 px-4 min-w-[500px]">
        <h1 className="font-semibold">{role}</h1>
        <h3 className="text-xs">{companyName}</h3>
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
      <div className='flex text-sm'>
      <button
        onClick={() => deletePost(_id)}
        className="w-full  border-red-500 border-l-2 border-b-2 text-white mb-12 rounded-bl-lg py-2"
      >
        Delete 
      </button>
      <button
        onClick={() => seeApplications(_id)}
        className="w-full border-green-500 border-r-2 border-b-2 border-l-2 border-l-gray-200 text-white mb-12 rounded-br-lg py-2"
      >
        See Applications
      </button>
      </div>
    </div>
  )
}

export default CompanyCard

import React from 'react'

const Card = ({ props }) => {
  console.log(props)
  const { companyName, role, skills, stipend, duration, type,positions } = props
  return (
    <div className=" border-r-2 rounded-md bg-white w-48 py-4 px-4 m-10 min-w-[500px]">
      <h1 className='font-semibold'>{role}</h1>
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
      <div className='flex gap-2 mt-2 items-center text-gray-600 justify-between text-sm'>
        <span>Stipend: <span className='font-bold'>{stipend/1000}K</span></span>
        <span>Duration: <span className='font-bold'>{duration} M</span></span>
        <span>Type: <span className='font-bold text-xs'>{type.toUpperCase()}</span></span>
        <span>Positions: <span className='font-bold'>{positions}</span></span>
      </div>
    </div>
  )
}

export default Card

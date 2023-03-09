import React from 'react'

const Card = ({props}) => {
  console.log(props);
  return (
    <div className=' border-r-2 bg-white w-48 py-2 px-4'>
      <h1 >Job Title</h1>
      <h3 className='text-xs'>Comapany Name</h3>
      <div className='text-xs'>
      <span>tag1</span>
      <span>tag2</span>
      <span>tag3</span>
      <span>tag4</span>
      <span>tag5</span>
      </div>
    </div>
  )
}

export default Card
import { useState } from 'react'
import axios from 'axios'

const AddEducation = ({ setEducationModal }) => {
  const [degree, setDegree] = useState('')
  const [school, setSchool] = useState('')
  const [startYear, setStartYear] = useState('')
  const [endYear, setEndYear] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!degree || !school || !startYear || !endYear)
      return alert('Please fill all the info')
    const newEducation = { degree, school, startYear, endYear }

    axios
      .post('/api/student/education', newEducation)
      .then((response) => {
        setDegree('')
        setSchool('')
        setStartYear('')
        setEndYear('')
        setError('')
      })
      .catch((error) => {
        setError(error.response.data.message)
      })

    window.location.reload()
  }

  if (error) <div>Error: {error}</div>
  return (
    <div className="modal">
      <div className="modal-content">
        {/* <span className="close" onClick={() => setEducationModal(false)}>
          &times;
        </span> */}
        <form
          onSubmit={handleSubmit}
          className="text-gray-600 flex flex-col flex-wrap gap-2 w-1/2"
        >
          <div className="flex flex-col">
            <label htmlFor="school"> School</label>
            <input
              type="text"
              name="school"
              id="school"
              value={school}
              className="border-2"
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="degree">Degree</label>
            <input
              type="text"
              name="degree"
              id="degree"
              value={degree}
              className="border-2"
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="startYear">Start Year</label>
            <input
              type="text"
              name="startYear"
              id="startYear"
              value={startYear}
              className="border-2"
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="endYear">End Year</label>
            <input
              type="text"
              name="endYear"
              id="endYear"
              value={endYear}
              className="border-2"
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className='flex gap-2 justify-end'>
          <button
            className="text-white bg-green-500 px-4 rounded-md"
            type="submit"
          >
            Add
          </button>
          <button
            className="text-white bg-red-500 px-4 rounded-md"
            onClick={() => setEducationModal(false)}
            type="button"
          >
            Cancel
          </button>
          
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEducation

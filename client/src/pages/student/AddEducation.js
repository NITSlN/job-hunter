import { useState } from 'react'
import axios from 'axios'

const AddEducation = () => {
  const [degree, setDegree] = useState('')
  const [school, setSchool] = useState('')
  const [startYear, setStartYear] = useState('')
  const [endYear, setEndYear] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

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
          className="text-gray-600 flex flex-wrap gap-2"
        >
          <div>
            <label htmlFor="school" className='p-2'> School</label>
            <input
              type="text"
              name="school"
              id="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="degree" className='p-2'>Degree</label>
            <input
              type="text"
              name="degree"
              id="degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>

          <div>
            <div>
              <label htmlFor="startYear" className='p-2'>Start Year</label>
              <input
                type="text"
                name="startYear"
                id="startYear"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endYear" className='p-2'>End Year</label>
              <input
                type="text"
                name="endYear"
                id="endYear"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="error">{error}</div>}
          <button
            className="border-2 text-white bg-green-500 px-4 "
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEducation

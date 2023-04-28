import { useState } from 'react'
import axios from 'axios'

const AddWorkExperience = ({ setWorkModal }) => {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newWorkExperience = {
      company,
      position,
      description,
      startDate,
      endDate,
    }
    await axios
      .post('/api/student/work-experience', newWorkExperience)
      .then((response) => {
        setCompany('')
        setPosition('')
        setDescription('')
        setStartDate('')
        setEndDate('')
      })
      .catch((error) => {
        console.error(error)
      })
      window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <div className="flex flex-col gap-2">
        <label htmlFor="company">Company</label>
        <input
          className="border-2 mb-2 p-1 rounded-lg"
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="position">Position</label>
        <input
          className="border-2 mb-2 p-1 rounded-lg"
          type="text"
          id="position"
          name="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <textarea
          className="border-2 mb-2 p-1 rounded-lg"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="startDate">Start Date</label>
        <input
          className="border-2 mb-2 p-1 rounded-lg"
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="endDate">End Date</label>
        <input
          className="border-2 mb-2 p-1 rounded-lg"
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          className="text-white bg-green-500 px-4 rounded-md"
          type="submit"
        >
          Add
        </button>
        <button
          className="text-white bg-red-500 px-4 rounded-md"
          onClick={() => setWorkModal(false)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddWorkExperience

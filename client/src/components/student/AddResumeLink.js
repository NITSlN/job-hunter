import { useState } from 'react'
import axios from 'axios'

const AddResumeLink = ({setResumeModal}) => {
  const [resumeLink, setResumeLink] = useState('')

  const handleInputChange = (event) => {
    setResumeLink(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put('/api/student/resume', { resumeLink })
      setResumeLink('')
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('Failed to add resume link')
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Resume Link:
        <input
          type="text"
          value={resumeLink}
          onChange={handleInputChange}
          required
          className='border-[1px] ml-4 focus:outline-none p-[2px] text-sm'
        />
      </label>
      <div className="flex gap-2 mt-4 justify-end">
        <button
          className="text-white bg-green-500 px-4 rounded-md"
          type="submit"
        >
          Add
        </button>
        <button
          className="text-white bg-red-500 px-4 rounded-md"
          onClick={() => setResumeModal(false)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddResumeLink

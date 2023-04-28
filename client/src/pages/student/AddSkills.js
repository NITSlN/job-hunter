import React, { useState } from 'react'
import axios from 'axios'

const AddSkills = ({setSkillInput,skills}) => {
  const [newSkill, setNewSkill] = useState(skills || '')

  const handleAddSkill = async () => {
    try {
      await axios.put('/api/student/skills', { skills: newSkill })
      setNewSkill('')
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
  }

  return (
    <div className='w-1/2'>
      <input
        type="text"
        value={newSkill}
        className='border-2 w-full mb-2'
        onChange={(e) => setNewSkill(e.target.value)}
      />
      <div className="flex gap-2 justify-end">
        <button
          className="text-white bg-green-500 px-4 rounded-md"
          type="submit"
          onClick={handleAddSkill}
        >
          Add
        </button>
        <button
          className="text-white bg-red-500 px-4 rounded-md"
          onClick={() => setSkillInput(false)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddSkills

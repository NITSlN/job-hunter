import React, { useState } from 'react'
import axios from 'axios'

const AddCertificate = ({ setCertiModal }) => {
  const [certificateName, setCertificateName] = useState('')
  const [issuingOrganization, setIssuingOrganization] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [certificateLink, setCertificateLink] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put('/api/student/certificates', {
        certificateName,
        issuingOrganization,
        issueDate,
        certificateLink,
      })
      setCertificateName('')
      setIssuingOrganization('')
      setIssueDate('')
      setCertificateLink('')
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert('Error occurred while adding certificate')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-gray-600 flex flex-col flex-wrap gap-2 w-1/2"
    >
      <div className="flex flex-col">
        <label htmlFor="certificate-name">Certificate Name:</label>
        <input
          className="border-2 rounded-lg"
          type="text"
          id="certificate-name"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="issuing-organization">Issuing Organization:</label>
        <input
          className="border-2 rounded-lg"
          type="text"
          id="issuing-organization"
          value={issuingOrganization}
          onChange={(e) => setIssuingOrganization(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="certificateLink">Certificate Link:</label>
        <input
          type="text"
          id="certificateLink"
          name="certificateLink"
          value={certificateLink}
          onChange={(e) => setCertificateLink(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="issue-date">Issue Date:</label>
        <input
          className="border-2 rounded-lg"
          type="date"
          id="issue-date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          required
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
          onClick={() => setCertiModal(false)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddCertificate

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../../components/company/ApplicationCard'
import axios from 'axios'
const Applications = () => {
  const [applications, setApplications] = useState(null)
  const location = useLocation()
  const jobId = location.pathname.split('/')[3]
  console.log(jobId)
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get('/api/company/profile/job/' + jobId)
        .then((data) => setApplications(data.data))
    }
    fetch()
  }, [])
  return (
    <div style={{minHeight:'100%'}}>
      <div className="pt-44 flex items-center flex-col">
        {applications?.map((props, index) => {
          return <Card props={props} key={index} />
        })}
      </div>
    </div>
  )
}

export default Applications

import React, { useEffect, useState } from 'react'
import Card from '../../components/company/CompanyCard'
import axios from 'axios'

const ListedJobs = () => {
    const [posts, setPosts] = useState(null)

    // fetching all the jobs posted by a company
  useEffect(() => {
    const fetch = async () => {
      axios.get('/api/company/posts').then((data) => setPosts(data.data))
    }
    fetch()
  }, [])
  console.log(posts);
  return (
    <div className="h-full pt-20 flex flex-col mx-auto w-4/5 items-center gap-4">
        {/*  rendering all jobs */}
      <div className="p-4">
        {posts?.map((props, index) => {
          return <Card props={props} key={index} />
        })}
      </div>
    </div>
  )
  
}

export default ListedJobs
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../components/student/StudentCard'


const Posts = () => {
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      axios.get('/api/student/').then((data) => setPosts(data.data))
    }
    fetch()
  }, [])
  console.log(posts)
  return (
    <div className="h-full pt-20 flex flex-col mx-auto w-4/5 items-center gap-4">
      <div className="p-4">
        {posts?.map((props, index) => {
          return <Card props={props} key={index} />
        })}
      </div>
    </div>
  )
}

export default Posts

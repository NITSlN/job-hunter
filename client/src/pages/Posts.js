import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

const Posts = () => {
  const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetch = async ()=>{
          axios.get('/api/student/').then((data)=>setPosts(data.data))
        }
        fetch()
    },[])

  return (
    <div className='h-full flex flex-col mx-auto w-4/5 items-center gap-4'>
        {posts.map((props,index)=>{
          return <Card props={props} key={index}/>
        })}
    </div>
  )
}

export default Posts
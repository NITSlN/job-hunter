import axios from 'axios'
import React, { useEffect } from 'react'

const Post = () => {
    useEffect(() => {
        const fetch = async ()=>{
          axios.get('/api/student/').then((data)=>console.log(data.data))
        }
        // console.log(data);
        fetch()
    },[])

  return (
    <div>
        Ok
    </div>
  )
}

export default Post
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'

const dummyData = [
  {
    companyRef: "abcd1234",
    companyName: "ABC Corp",
    role: "Software Developer",
    description: "We are looking for a software developer who can work with our team to build web applications.",
    tags: ["JavaScript", "React", "Node.js"],
    stipend: "10k",
    duration: "3 M",
    type: "Full-time",
    positions: "2",
    applied: ["xyz789", "pqr456"]
  },
  {
    companyRef: "efgh5678",
    companyName: "XYZ Corp",
    role: "Marketing Intern",
    description: "We are seeking a marketing intern to assist with our marketing campaigns and social media outreach.",
    tags: ["Marketing", "Social Media"],
    stipend: "5k",
    duration: "2 M",
    type: "Part-time",
    positions: "1",
    applied: ["lmn012", "rst345", "uvw678"]
  },
  {
    companyRef: "ijk9012",
    companyName: "Tech Solutions",
    role: "Data Analyst",
    description: "We are seeking a data analyst who can help us analyze and interpret large data sets to drive business decisions.",
    tags: ["SQL", "Python", "Data Analytics"],
    stipend: "8k",
    duration: "2 M",
    type: "Semi-full-time",
    positions: "1",
    applied: []
  },
  {
    companyRef: "nop3456",
    companyName: "E-Commerce Inc",
    role: "Web Designer",
    description: "We are looking for a web designer who can create visually appealing and user-friendly designs for our e-commerce platform.",
    tags: ["UI/UX Design", "HTML", "CSS"],
    stipend: "6k",
    duration: "1.5 M",
    type: "Full-time",
    positions: "2",
    applied: ["xyz789"]
  },
  {
    companyRef: "qrs7890",
    companyName: "Finance Corp",
    role: "Financial Analyst",
    description: "We are seeking a financial analyst who can provide financial guidance and support to our clients.",
    tags: ["Finance", "Accounting", "Excel"],
    stipend: "12k",
    duration: "3 M",
    type: "Part-time",
    positions: "1",
    applied: ["pqr456", "lmn012"]
  }  
  
]
const Posts = () => {
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      axios.get('/api/student/').then((data) => setPosts(data.data))
    }
    fetch()
  }, [])
console.log(posts);
  return (
    <div className="h-full flex flex-col mx-auto w-4/5 items-center gap-4">
      <div className='p-4'>
        {posts?.map((props,index)=>{
          return <Card props={props} key={index}/>
        })}
      </div>
    </div>
  )
}

export default Posts

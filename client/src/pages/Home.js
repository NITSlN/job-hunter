import React from 'react'
import { Link } from 'react-router-dom'
import { matchRoutes, useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation().pathname
  const isCompany = location === '/company'
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
          Unlock Your Potential. 
          <strong className="font-extrabold text-green-700 sm:block">
           {isCompany?"Hire Best People":"Get Your Dream Job!"}
          </strong>
        </h1>

        <p className="mt-4 text-white sm:text-sm sm:leading-relaxed">
        Make your next move with confidence - let us help you find the job or candidate that fits your unique needs.
        </p>

        <div className="mt-8 flex pb-6 flex-wrap justify-center gap-4">
          <Link className="btn" to={`${location}/signup`}>
            Sign Up
          </Link>
          <Link
            className="btn"
            to={(isCompany ? '/company' : '/student') + '/Login'}
          >
            Login
          </Link>
        </div>
        <Link
          className="text-green-600 font-bold underline"
          to={!isCompany ? '/company' : '/student'}
        >
          Are you a {isCompany ? 'student' : 'company'}?
        </Link>
      </div>
    </div>
  )
}

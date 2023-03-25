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
          Understand User Flow.
          <strong className="font-extrabold text-green-700 sm:block">
            Increase Conversion.
          </strong>
        </h1>

        <p className="mt-4 text-white sm:text-sm sm:leading-relaxed">
          Lorem ipsum dolor sit amet coconsectetur, adipisicing el tenetur fuga
          ducimus numquam ea!nsectetur, adipisicing elit. Nesciunt illo tenetur
          fuga ducimus numquam ea!
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

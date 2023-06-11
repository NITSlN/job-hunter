import React from 'react'
import { Link } from 'react-router-dom'

const ApplicationCard = ({ props }) => {
  const { _id, name, email, phone, imgUrl,resumeLink } = props
  return (
    <div className="max-w-lg p-4">
      <article className="rounded-xl duration-100 hover:-translate-y-1 bg-gray-800 p-4 hover:shadow-sm hover:shadow-green-400">
        <div className="flex items-center gap-4">
          <img
            alt="Applicant"
            src={imgUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhDmdBbYxs30OcmcYLM4OYdU8z4DeiNKEdD0X3e-U3Q&usqp=CAU&ec=48600112"}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <Link to={'/company/studentProfile/'+_id} className="text-lg font-medium text-white">{name}</Link>

            <div className="flow-root">
              <ul className="-m-1 flex flex-wrap items-center">
                <li className="p-1">
                  <a href={"mailto:"+email} target='_blank' className="text-xs font-medium text-gray-300">
                    {email} |
                  </a>
                </li>
                <li className="p-1">
                  <p className='text-xs translate-y-[2px] font-medium text-gray-300'>
                  {"9641253871"} |
                  </p>
                </li>
                <li className="p-1">
                  <a href={resumeLink||""} target='_blank' className="text-xs font-medium text-gray-300">
                  Resume Link
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <ul className="mt-4 space-y-2">
          <li>
            <a
              href="#"
              className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"
            >
              <strong className="font-medium text-white">Project A</strong>

              <p className="mt-1 text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                consequuntur deleniti, unde ab ut in!
              </p>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"
            >
              <strong className="font-medium text-white">Project B</strong>

              <p className="mt-1 text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente cumque saepe sit.
              </p>
            </a>
          </li>
        </ul> */}
      </article>
    </div>
  )
}

export default ApplicationCard

import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
// import logo from "../images/logo.svg";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()
  const {isStudentLoggedIn} = useContext(AuthContext)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const logoutUser = async () => {
    if(isStudentLoggedIn) await axios.post(`/api/student/logout`)
    else await axios.post(`/api/company/logout`)
    navigate('/')
  }

  return (
    <nav className="bg-green-400 w-full fixed shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold">
            <Link to="/">
              {/* <img className="h-8" src={logo} alt="Logo" /> */}
              Job Hunter
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                to={isStudentLoggedIn?'/student/posts':'/company/posts'}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900"
              >
                About
              </Link>
              {!isStudentLoggedIn && <Link
                to="/company/postJob"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900"
              >
                Post Job
              </Link>}
              <Link
                to="/contact"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={toggleMenu}
                  className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://media.istockphoto.com/id/1288538088/photo/portrait-young-confident-smart-asian-businessman-look-at-camera-and-smile.jpg?b=1&s=170667a&w=0&k=20&c=EcjlfC0hE33usx5Ys_ftE1iC0TlgKG1pSqclpOULGLk="
                    alt="Profile"
                  />
                </button>
              </div>
              {showMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  <div className="py-1 rounded-md bg-white shadow-xs" onClick={toggleMenu}>
                    <Link
                      to={`/${isStudentLoggedIn ? 'student' : 'company'}/profile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={logoutUser}
                      className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

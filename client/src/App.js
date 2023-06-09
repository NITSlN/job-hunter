import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import StudentSignUp from './pages/student/StudentSignUp'
import CompanySignUp from './pages/company/CompanySignUp'
import Posts from './pages/student/Posts'
import PostJob from './pages/company/PostJob'
import Navbar from './components/Navbar'
import Dashboard from './pages/company/CompanyProfile'
import ListedJobs from './pages/company/ListedJobs'
import Applications from './pages/company/Applications'
import StudentProfile from './pages/student/StudentProfile'

function App() {
  
  
  return (
    <div className='h-full bg-black' >
      
      <Routes>
        <Route path="/student" element={<Home/>} />
        <Route path="/company" element={<Home/>} />
        <Route path="/student/signup" element={<StudentSignUp/>} />
        <Route path="/company/signup" element={<CompanySignUp/>} />
        <Route path="/company/postjob" element={<><Navbar/><PostJob/></>} />
        <Route path="/company/Login" element={<Login/>} />
        <Route path="/student/Login" element={<Login/>} />
        <Route path="/student/posts" element={<><Navbar/><Posts/></>} />
        <Route path="/company/profile" element={<><Navbar/><Dashboard OwnProfile={true}/></>} />
        <Route path="/student/companyProfile/:id" element={<><Navbar/><Dashboard/></>} />
        <Route path="/student/profile" element={<><Navbar/><StudentProfile OwnProfile={true}/></>} />
        <Route path="/company/studentProfile/:id" element={<><Navbar/><StudentProfile/></>} />
        <Route path="/company/posts" element={<><Navbar/><ListedJobs/></>} />
        <Route path="/company/posts/:id" element={<><Navbar/> <Applications/> </>} />
        <Route
        path="*"
        element={<Navigate to="/student" replace />}
    />
      </Routes>
    </div>
  )
}

export default App

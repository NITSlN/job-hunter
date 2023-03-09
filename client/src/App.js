import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import StudentSignUp from './pages/StudentSignUp'
import CompanySignUp from './pages/CompanySignUp'
import Posts from './pages/Posts'

function App() {
  
  
  return (
    <div className='h-full bg-black' >
      <Routes>
        <Route path="/student" element={<Home/>} />
        <Route path="/company" element={<Home/>} />
        <Route path="/student/signup" element={<StudentSignUp/>} />
        <Route path="/company/signup" element={<CompanySignUp/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="student/posts" element={<Posts/>} />
        <Route
        path="*"
        element={<Navigate to="/student" replace />}
    />
      </Routes>
    </div>
  )
}

export default App

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VerifyEmail from './pages/VerifyEmail'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="h-100 row col-12">
      <header className="h-sm-100 h-auto display-1 bg-info col-sm-3 col-lg-4">
        User Profile
      </header>
      <div className="h-100 col-sm-9 col-lg-8 d-flex justify-content-center align-items-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyEmail/:hash" element={<VerifyEmail />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default App

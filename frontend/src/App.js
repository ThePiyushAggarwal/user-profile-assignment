import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AfterRegisteration from './pages/AfterRegisteration'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="container">
      <header>User Profile</header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyEmailMessage" element={<AfterRegisteration />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default App

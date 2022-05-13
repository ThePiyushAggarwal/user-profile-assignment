import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, resetState } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [loginChoice, setLoginChoice] = useState('username')

  const { username, email, password } = formData

  const { user, isError, message } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (user) {
      navigate('/')
    }

    dispatch(resetState())
  }, [dispatch, user, navigate, isError, message])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  return (
    <div>
      <p>Login</p>
      using
      <button
        className="btn btn-primary"
        onClick={() => setLoginChoice('email')}
      >
        Email
      </button>
      <button
        className="btn btn-primary"
        onClick={() => setLoginChoice('username')}
      >
        Username
      </button>
      <form onSubmit={onSubmit}>
        {loginChoice === 'username' ? (
          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={onChange}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={onChange}
            />
          </div>
        )}
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      <p>Login using</p>
      <button className="btn btn-primary">Google</button>
      <button className="btn btn-primary">Facebook</button>
      <Link to="/register" className="btn btn-secondary">
        Register Instead
      </Link>
    </div>
  )
}

export default Login

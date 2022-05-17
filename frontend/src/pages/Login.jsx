import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, resetState } from '../features/user/userSlice'
import {
  getUserFromGoogle,
  resetState as gresetState,
} from '../features/google/googleSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [loginChoice, setLoginChoice] = useState('username')

  const { username, email, password } = formData

  const { user, isError, message } = useSelector((state) => state.user)
  const {
    user: guser,
    isError: gisError,
    message: gmessage,
  } = useSelector((state) => state.google)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (gisError) {
      toast.error(gmessage)
    }

    if (user || guser) {
      navigate('/')
    }

    dispatch(resetState())
    dispatch(gresetState())
  }, [dispatch, user, guser, navigate, isError, gisError, message, gmessage])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  // On hitting login button
  const onSubmit = (e) => {
    e.preventDefault()

    // Login Validation
    if (loginChoice === 'username') {
      if (username.length === 0) {
        return toast.error('Please fill in your username')
      }
    } else if (loginChoice === 'email') {
      if (email.length === 0) {
        return toast.error('Please fill in your email')
      }
    }
    if (password.length === 0) {
      return toast.error('Please enter a password')
    }

    dispatch(loginUser(formData))
  }

  // Google One Tap Login Hook
  useGoogleOneTapLogin({
    onSuccess: (response) => {
      dispatch(getUserFromGoogle(response))
      console.log(response)
    },
    onError: (error) => console.log(error),
    googleAccountConfigs: {
      client_id:
        '282718856953-2v32qmem9p6etlis5trq1875mlh3j28u.apps.googleusercontent.com',
      cancel_on_tap_outside: false,
      prompt_parent_id: 'prompt_container',
    },
  })

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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>Or you can login using Google</p>
      <div id="prompt_container" className="mb-5"></div>
      <Link to="/register" className="btn btn-secondary">
        Not an user? Register
      </Link>
    </div>
  )
}

export default Login

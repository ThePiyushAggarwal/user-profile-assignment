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

  // Google One Tap Login Hook
  useGoogleOneTapLogin({
    onSuccess: (response) => {
      dispatch(getUserFromGoogle(response))
    },
    onError: (error) => console.log(error),
    googleAccountConfigs: {
      client_id:
        '282718856953-2v32qmem9p6etlis5trq1875mlh3j28u.apps.googleusercontent.com',
      cancel_on_tap_outside: false,
      prompt_parent_id: 'prompt_container',
    },
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
    if (isError || gisError) {
      toast.error(message || gmessage)
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
      <p>Or you can login using</p>
      <div id="prompt_container" className="mt-5 mb-5"></div>
      <button className="btn btn-primary">Facebook</button>
      <Link to="/register" className="btn btn-secondary">
        Register Instead
      </Link>
    </div>
  )
}

export default Login

import { useState } from 'react'
import { registerUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  })
  const [buttonVisibility, setButtonVisibility] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState('')

  const { first_name, last_name, username, email, password } = formData

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(registerUser(formData))
  }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const onPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (password === e.target.value) {
      setButtonVisibility(false)
    } else {
      setButtonVisibility(true)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            className="form-control"
            value={first_name}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            className="form-control"
            value={last_name}
            onChange={onChange}
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={onPasswordChange}
          />
        </div>

        <div>
          <button className="btn btn-primary" disabled={buttonVisibility}>
            Submit
          </button>
        </div>
      </form>

      <Link to="/login" className="btn btn-secondary">
        Login Instead
      </Link>
    </div>
  )
}

export default Register

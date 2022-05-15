import { useState, useEffect } from 'react'
import { registerUser, resetState } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  })
  const { first_name, last_name, username, email, password, password2 } =
    formData

  // First name validation
  const [validation1, setValidation1] = useState(false)
  const [validationMessage1, setValidationMessage1] = useState('')
  // Last name validation
  const [validation2, setValidation2] = useState(false)
  const [validationMessage2, setValidationMessage2] = useState('')
  // Username validation
  const [validation3, setValidation3] = useState(true)
  const [validationMessage3, setValidationMessage3] = useState('')
  // Password validation
  const [validation4, setValidation4] = useState(false)
  const [validationMessage4, setValidationMessage4] = useState('')

  const { user, message, isError } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // If logged in navigate, if error show
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (user) {
      navigate('/')
    }
    dispatch(resetState())
  }, [isError, message, dispatch, navigate, user])

  // This sets the values of the inputs
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  // First Name Validation
  const onFirstNameChange = (e) => {
    const value = e.target.value
    // These conditions need to be true
    const a = /^[a-z]+$/i.test(value)
    const b = value.length >= 3

    if (!a && !b) {
      setValidation1(false)
      setValidationMessage1('Please include more than 3 alphabets')
    } else if (a && !b) {
      setValidation1(false)
      setValidationMessage1('Please write more than 3 characters')
    } else if (!a && b) {
      setValidation1(false)
      setValidationMessage1('Please include alphabets only')
    } else {
      setValidationMessage1('')
      setValidation1(true)
    }
  }

  // Last Name Validation
  const onLastNameChange = (e) => {
    const value = e.target.value
    // These conditions need to be true
    const a = /^[a-z]+$/i.test(value)
    const b = value.length >= 3

    if (!a && !b) {
      setValidation2(false)
      setValidationMessage2('Please include more than 3 alphabets')
    } else if (a && !b) {
      setValidation2(false)
      setValidationMessage2('Please write more than 3 characters')
    } else if (!a && b) {
      setValidation2(false)
      setValidationMessage2('Please include alphabets only')
    } else {
      setValidationMessage2('')
      setValidation2(true)
    }
  }

  // Username validation
  const onUsernameChange = () => {
    // These conditions need to be true
    return true
  }

  // Password validation
  const onPasswordChange = (e) => {
    if (password2 === e.target.value) {
      setValidation4(true)
      setValidationMessage4('')
    } else {
      setValidation4(false)
      setValidationMessage4('Passwords do not match')
    }
  }
  const onPassword2Change = (e) => {
    if (password === e.target.value) {
      setValidation4(true)
      setValidationMessage4('')
    } else {
      setValidation4(false)
      setValidationMessage4('Passwords do not match')
    }
  }

  const submitButtonVisibility =
    validation1 && validation2 && validation3 && validation4

  // When the submit button is clicked
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formData))
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
            required
            id="first_name"
            className="form-control"
            value={first_name}
            onChange={(e) => {
              onChange(e)
              onFirstNameChange(e)
            }}
          />
          {validationMessage1}
        </div>
        <div>
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            required
            id="last_name"
            className="form-control"
            value={last_name}
            onChange={(e) => {
              onChange(e)
              onLastNameChange(e)
            }}
          />
          {validationMessage2}
        </div>
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            required
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => {
              onChange(e)
              onUsernameChange(e)
            }}
          />
          {validationMessage3}
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            required
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
            required
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              onChange(e)
              onPasswordChange(e)
            }}
          />
        </div>
        <div>
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            required
            id="password2"
            className="form-control"
            value={password2}
            onChange={(e) => {
              onChange(e)
              onPassword2Change(e)
            }}
          />
          {validationMessage4}
        </div>

        <div>
          <button
            className="btn btn-primary"
            disabled={!submitButtonVisibility}
          >
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

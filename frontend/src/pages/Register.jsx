import { useState, useEffect } from 'react'
import {
  registerUser,
  resetState,
  resendEmail,
} from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

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

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const {
    user,
    message,
    isError,
    sentVerificationLink,
    tempUserData,
    resendCount,
  } = useSelector((state) => state.user)
  const { user: guser } = useSelector((state) => state.google)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // If logged in navigate, if error show
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (user || guser) {
      navigate('/')
    }

    dispatch(resetState())
  }, [
    isError,
    message,
    dispatch,
    navigate,
    user,
    guser,
    sentVerificationLink,
    resendCount,
  ])

  // This sets the values of the inputs
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  // First Name Validation
  const onFirstNameChange = (e) => {
    const value = e.target.value.trim() // trimming so that space isn't counted in 3 chars
    if (/^[a-z\s]{3,30}$/i.test(value)) {
      setValidation1(true)
      setValidationMessage1('')
    } else {
      setValidationMessage1('Please enter at least 3 alphabets or at most 30')
      setValidation1(false)
    }
  }

  // Last Name Validation
  const onLastNameChange = (e) => {
    const value = e.target.value.trim()
    if (/^[a-z\s]{3,30}$/i.test(value)) {
      setValidation2(true)
      setValidationMessage2('')
    } else {
      setValidationMessage2('Please enter at least 3 alphabets or at most 30')
      setValidation2(false)
    }
  }

  // Username validation
  const onUsernameChange = (e) => {
    const val = e.target.value
    const rules =
      "Username can contain numbers, alphabets, dots and underscores. Dots can't come on first and last spots. Also, username can't have two or more consecutive dots. Minimum length of the username is 3 characters (maximum 30) with at least an alphabet included"

    // Regex expression validates the username
    // Explanation:
    // ^(?!\.) : dot not allowed at first place
    // (?!.*\.\.) : consecutive dots not allowed anywhere
    // (?!.*\.$) : dot not allowed at the end of string
    // (?=.*[a-zA-Z]) : at least one alphabet should be there
    // [\w.]{3,30}$ : alphanumeric characters allowed with underscore and a dot. min 3, max 30
    if (/^(?!\.)(?!.*\.\.)(?!.*\.$)(?=.*[a-zA-Z])[\w.]{3,30}$/.test(val)) {
      setValidation3(true)
      setValidationMessage3('')
    } else {
      setValidation3(false)
      setValidationMessage3(rules)
    }
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

  // Set Submit Button Visibility
  const submitButtonVisibility =
    validation1 && validation2 && validation3 && validation4

  // When the submit button is clicked
  const onSubmit = (e) => {
    e.preventDefault()

    // Finishing touches on names
    const userData = {
      first_name: first_name
        .trim()
        .split(' ')
        .filter((i) => i.charAt(0) !== '')
        .map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())
        .join(' '),
      last_name: last_name
        .trim()
        .split(' ')
        .filter((i) => i.charAt(0) !== '')
        .map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())
        .join(' '),
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    }

    dispatch(registerUser(userData))
  }

  // Resend email function
  const resend = () => {
    if (tempUserData) {
      dispatch(resendEmail(tempUserData))
    }
  }

  return (
    <div className="w-75">
      <div className="display-3 mb-4">Register</div>
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
          <div className={`${validationMessage1 && 'alert'}  alert-info `}>
            {validationMessage1}
          </div>
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
          <div className={`${validationMessage2 && 'alert'}  alert-info `}>
            {validationMessage2}
          </div>
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
          <div className={`${validationMessage3 && 'alert'}  alert-info `}>
            {validationMessage3}
          </div>
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
          <div className="row mx-1">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              id="password"
              className="form-control col"
              value={password}
              onChange={(e) => {
                onChange(e)
                onPasswordChange(e)
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="btn btn-info col-2 rounded"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <div className="row mx-1">
            <input
              type={showPassword2 ? 'text' : 'password'}
              required
              id="password2"
              className="form-control col"
              value={password2}
              onChange={(e) => {
                onChange(e)
                onPassword2Change(e)
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword2((prevState) => !prevState)}
              className="btn btn-info col-2 rounded"
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className={`${validationMessage4 && 'alert'}  alert-info `}>
            {validationMessage4}
          </div>
        </div>

        {sentVerificationLink && (
          <div>
            <p className="alert alert-info">
              Please click on verification link sent on your email. And refresh
              to login.
            </p>
            <button
              type="button"
              disabled={resendCount > 2 ? true : false}
              onClick={resend}
              className="btn btn-primary mb-4"
            >
              {resendCount > 2
                ? 'Please try again after sometime'
                : 'Resend Email'}
            </button>
          </div>
        )}
        <div className="row mt-5">
          <button
            className="col-5 btn btn-primary "
            disabled={!submitButtonVisibility || sentVerificationLink}
            type="submit"
          >
            Submit
          </button>
          <div className="col-2"></div>
          <Link to="/login" className="col-5 btn btn-secondary">
            Login Instead
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register

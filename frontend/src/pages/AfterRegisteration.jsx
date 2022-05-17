import { resendEmail, resetState } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function AfterRegisteration() {
  const { tempUserData, isError, message, resendCount } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (message) {
      toast.success(message)
    }
    if (resendCount > 2) {
      toast.error(
        "Something doesn't seem right. Please try again after sometimes!"
      )
    }

    dispatch(resetState())
  }, [tempUserData, navigate, isError, message, dispatch, resendCount])

  const resend = () => {
    if (tempUserData) {
      dispatch(resendEmail(tempUserData))
    }
  }

  return (
    <div>
      <p>
        Please verify your email by clicking on the link provided in email.
        Thank you! Didn't receive the email? Please check your spam too.
      </p>
      <button
        type="button"
        disabled={resendCount > 2 ? true : false}
        onClick={resend}
        className="btn btn-primary mb-4"
      >
        {resendCount > 2 ? 'Please try again after sometime' : 'Resend Email'}
      </button>
      <p>If already confirmed.</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  )
}

export default AfterRegisteration

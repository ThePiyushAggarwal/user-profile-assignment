import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmail, resetState } from '../features/user/userSlice'

function VerifyEmail() {
  const { hash } = useParams()

  const { emailVerified } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (emailVerified) {
      navigate('/')
    }

    dispatch(verifyEmail(hash))
    dispatch(resetState())
  }, [dispatch, hash, emailVerified, navigate])

  return (
    <div>
      <p>Email Verified!!</p>
    </div>
  )
}

export default VerifyEmail

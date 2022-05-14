import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/user/userSlice'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div>
      <p>
        Welcome to User Profile
        {user ? user.email : ''}
      </p>

      <button className="btn btn-primary" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  )
}

export default Home

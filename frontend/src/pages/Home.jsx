import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/user/userSlice'
import { logout as glogout } from '../features/google/googleSlice'

function Home() {
  const dispatch = useDispatch()

  const { user: user1 } = useSelector((state) => state.user)
  const { user: user2 } = useSelector((state) => state.google)

  const user = user1 || user2

  const onLogout = () => {
    dispatch(logout())
    dispatch(glogout())
  }

  return (
    <div>
      <p>Welcome to User Profile</p>
      <h1> {user ? user.email : ''}</h1>

      <button className="btn btn-primary" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home

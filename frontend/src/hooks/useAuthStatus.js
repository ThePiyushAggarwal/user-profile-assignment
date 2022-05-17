import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  const { user: user1 } = useSelector((state) => state.user)
  const { user: user2 } = useSelector((state) => state.google)

  const user = user1 || user2

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setCheckingStatus(false)
  }, [user])

  return { loggedIn, checkingStatus }
}

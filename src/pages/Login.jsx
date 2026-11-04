import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { login } from '../api/authApi.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const active = useRef(false)
  const { dispatch } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    active.current = true
    return () => {
      active.current = false
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await login(username.trim(), password)

      if (active.current) {
        dispatch({ type: 'LOGGED_IN', user })
        navigate(location.state?.from ?? '/', { replace: true })
      }
    } catch (error) {
      if (active.current) {
        setError(error.message)
        setLoading(false)
      }
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit} aria-busy={loading}>
        <label>
          Username
          <input
            type="text"
            inputMode="email"
            autoComplete="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        {error && <p role="alert">{error}</p>}
      </form>
    </section>
  )
}

import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute() {
  const { user } = useAuth()
  const location = useLocation()

  if (user) {
    return <Outlet />
  }

  const from = location.pathname + location.search + location.hash
  return <Navigate to="/login" state={{ from }} replace />
}

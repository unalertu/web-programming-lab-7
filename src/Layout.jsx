import { NavLink, Outlet } from 'react-router'
import { useAuth } from './context/AuthContext.jsx'

export default function Layout() {
  const { user, dispatch } = useAuth()

  return (
    <div className="site">
      <header className="site-header">
        <nav className="container navigation" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>

          <div className="account-links">
            {user ? (
              <>
                <span>{user.username}</span>
                <button type="button" onClick={() => dispatch({ type: 'LOGGED_OUT' })}>Logout</button>
              </>
            ) : <NavLink to="/login">Login</NavLink>}
          </div>
        </nav>
      </header>

      <main className="container content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">Campus Shop · Web Programming</div>
      </footer>
    </div>
  )
}

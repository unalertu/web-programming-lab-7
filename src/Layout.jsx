import { NavLink, Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <nav className="container navigation" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
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

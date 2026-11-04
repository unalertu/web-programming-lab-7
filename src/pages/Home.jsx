import { Link } from 'react-router'

export default function Home() {
  return (
    <section>
      <h1>Campus Shop</h1>
      <p>Browse the catalogue and save the products you want in your cart.</p>
      <Link to="/products">Browse products</Link>
    </section>
  )
}

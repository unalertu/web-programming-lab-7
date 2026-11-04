import { Link } from 'react-router'

export default function ProductCard({ product, listSearch }) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <h2>
        <Link to={'/products/' + product.id} state={{ listSearch }}>{product.title}</Link>
      </h2>
      <p>{product.category}</p>
      <p>${product.price.toFixed(2)}</p>
    </article>
  )
}

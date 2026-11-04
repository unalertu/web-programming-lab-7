import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { fetchProduct } from '../api/productsApi.js'
import { useFetch } from '../hooks/useFetch.js'
import { useCartStore } from '../store/cartStore.js'

export default function ProductDetail() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const addItem = useCartStore(state => state.addItem)
  const inputs = useMemo(() => [id], [id])
  const { loading, error, data: product } = useFetch(fetchProduct, inputs)

  function backToProducts() {
    navigate({ pathname: '/products', search: location.state?.listSearch ?? '' })
  }

  return (
    <section>
      <button type="button" onClick={backToProducts}>Back to products</button>

      {loading && <p role="status">Loading product…</p>}
      {error && <p role="alert">{error.message}</p>}

      {product && (
        <div className="product-detail">
          <img src={product.thumbnail} alt={product.title} />
          <div>
            <h1>{product.title}</h1>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p><strong>${product.price.toFixed(2)}</strong></p>
            <button type="button" onClick={() => addItem(product)}>Add to cart</button>
          </div>
        </div>
      )}
    </section>
  )
}

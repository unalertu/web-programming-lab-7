import { fetchProducts } from '../api/productsApi.js'
import ProductCard from '../components/ProductCard.jsx'
import { useFetch } from '../hooks/useFetch.js'

export default function ProductList() {
  const { loading, error, data: products } = useFetch(fetchProducts)

  return (
    <section>
      <h1>Products</h1>

      {loading && <p role="status">Loading products…</p>}
      {error && <p role="alert">{error.message}</p>}
      {products?.length === 0 && <p>No products are available.</p>}
      {products?.length > 0 && (
        <div className="product-grid">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  )
}

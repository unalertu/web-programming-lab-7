import { useSearchParams } from 'react-router'
import { fetchProducts } from '../api/productsApi.js'
import ProductCard from '../components/ProductCard.jsx'
import { useFetch } from '../hooks/useFetch.js'

export default function ProductList() {
  const { loading, error, data } = useFetch(fetchProducts)
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const products = data ?? []
  const categories = [...new Set(products.map(product => product.category))].sort()
  const searchText = search.trim().toLowerCase()

  const visibleProducts = products.filter(product => {
    const matchesTitle = product.title.toLowerCase().includes(searchText)
    const matchesCategory = category === '' || product.category === category
    return matchesTitle && matchesCategory
  })

  function updateFilter(name, value) {
    setSearchParams(current => {
      const next = new URLSearchParams(current)
      if (value === '') {
        next.delete(name)
      } else {
        next.set(name, value)
      }
      return next
    }, { replace: true })
  }

  return (
    <section>
      <h1>Products</h1>

      {loading && <p role="status">Loading products…</p>}
      {error && <p role="alert">{error.message}</p>}

      {data && (
        <>
          <div className="filters">
            <label>
              Search by title
              <input type="search" value={search} onChange={event => updateFilter('q', event.target.value)} />
            </label>
            <label>
              Category
              <select value={category} onChange={event => updateFilter('category', event.target.value)}>
                <option value="">All categories</option>
                {category && !categories.includes(category) && <option value={category}>{category}</option>}
                {categories.map(name => (
                  <option key={name} value={name}>{name.replaceAll('-', ' ')}</option>
                ))}
              </select>
            </label>
          </div>

          {visibleProducts.length === 0 ? (
            <p>No products match your filters.</p>
          ) : (
            <div className="product-grid">
              {visibleProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </>
      )}
    </section>
  )
}

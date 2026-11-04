const productsUrl = 'https://dummyjson.com/products'

export async function fetchProducts(signal) {
  const response = await fetch(productsUrl + '?limit=100', { signal })

  if (!response.ok) {
    throw new Error('Could not load products.')
  }

  const result = await response.json()
  return result.products
}

export async function fetchProduct(id, signal) {
  const response = await fetch(productsUrl + '/' + encodeURIComponent(id), { signal })

  if (response.status === 404) {
    throw new Error('Product not found.')
  }

  if (!response.ok) {
    throw new Error('Could not load this product.')
  }

  return response.json()
}

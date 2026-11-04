import { Link } from 'react-router'
import { useCartStore } from '../store/cartStore.js'

export default function Cart() {
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const setQuantity = useCartStore(state => state.setQuantity)
  const clear = useCartStore(state => state.clear)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <section>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Cart</h1>
      <ul className="cart-items">
        {items.map(item => (
          <li className="cart-item" key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p>${item.price.toFixed(2)} each</p>
            </div>

            <div className="cart-controls">
              <button
                type="button"
                aria-label={'Decrease quantity for ' + item.title}
                onClick={() => setQuantity(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span>Qty {item.quantity}</span>
              <button
                type="button"
                aria-label={'Increase quantity for ' + item.title}
                onClick={() => setQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                type="button"
                aria-label={'Remove ' + item.title}
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p><strong>Total: ${total.toFixed(2)}</strong></p>
      <button type="button" onClick={clear}>Clear cart</button>
    </section>
  )
}

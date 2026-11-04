import { create } from 'zustand'

const cartKey = 'campus-shop-cart'

// Start with an empty cart if the saved data cannot be read.
function readItems() {
  try {
    const savedItems = JSON.parse(localStorage.getItem(cartKey) ?? '[]')

    if (!Array.isArray(savedItems)) {
      return []
    }

    return savedItems.filter(item =>
      item &&
      Number.isSafeInteger(item.id) && item.id > 0 &&
      typeof item.title === 'string' &&
      Number.isFinite(item.price) && item.price >= 0 &&
      Number.isSafeInteger(item.quantity) && item.quantity > 0
    )
  } catch {
    return []
  }
}

export const useCartStore = create((set, get) => ({
  items: readItems(),

  addItem(product) {
    set(state => {
      const existingItem = state.items.find(item => item.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }
      }

      const { id, title, price } = product
      return { items: [...state.items, { id, title, price, quantity: 1 }] }
    })
  },

  removeItem(id) {
    set(state => ({ items: state.items.filter(item => item.id !== id) }))
  },

  setQuantity(id, quantity) {
    if (quantity < 1) {
      get().removeItem(id)
      return
    }

    if (Number.isSafeInteger(quantity)) {
      set(state => ({
        items: state.items.map(item => item.id === id ? { ...item, quantity } : item),
      }))
    }
  },

  clear() {
    set({ items: [] })
  },
}))

// Save the cart only when the items change.
useCartStore.subscribe((state, previous) => {
  if (state.items === previous.items) {
    return
  }

  try {
    localStorage.setItem(cartKey, JSON.stringify(state.items))
  } catch {
    return
  }
})

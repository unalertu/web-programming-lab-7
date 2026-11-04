import { useEffect, useReducer } from 'react'

const noInputs = []
const initialState = { loading: true, error: null, data: null }

function fetchReducer(state, action) {
  switch (action.type) {
    case 'SUCCESS':
      return { ...action.request, loading: false, error: null, data: action.data }
    case 'ERROR':
      return { ...action.request, loading: false, error: action.error, data: null }
    default:
      return state
  }
}

export function useFetch(fetchData, inputs = noInputs) {
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    const controller = new AbortController()

    const request = { fetchData, inputs }

    async function load() {
      try {
        const data = await fetchData(...inputs, controller.signal)
        if (!controller.signal.aborted) {
          dispatch({ type: 'SUCCESS', data, request })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          dispatch({ type: 'ERROR', error, request })
        }
      }
    }

    load()
    return () => controller.abort()
  }, [fetchData, inputs])

  if (state.fetchData !== fetchData || state.inputs !== inputs) {
    return initialState
  }

  const { loading, error, data } = state
  return { loading, error, data }
}

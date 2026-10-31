import { useEffect, useState } from 'react'
import { getItem, getRandom, getWelcome } from './api'
import './App.css'

function Welcome() {
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    getWelcome()
      .then((data) => {
        if (active) {
          setMessage(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="card">
      <h2>Welcome</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">Failed to load message: {error}</p>}
      {message && <p className="response">Hello: {message.Hello}</p>}
    </section>
  )
}

function Random() {
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchRandom() {
    setLoading(true)
    setError(null)
    try {
      const data = await getRandom()
      setValue(data.random)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Random Number</h2>
      <p className="response">{value === null ? '—' : value}</p>
      <button type="button" onClick={fetchRandom} disabled={loading}>
        {loading ? 'Rolling…' : 'Get Random Number'}
      </button>
      {error && <p className="error">Failed to fetch random number: {error}</p>}
    </section>
  )
}

function ItemLookup() {
  const [itemId, setItemId] = useState('')
  const [q, setQ] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setResult(null)

    try {
      const data = await getItem(Number(itemId), q)
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="card">
      <h2>Item Lookup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Query (optional)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">Fetch Item</button>
      </form>
      {result && (
        <div className="product-card">
          <h3>{result.name}</h3>
          <p className="product-category">{result.category}</p>
          <p className="product-description">{result.description}</p>
          {result.pricing && (
            <p className="product-pricing">
              {result.pricing.currency === 'USD' ? '$' : ''}
              {result.pricing.amount} {result.pricing.period}
            </p>
          )}
        </div>
      )}
      {error && <p className="error">Failed to fetch item: {error}</p>}
    </section>
  )
}

export default function App() {
  return (
    <main className="app">
      <h1>Python Web Agentic</h1>
      <p className="subtitle">Starter React frontend for the FastAPI backend.</p>
      <Welcome />
      <Random />
      <ItemLookup />
    </main>
  )
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path, init = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }

  return res.json()
}

export function getWelcome() {
  return request('/')
}

export function getItem(itemId, q) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  const queryString = params.toString()
  const path = queryString
    ? `/items/${itemId}?${queryString}`
    : `/items/${itemId}`
  return request(path)
}

export function getRandom() {
  return request('/random')
}

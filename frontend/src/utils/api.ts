import axios from 'axios'

// Use environment variable or fallback to localhost
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const api = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})

// Log the API base URL in development for debugging
if (import.meta.env.DEV) {
	console.log('API Base URL:', baseURL)
}

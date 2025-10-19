import axios from 'axios'

const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json'
	}
})

// Request interceptor for adding auth tokens
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('flowlog_token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// Response interceptor for handling errors globally
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// Server responded with error status
			console.error('API Error:', error.response.data)
		} else if (error.request) {
			// Request made but no response
			console.error('Network Error:', error.message)
		} else {
			// Something else happened
			console.error('Error:', error.message)
		}
		return Promise.reject(error)
	}
)

export default api

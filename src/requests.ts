import axios, { AxiosInstance } from 'axios'

// Create a new axios instance for Auth requests.
export const authClient: AxiosInstance = axios.create({
  baseURL: 'https://auth.komentory.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Create a new axios instance for API requests.
export const apiClient: AxiosInstance = axios.create({
  // baseURL: 'https://api.komentory.com/v1',
  baseURL: 'http://127.0.0.1:5000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

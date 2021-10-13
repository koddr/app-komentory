import axios, { AxiosInstance } from 'axios'

// Create a new axios instance for Komentory/Auth/v1 requests.
export const authClient: AxiosInstance = axios.create({
  baseURL: String(import.meta.env.VITE_VUE_APP_AUTH_BASE_URL),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000, // 3 second
  withCredentials: true,
})

// Create a new axios instance for Komentory/API/v1 requests.
export const apiClient: AxiosInstance = axios.create({
  baseURL: String(import.meta.env.VITE_VUE_APP_API_BASE_URL),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1500, // 1.5 second
  withCredentials: true,
})

// Create a new axios instance for Postmark API requests.
export const postmarkClient: AxiosInstance = axios.create({
  baseURL: 'https://api.postmarkapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Postmark-Server-Token': String(import.meta.env.VITE_VUE_APP_POSTMARK_SERVER_TOKEN),
  },
  timeout: 5000, // 5 second
})

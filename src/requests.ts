import axios, { AxiosInstance } from 'axios'

// Create a new axios instance for Komentory/Auth/v1 requests.
export const authClient: AxiosInstance = axios.create({
  baseURL: 'https://auth.komentory.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Create a new axios instance for Komentory/API/v1 requests.
export const apiClient: AxiosInstance = axios.create({
  // baseURL: 'https://api.komentory.com/v1',
  baseURL: 'http://127.0.0.1:5000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Create a new axios instance for Postmark API requests.
export const postmarkClient: AxiosInstance = axios.create({
  baseURL: 'https://api.postmarkapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Postmark-Server-Token': import.meta.env.POSTMARK_SERVER_TOKEN,
  },
})

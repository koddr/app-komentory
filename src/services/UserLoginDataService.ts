import { authClient } from '__/requests'

/**
 * @class UserLoginDataService
 * @description Axios service provider for make API requests to UserLogin model.
 */
class UserLoginDataService {
  /**
   * @method login
   * @description Method to authenticate user by email and password.
   * @param {UserLoginRequest} data
   * @returns Promise
   */
  login(data: UserLoginRequest): Promise<any> {
    return authClient.post('/user/login', data)
  }
}

/**
 * @interface UserLoginRequest
 * @description Public interface to describe request data for UserLogin model.
 */
export interface UserLoginRequest {
  email: string
  password: string
}

/**
 * @interface UserLoginResponse
 * @description Public interface to describe response data for UserLogin model.
 */
export interface UserLoginResponse {
  data: {
    msg: string
    status: number
    jwt: {
      token: string
      expire: number
    }
    user: {
      id: string
      email: string
      username: string
      user_status: number
      user_attrs: {
        first_name: string
        last_name: string
        about_me: string
        picture: string
        website_url: string
        abilities: string[]
      }
    }
  }
}

// Export UserLogin data service.
export default new UserLoginDataService()

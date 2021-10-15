import { authClient } from '__/requests'

/**
 * @class UserLoginDataService
 * @description Axios service provider for make API requests to UserLogin model.
 */
class UserLoginDataService {
  /**
   * @method login
   * @description Method to authenticate user by email and password.
   * @param {IUserLoginRequest} data
   * @returns Promise
   */
  login(data: IUserLoginRequest): Promise<any> {
    return authClient.post('/user/login', data)
  }
}

/**
 * @interface IUserLoginRequest
 * @description Public interface to describe request data for UserLogin model.
 */
export interface IUserLoginRequest {
  email: string
  password: string
}

/**
 * @interface IUserLoginResponse
 * @description Public interface to describe response data for UserLogin model.
 */
export interface IUserLoginResponse {
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
      status: number
      first_name: string
      last_name: string
      about_me: string
      picture: string
      website_url: string
      abilities: string[]
      settings: {
        email_subscriptions: {
          transactional: boolean
          marketing: boolean
        }
      }
    }
  }
}

// Export UserLogin data service.
export default new UserLoginDataService()

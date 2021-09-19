import { authClient } from '__/requests'

/**
 * @class SignInDataService
 * @description Axios service provider for make API requests to SignIn model.
 */
class SignInDataService {
  /**
   * @method signIn
   * @description Method to authenticate user by email and password.
   * @param {SignInRequest} data
   * @returns Promise
   */
  signIn(data: SignInRequest): Promise<any> {
    return authClient.post('/user/login', data)
  }
}

/**
 * @interface SignInRequest
 * @description Public interface to describe request data for SignIn model.
 */
export interface SignInRequest {
  email: string
  password: string
}

/**
 * @interface SignInResponse
 * @description Public interface to describe response data for SignIn model.
 */
export interface SignInResponse {
  data: {
    error: boolean
    msg: string
    jwt: {
      token: string
      expire: number
    }
  }
}

// Export SignIn data service.
export default new SignInDataService()

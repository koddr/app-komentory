import { authClient } from '__/requests'

/**
 * @class SignUpDataService
 * @description Axios service provider for make API requests to SignUp model.
 */
class SignUpDataService {
  /**
   * @method signUp
   * @description Method to register user with given name, email and password.
   * @param {Object} data
   * @returns Promise
   */
  signUp(data: SignUpRequest): Promise<any> {
    return authClient.put('/sign/up', data)
  }
}

/**
 * @interface SignUpRequest
 * @description Public interface to describe request data for SignUp model.
 */
export interface SignUpRequest {
  email: string
  password: string
  user_attrs: {
    first_name: string
    last_name: string
  }
}

// Export SignUp data service.
export default new SignUpDataService()

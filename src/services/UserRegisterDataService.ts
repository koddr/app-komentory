import { authClient } from '__/requests'

/**
 * @class UserRegisterDataService
 * @description Axios service provider for make API requests to UserRegister model.
 */
class UserRegisterDataService {
  /**
   * @method register
   * @description Method to register user with given name, email and password.
   * @param {UserRegisterRequest} data
   * @returns Promise
   */
  register(data: UserRegisterRequest): Promise<any> {
    return authClient.post('/user/create', data)
  }
}

/**
 * @interface UserRegisterRequest
 * @description Public interface to describe request data for UserRegister model.
 */
export interface UserRegisterRequest {
  email: string
  password: string
  user_attrs: {
    first_name: string
    last_name: string
  }
  user_settings: {
    email_subscriptions: {
      marketing: boolean
    }
  }
}

// Export UserRegister data service.
export default new UserRegisterDataService()

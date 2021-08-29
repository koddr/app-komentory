import { AxiosRequestConfig } from 'axios'
import { authClient } from '__/requests'

/**
 * @class SignOutDataService
 * @description Axios service provider for make API requests to SignOut model.
 */
class SignOutDataService {
  /**
   * @method signOut
   * @description Method to de-authenticate user.
   * @param {String} token
   * @returns Promise
   */
  signOut(token: String): Promise<any> {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // add required header with JWT
      },
    }
    return authClient.post('/sign/out', {}, config)
  }
}

// Export SignOut data service.
export default new SignOutDataService()

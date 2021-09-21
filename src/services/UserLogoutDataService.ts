import { authClient } from '__/requests'

/**
 * @class UserLogoutDataService
 * @description Axios service provider for make API requests to UserLogout model.
 */
class UserLogoutDataService {
  /**
   * @method logout
   * @description Method to de-authenticate user.
   * @param {String} token
   * @returns Promise
   */
  logout(token: String): Promise<any> {
    authClient.defaults.headers.common['Authorization'] = `Bearer ${token}` // add required header
    return authClient.delete('/user/logout')
  }
}

// Export UserLogout data service.
export default new UserLogoutDataService()

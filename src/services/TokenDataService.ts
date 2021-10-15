import { authClient } from '__/requests'

/**
 * @class TokenDataService
 * @description Axios service provider for make API requests to Token model.
 */
class TokenDataService {
  /**
   * @method renew
   * @description Method to renew JWT token.
   * @param {String} token
   * @returns Promise
   */
  renew(token: String): Promise<any> {
    authClient.defaults.headers.common['Authorization'] = `Bearer ${token}` // add required header
    return authClient.post('/token/renew')
  }
}

/**
 * @interface ITokenResponse
 * @description Public interface to describe response data for Token model.
 */
export interface ITokenResponse {
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

// Export Token data service.
export default new TokenDataService()

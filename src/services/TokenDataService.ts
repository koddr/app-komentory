import { AxiosRequestConfig } from 'axios'
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
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // add required header with JWT
      },
    }
    return authClient.post('/token/renew', {}, config)
  }
}

/**
 * @interface TokenResponse
 * @description Public interface to describe response data for Token model.
 */
export interface TokenResponse {
  data: {
    error: boolean
    msg: string
    jwt: {
      token: string
      expire: number
    }
  }
}

// Export Token data service.
export default new TokenDataService()

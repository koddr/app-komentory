import { AxiosRequestConfig } from 'axios'
import { authClient } from '__/requests'

/**
 *  TokenDataService
 */
class TokenDataService {
  //
  renew(token: String): Promise<any> {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return authClient.post('/token/renew', {}, config)
  }
}

//
export interface TokenRequest {}

//
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

//
export default new TokenDataService()

import { authClient } from '__/requests'

/**
 *  TokenDataService
 */
class TokenDataService {
  //
  renew(): Promise<any> {
    return authClient.post('/token/renew')
  }
}

//
export interface TokenRequest {}

//
export interface TokenResponse {
  data: {
    error: Boolean
    msg: String
    jwt: {
      token: String
      expire: Number
    }
  }
}

//
export default new TokenDataService()

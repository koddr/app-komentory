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
  error: null
  msg: string
  data: any
}

//
export default new TokenDataService()

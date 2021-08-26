import { AxiosRequestConfig } from 'axios'
import { authClient } from '__/requests'

/**
 *  SignOutDataService
 */
class SignOutDataService {
  //
  signOut(token: String): Promise<any> {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return authClient.post('/sign/out', {}, config)
  }
}

//
export interface SignOutRequest {}

//
export interface SignOutResponse {}

//
export default new SignOutDataService()

import { authClient } from '__/requests'

/**
 *  SignOutDataService
 */
class SignOutDataService {
  //
  signOut(): Promise<any> {
    return authClient.post('/sign/out')
  }
}

//
export interface SignOutRequest {}

//
export interface SignOutResponse {}

//
export default new SignOutDataService()

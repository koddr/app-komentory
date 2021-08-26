import { authClient } from '__/requests'

/**
 *  SignInDataService
 */
class SignInDataService {
  //
  signIn(data: SignInRequest): Promise<any> {
    return authClient.post('/sign/in', data)
  }
}

//
export interface SignInRequest {
  email: String
  password: String
}

//
export interface SignInResponse {
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
export default new SignInDataService()

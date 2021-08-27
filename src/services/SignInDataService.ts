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
  email: string
  password: string
}

//
export interface SignInResponse {
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
export default new SignInDataService()

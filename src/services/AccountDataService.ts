import { authClient } from '__/requests'

/**
 * @class AccountDataService
 * @description Axios service provider for make API requests to Account model.
 */
class AccountDataService {
  /**
   * @method activate
   * @description Method to activate user account.
   * @param {IAccountActivateRequest} data
   * @returns Promise
   */
  activate(data: IAccountActivateRequest): Promise<any> {
    return authClient.patch(`/account/activate`, data)
  }
}

/**
 * @interface IAccountActivateRequest
 * @description Public interface to describe request data for AccountActivate model.
 */
export interface IAccountActivateRequest {
  code: string
}

/**
 * @interface IAccountActivateResponse
 * @description Public interface to describe request data for AccountActivate model.
 */
export interface IAccountActivateResponse {
  data: {
    msg: string
    status: number
    user: {
      email: string
      first_name: string
    }
  }
}

// Export Account data service.
export default new AccountDataService()

import { authClient } from '__/requests'

/**
 * @class AccountActivateDataService
 * @description Axios service provider for make API requests to AccountActivate model.
 */
class AccountActivateDataService {
  /**
   * @method activate
   * @description Method to activate user account.
   * @param {AccountActivateRequest} data
   * @returns Promise
   */
  activate(data: AccountActivateRequest): Promise<any> {
    return authClient.patch(`/account/activate`, data)
  }
}

/**
 * @interface AccountActivateRequest
 * @description Public interface to describe request data for AccountActivate model.
 */
export interface AccountActivateRequest {
  code: string
}

// Export AccountActivate data service.
export default new AccountActivateDataService()

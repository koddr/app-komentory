import { authClient } from '__/requests'

/**
 * @class UserUpdateDataService
 * @description Axios service provider for make API requests to UserUpdate model.
 */
class UserUpdateDataService {
  /**
   * @method attrs
   * @description Method to update user attributes.
   * @param {IUserAttrsRequest} user_attrs_data
   * @returns Promise
   */
  attrs(user_attrs_data: IUserAttrsRequest): Promise<any> {
    return authClient.post('/user/update/attrs', user_attrs_data)
  }

  /**
   * @method settings
   * @description Method to update user settings.
   * @param {IUserSettingsRequest} user_settings_data
   * @returns Promise
   */
  settings(user_settings_data: IUserSettingsRequest): Promise<any> {
    return authClient.post('/user/update/settings', user_settings_data)
  }

  /**
   * @method password
   * @description Method to update user password.
   * @param {IUserPasswordRequest} user_password_data
   * @returns Promise
   */
  password(user_password_data: IUserPasswordRequest): Promise<any> {
    return authClient.post('/user/update/password', user_password_data)
  }
}

/**
 * @interface IUserAttrsRequest
 * @description Public interface to describe request data for UserAttrs model.
 */
export interface IUserAttrsRequest {
  first_name: string
  last_name: string
  about_me: string
  picture: string
  website_url: string
  abilities: string[]
}

/**
 * @interface IUserSettingsRequest
 * @description Public interface to describe request data for UserSettings model.
 */
export interface IUserSettingsRequest {
  email_subscriptions: {
    transactional: boolean
    marketing: boolean
  }
}

/**
 * @interface IUserPasswordRequest
 * @description Public interface to describe request data for UserPassword model.
 */
export interface IUserPasswordRequest {
  old_password: string
  new_password: string
}

// Export UserUpdate data service.
export default new UserUpdateDataService()

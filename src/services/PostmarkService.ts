import { postmarkClient } from '__/requests'

/**
 * @class PostmarkService
 * @description Axios service provider for make API requests to Postmark model.
 */
class PostmarkService {
  /**
   * @method send
   * @description Method to send email with given email, template alias and variables.
   * @param {PostmarkRequest} sendData
   * @returns Promise
   */
  send(sendData: PostmarkRequest): Promise<any> {
    let data: any = JSON.stringify({
      To: sendData.email,
      From: import.meta.env.FROM_EMAIL_ADDRESS,
      TemplateAlias: sendData.template,
      TemplateModel: sendData.variables,
    })
    return postmarkClient.post('/email/withTemplate', data)
  }
}

/**
 * @interface PostmarkRequest
 * @description Public interface to describe request data for Postmark email sender.
 */
export interface PostmarkRequest {
  email: string
  template: string
  variables: object
}

// Export SignOut data service.
export default new PostmarkService()

import { postmarkClient } from '__/requests'

/**
 * @class PostmarkService
 * @description Axios service provider for make API requests to Postmark model.
 */
class PostmarkService {
  /**
   * @method send
   * @description Method to send email with given plain text or inline html template and data.
   * @param {PostmarkRequest} data
   * @returns Promise
   */
  send(data: PostmarkRequest): Promise<any> {
    return postmarkClient.post('/email', data)
  }

  /**
   * @method sendWithTemplate
   * @description Method to send email with given template alias and data.
   * @param {PostmarkWithTemplateRequest} data
   * @returns Promise
   */
  sendWithTemplate(data: PostmarkWithTemplateRequest): Promise<any> {
    return postmarkClient.post('/email/withTemplate', data)
  }
}

/**
 * @interface PostmarkRequest
 * @description Public interface to describe request data for Postmark default email sender.
 */
export interface PostmarkRequest {
  From: string
  To: string
  Subject: string
  TextBody: string
  HtmlBody: string
}

/**
 * @interface PostmarkWithTemplateRequest
 * @description Public interface to describe request data for Postmark email sender with template.
 */
export interface PostmarkWithTemplateRequest {
  From: string
  To: string
  TemplateAlias: string
  TemplateModel: object
}

/**
 * @interface PostmarkResponse
 * @description Public interface to describe response data from Postmark.
 */
export interface PostmarkResponse {
  To: string
  SubmittedAt: string
  MessageID: string
  ErrorCode: number
  Message: string
}

// Export SignOut data service.
export default new PostmarkService()

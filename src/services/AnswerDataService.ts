import { apiClient } from '__/requests'

/**
 * @class AnswerDataService
 * @description Axios service provider for make API requests to Answer model.
 */
class AnswerDataService {
  /**
   * @method getAllByProjectID
   * @description Method to get all Answers from API by given project ID.
   * @param {String} project_id
   * @returns Promise
   */
  getAllByProjectID(project_id: String): Promise<any> {
    return apiClient.get(`/project/${project_id}/answers`)
  }

  /**
   * @method getAllByTaskID
   * @description Method to get all Answers from API by given task ID.
   * @param {String} task_id
   * @returns Promise
   */
  getAllByTaskID(task_id: String): Promise<any> {
    return apiClient.get(`/task/${task_id}/answers`)
  }

  /**
   * @method getByAlias
   * @description Method to get one Answer from API by given alias.
   * @param {String} alias
   * @returns Promise
   */
  getByAlias(alias: String): Promise<any> {
    return apiClient.get(`/answer/${alias}`)
  }
}

/**
 * @interface AnswersResponse
 * @description Public interface to describe response data for Answer model for many Answers.
 */
export interface AnswersResponse {
  data: {
    msg: string
    status: number
    count: number
    answers: answer[]
  }
}

/**
 * @interface AnswerResponse
 * @description Public interface to describe response data for Answer model for one Answer.
 */
export interface AnswerResponse {
  data: {
    msg: string
    status: number
    answer: answer
  }
}

// Private interface to describe Answer model.
interface answer {
  id: string
  created_at: Date
  updated_at: Date
  alias: string
  answer_attrs: {
    description: string
    documents: string[]
    images: string[]
    links: string[]
  }
}

// Export Answer data service.
export default new AnswerDataService()

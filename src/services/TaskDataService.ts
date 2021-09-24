import { apiClient } from '__/requests'

/**
 * @class TaskDataService
 * @description Axios service provider for make API requests to Task model.
 */
class TaskDataService {
  /**
   * @method getAllByProjectID
   * @description Method to get all tasks from API by given project ID.
   * @param {String} project_id
   * @returns Promise
   */
  getAllByProjectID(project_id: String): Promise<any> {
    return apiClient.get(`/project/${project_id}/tasks`)
  }

  /**
   * @method getByAlias
   * @description Method to get one task from API by given alias.
   * @param {String} alias
   * @returns Promise
   */
  getByAlias(alias: String): Promise<any> {
    return apiClient.get(`/task/${alias}`)
  }
}

/**
 * @interface TasksResponse
 * @description Public interface to describe response data for Task model for many Tasks.
 */
export interface TasksResponse {
  data: {
    msg: string
    status: number
    count: number
    tasks: task[]
  }
}

/**
 * @interface TaskResponse
 * @description Public interface to describe response data for Task model for one task.
 */
export interface TaskResponse {
  data: {
    msg: string
    status: number
    task: task
  }
}

// Private interface to describe Task model.
interface task {
  id: string
  created_at: Date
  updated_at: Date
  alias: string
  task_attrs: {
    name: string
    description: string
    steps: step[]
    documents: string[]
    images: string[]
    links: string[]
  }
  answers_count: number
}

// Private interface to describe Steps field in Task model.
interface step {
  position: number
  description: string
}

// Export Task data service.
export default new TaskDataService()

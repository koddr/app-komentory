import { apiClient } from '__/requests'

/**
 * @class TaskDataService
 * @description Axios service provider for make API requests to Task model.
 */
class TaskDataService {
  /**
   * @method getByID
   * @description Method to get one task from API by given ID.
   * @param {String} task_id
   * @returns Promise
   */
  getByID(task_id: String): Promise<any> {
    return apiClient.get(`/task/${task_id}`)
  }

  /**
   * @method getAllByProjectID
   * @description Method to get all tasks from API by given project ID.
   * @param {String} project_id
   * @returns Promise
   */
  getAllByProjectID(project_id: String): Promise<any> {
    return apiClient.get(`/project/${project_id}/tasks`)
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
    tasks: Task[]
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
    task: Task
  }
}

/**
 * @interface Task
 * @description Public interface to describe Task model.
 */
export interface Task {
  id: string
  created_at: Date
  updated_at: Date
  project_id: string
  status: number
  attrs: {
    name: string
    description: string
    steps: step[]
    documents: string[]
    images: string[]
    links: string[]
  }
  answers_count: number
}

/**
 * @interface Tasks
 * @description Public interface to describe Tasks model.
 */
export interface Tasks {
  id: string
  created_at: Date
  updated_at: Date
  attrs: {
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

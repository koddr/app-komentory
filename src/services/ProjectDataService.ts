import { apiClient } from '__/requests'

/**
 * @class ProjectDataService
 * @description Axios service provider for make API requests to Project model.
 */
class ProjectDataService {
  /**
   * @method getAll
   * @description Method to get all projects from API.
   * @returns Promise
   */
  getAll(): Promise<any> {
    return apiClient.get('/projects')
  }

  /**
   * @method getByAlias
   * @description Method to get one project from API by alias.
   * @param {String} alias
   * @returns Promise
   */
  getByAlias(alias: String): Promise<any> {
    return apiClient.get(`/project/${alias}`)
  }
}

/**
 * @interface ProjectsResponse
 * @description Public interface to describe response data for Project model for many projects.
 */
export interface ProjectsResponse {
  data: {
    error: boolean
    msg: string
    status: number
    count: number
    projects: project[]
  }
}

/**
 * @interface ProjectResponse
 * @description Public interface to describe response data for Project model for one project.
 */
export interface ProjectResponse {
  data: {
    error: boolean
    msg: string
    status: number
    project: project
    tasks_count: number
    tasks: task[]
  }
}

// Private interface to describe Project model.
interface project {
  id: string
  created_at: Date
  updated_at: Date
  user_id: string
  alias: string
  project_status: number
  project_attrs: {
    title: string
    description: string
    picture: string
    url: string
  }
}

// Private interface to describe Task model.
interface task {
  id: string
  created_at: Date
  updated_at: Date
  task_attrs: {
    title: string
    description: string
    picture: string
    url: string
  }
}

// Export Project data service.
export default new ProjectDataService()

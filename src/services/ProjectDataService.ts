import { apiClient } from '__/requests'
import { Task } from '__/services/TaskDataService'

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
   * @method getAllByUserID
   * @description Method to get all projects from API by given user ID.
   * @param {String} user_id
   * @returns Promise
   */
  getAllByUserID(user_id: String): Promise<any> {
    return apiClient.get(`/user/${user_id}/projects`)
  }

  /**
   * @method getByID
   * @description Method to get one project from API by ID.
   * @param {String} project_id
   * @returns Promise
   */
  getByID(project_id: String): Promise<any> {
    return apiClient.get(`/project/${project_id}`)
  }
}

/**
 * @interface ProjectsResponse
 * @description Public interface to describe response data for Project model for many projects.
 */
export interface ProjectsResponse {
  data: {
    msg: string
    status: number
    count: number
    projects: projects[]
  }
}

/**
 * @interface ProjectResponse
 * @description Public interface to describe response data for Project model for one project.
 */
export interface ProjectResponse {
  data: {
    msg: string
    status: number
    project: project
  }
}

// Private interface to describe Project model.
interface project {
  id: string
  created_at: Date
  updated_at: Date
  status: number
  attrs: {
    title: string
    description: string
    category: string
    website_url: string
    picture: string
    tags: string[]
  }
  author: {
    user_id: string
    first_name: string
    last_name: string
    picture: string
  }
  tasks_count: number
  tasks: Task[]
}

// Private interface to describe Projects model.
interface projects {
  id: string
  created_at: Date
  updated_at: Date
  attrs: {
    title: string
    description: string
    category: string
    website_url: string
    picture: string
    tags: string[]
  }
  author: {
    user_id: string
    first_name: string
    last_name: string
    picture: string
  }
  tasks_count: number
}

// Export Project data service.
export default new ProjectDataService()

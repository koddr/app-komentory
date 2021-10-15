import { apiClient } from '__/requests'
import { TasksList } from '__/'

/**
 * @class ProjectDataService
 * @description Axios service provider for make API requests to Project model.
 */
class ProjectDataService {
  /**
   * @method getByID
   * @description Method to get one project from API by ID.
   * @param {String} project_id
   * @returns Promise
   */
  getByID(project_id: String): Promise<any> {
    return apiClient.get(`/project/${project_id}`)
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
   * @method getAll
   * @description Method to get all projects from API.
   * @returns Promise
   */
  getAll(): Promise<any> {
    return apiClient.get('/projects')
  }
}

/**
 * @interface IProjectResponse
 * @description Public interface to describe response data for Project model for one project.
 */
export interface IProjectResponse {
  data: {
    msg: string
    status: number
    project: project
  }
}

/**
 * @interface IProjectsResponse
 * @description Public interface to describe response data for Project model for many projects.
 */
export interface IProjectsResponse {
  data: {
    msg: string
    status: number
    count: number
    projects: projects[]
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
  tasks: TasksList[]
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

import { apiClient } from '__/requests'

/**
 *  ProjectDataService
 */
class ProjectDataService {
  //
  getAll(): Promise<any> {
    return apiClient.get('/projects')
  }

  //
  get(alias: string): Promise<any> {
    return apiClient.get(`/project/${alias}`)
  }
}

//
export interface projectDetails {
  id: string
  created_at: Date
  updated_at: Date
  user_id: string
  alias: string
  project_status: number
  project_attrs: any
}

//
export interface ProjectRequest {
  id: string
}

//
export interface ProjectResponse {
  error: null
  msg: string
  project: projectDetails
}

//
export interface ProjectsRequest {}

//
export interface ProjectsResponse {
  error: null
  msg: string
  count: number
  projects: projectDetails[]
}

//
export default new ProjectDataService()

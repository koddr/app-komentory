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
  id: String
  created_at: Date
  updated_at: Date
  user_id: String
  alias: String
  project_status: Number
  project_attrs: any
}

//
export interface ProjectRequest {
  id: String
}

//
export interface ProjectResponse {
  error: Boolean
  msg: String
  project: projectDetails
}

//
export interface ProjectsRequest {}

//
export interface ProjectsResponse {
  error: Boolean
  msg: String
  count: Number
  projects: projectDetails[]
}

//
export default new ProjectDataService()

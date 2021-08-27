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
  getByAlias(alias: string): Promise<any> {
    return apiClient.get(`/project/${alias}`)
  }
}

//
interface project {
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
  data: {
    error: Boolean
    msg: String
    project: project
  }
}

//
export interface ProjectsRequest {}

//
export interface ProjectsResponse {
  data: {
    error: Boolean
    msg: String
    count: Number
    projects: project[]
  }
}

//
export default new ProjectDataService()

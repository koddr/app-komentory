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
  getByAlias(alias: String): Promise<any> {
    return apiClient.get(`/project/${alias}`)
  }
}

//
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

//
export interface ProjectRequest {}

//
export interface ProjectResponse {
  data: {
    error: boolean
    msg: string
    project: project
  }
}

//
export interface ProjectsRequest {}

//
export interface ProjectsResponse {
  data: {
    error: boolean
    msg: string
    count: number
    projects: project[]
  }
}

//
export default new ProjectDataService()

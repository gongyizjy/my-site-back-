import request from '@/utils/request'

export function getAllProjects() {
  return request({
    url: '/api/project',
    method: 'get'
  })
}
export function delOneproject(id) {
  return request({
    url: '/api/project/' + id,
    method: 'delete'
  })
}
export function editOneproject(projectInfo) {
  return request({
    url: '/api/project/' + projectInfo.id,
    method: 'put',
    data: projectInfo.data
  })
}
export function addOneproject(projectInfo) {
  return request({
    url: '/api/project',
    method: 'post',
    data: projectInfo
  })
}

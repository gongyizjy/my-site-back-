import request from '@/utils/request'

export function getBloglist(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}
export function delOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}
export function getBlogType() {
  return request({
    url: '/api/blogtype',
    method: 'get'
  })
}
export function addBlogType(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}
export function findOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get'
  })
}
export function updateOneBlogType(Info) {
  return request({
    url: `/api/blogtype/${Info.id}`,
    method: 'put',
    data: Info.data
  })
}
export function deleteOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete'
  })
}
export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}
export function addBlog(blogInfo) {
  return request({
    url: '/api/blog',
    method: 'post',
    data: blogInfo
  })
}
export function editBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: 'put',
    data: blogInfo.data
  })
}

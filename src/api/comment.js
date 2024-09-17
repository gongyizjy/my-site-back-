import reuqest from '@/utils/request'
export function getComment(page = 1, limit = 10) {
  return reuqest({
    url: '/api/comment',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}
export function delComment(id) {
  return reuqest({
    url: '/api/comment/' + id,
    method: 'delete'
  })
}

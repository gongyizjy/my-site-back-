import request from '@/utils/request'

export function getMessage(page = 1, limit = 10) {
  return request({
    url: '/api/message',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

export function delMessage(id) {
  return request({
    url: '/api/message/' + id,
    method: 'delete'
  })
}

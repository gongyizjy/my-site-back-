import request from '@/utils/request'
export function getbanner() {
  return request({
    url: '/api/banner',
    method: 'get'
  })
}

export function setBanner(info) {
  return request({
    url: '/api/banner',
    method: 'post',
    data: info
  })
}

import request from '@/utils/request'

export function getSettingInfo() {
  return request({
    url: '/api/setting',
    method: 'get'
  })
}

export function setSettingInfo(data) {
  return request({
    url: '/api/setting',
    method: 'put',
    data
  })
}

import request from '@/utils/request'

export function getCaptcha() {
  return request({
    url: '/res/captcha',
    method: 'get'
  })
}


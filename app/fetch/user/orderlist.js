import { get } from '../get.js'

export function getOrderListData(username) {
  const result = get('/api/orderlist/' + username)
  return result
}
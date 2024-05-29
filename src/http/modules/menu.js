import axios from '../axios'


export const findMenuTree = () => {
  return axios({
    url: '/menu/findTree',
    method: 'get',
  })
}
import _axios from '../../../scripts/axios';

export default {
  engine: {
    get () {
      const url = '/api/ruleEngine'
      return _axios({
        method: 'get',
        url
      })
    },
    put (data) {
      const url = '/api/ruleEngine'
      return _axios({
        method: 'put',
        data: data,
        url
      })
    },
    post (data) {
      const url = '/api/ruleEngine'
      return _axios({
        method: 'post',
        data: data,
        url
      })
    },
    delete (engineId) {
      const url = `/api/ruleEngine/removeEngine/${engineId}`
      return _axios({
        method: 'delete',
        url
      })
    },
    copyEngine (engineInfo) {
      const url = `/api/ruleEngine/copyByEngine`
      return _axios({
        method: 'post',
        data: engineInfo,
        url
      })
    }
  }
}

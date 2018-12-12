import * as types from './mutation-types'

const mutations = {
  //设置用户的金币数
  [types.SET_COINNUM](state, num) {
    state.coinNum = num;
  },

  //保存地址信息
  [types.SAVE_ADDRESS](state, address) {
    state.address = address;
  },
  [types.UPDATE_STATE](state) {
    for (let i = 0; i < sessionStorage.length; i++) {
      let keys = sessionStorage.key(i);
      if (state[keys] !== 'undefined' && state[keys] !== undefined && window.sessionStorage.getItem(keys) != 'undefined') {
        let value = JSON.parse(window.sessionStorage.getItem(keys));
        state[keys] = value;
      }
    }
  },
}

export default mutations

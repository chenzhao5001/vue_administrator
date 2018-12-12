const state = {
  account: '',
  isLogin: false,
}
let BLACK_LIST = []
let handler = {
  set: function (obj, prop, value) {
    if (!BLACK_LIST.includes(prop)) {
      window.sessionStorage.setItem(prop, JSON.stringify(value));
    } else {

    }
    return Reflect.set(obj, prop, value)
  },
}
export default new Proxy(state, handler);

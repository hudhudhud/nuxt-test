//同时注入到vue、context、vuex
export default ({ app }, inject) => {
  inject('test', (str) => console.log(str))
}

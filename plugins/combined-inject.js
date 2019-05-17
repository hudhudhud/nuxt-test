//同时注入到vue、context、vuex
export default ({ app }, inject) => {
  inject('myInjectedCommonFunction', (string) => console.log('That was easy!', string))
}

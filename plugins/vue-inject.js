import Vue from 'vue'
//vue注入
Vue.prototype.$myInjectedFunction = (string) => console.log("This is an example", string)

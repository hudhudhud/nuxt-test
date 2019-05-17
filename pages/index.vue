<template>
  <section class="container">
    <div>
      <!--<logo />-->
      <!--<h1 class="title">-->
       <!--hello-->
      <!--</h1>-->
      <!--<h2 class="subtitle">-->
        <!--Welcome to the iView + Nuxt.js template-->
      <!--</h2>-->
      <!--<div class="links">-->
        <!--<Button type="primary" target="_blank" to="https://nuxtjs.org/">Documentation</Button>-->
        <!--<Button target="_blank" to="https://github.com/nuxt/nuxt.js">GitHub</Button>-->
        <!--<Button target="_blank" to="https://www.iviewui.com/">iView</Button>-->
      <!--</div>-->
      <div class="links">
         <nuxt-link to="/list">动态路由</nuxt-link>
         <nuxt-link to="/users">嵌套路由</nuxt-link>
      </div>
      <div v-for="(item,i) in list">{{i}}、{{item.email}}</div>
      <nuxt-link :to="'?page='+item" v-for="item in list1"  >  {{item}}  </nuxt-link>
      <img src="/a.gif" alt="">
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  data(){
    return {
      list:[1,2],
      page:1,
      list1:[1,2,3,4,5]
    }
  },
  //在服务端调用，因此network中看不到
  //Nuxt.js 会将 asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件
   asyncData(context){
     context.app.myInjectedFunction('context!')
     context.app.$myInjectedCommonFunction('works in async111')
      return context.$axios.$get('getTableList',{page:context.query.page})
            .then(res=>{
              return {list:res.data.list}
            })
            .catch((e) => {
              error({ statusCode: 404, message: 'Post not found' })//你可以通过调用该方法来显示错误信息页面。params.statusCode 可用于指定服务端返回的请求状态码
            })
  },
  async mounted(){
   // let data = await this.$axios.get('getTableList')
   //  console.log(2222,data)
    this.$myInjectedFunction('test')
    this.$myInjectedCommonFunction('works in mounted222')
  },
  watchQuery: ['page'],
  methods:{
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>

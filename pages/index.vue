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
      <!--<div class="links">-->
         <!--<nuxt-link to="/list">动态路由</nuxt-link>-->
         <!--<nuxt-link to="/users">嵌套路由</nuxt-link>-->
      <!--</div>-->
      <section class="content" ref="content">
         <div v-for="(item,i) in list" class="item" ref="col"  :style="{width:waterfallW+'px',left:item.left+'px',top:item.top+'px'}">
            <p>{{item.title}}</p>
            <span>{{item.author?item.author.loginname:''}}</span>
            <img :src="item.author?item.author.avatar_url:''" alt="" >
         </div>
      </section>
      <!--<nuxt-link :to="'?page='+item" v-for="item in list1"  >  {{item}}  </nuxt-link>-->
      <!--<img src="/a.gif" alt="">-->
      <!--<i-button >Click me!</i-button>-->
      <!--<vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData" :width="100"></vue-waterfall-easy>-->
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
const gap=10
let leftH=0,rightH=0;
export default {
  components: {
    Logo,
  },
  data(){
    return {
      list:[1,2],
      page:2,
      waterfallW:0,
      screenWidth:0,
      startIndex:0,
      total:39,
    }
  },
  //在服务端调用，因此network中看不到
  //Nuxt.js 会将 asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件
   asyncData(context){
     // context.app.myInjectedFunction('context!')
      context.app.$test('works in async111')
      return context.$axios.$get('topics',{params:{page:1,limit:10}})
            .then(async res=>{
               return {list:res.data}
            })
            .catch((e) => {
              context.error({ statusCode: 404, message: 'Post not found' })//你可以通过调用该方法来显示错误信息页面。params.statusCode 可用于指定服务端返回的请求状态码
            })
  },
  async mounted(){
   // let data = await this.$axios.get('getTableList')
   //  console.log(2222,data)
   //  this.$myInjectedFunction('test')
    this.$test('works in mounted222')
    window.addEventListener('scroll', this.getData);
    this.screenWidth=document.documentElement.clientWidth
    this.waterfallW = (this.screenWidth - 3*gap) / 2;
    setTimeout(()=>{
      this.sort()
    },600)

  },
  watchQuery: ['page'],
  methods:{
      getData(){
         if((document.documentElement.clientHeight+document.documentElement.scrollTop)>=document.documentElement.scrollHeight&&this.list.length<this.total){
           this.$axios.$get('topics',{params:{page:this.page,limit:10}})
             .then(async res=>{
               this.startIndex=this.list.length
               console.log('begin')
               await Promise.all(res.data.map(item=>this.$loadImageAsync(item.author.avatar_url)))//图片预加载
               console.log('end')
               this.list=this.list.concat(res.data)
               this.page++
               setTimeout(()=>{
                 this.sort()
               },0)
             })
         }
      },
      sort(){
         let nodeList=this.$refs.col
         for (let i =this.startIndex; i < nodeList.length; i++) {
           const domHeight = nodeList[i].offsetHeight;
           let top;
           let left;
           let itemH;
           if (leftH > rightH) {
             left = gap * 2 + this.waterfallW;
             top = rightH + gap;
             itemH = domHeight;
             rightH += gap + domHeight;
           } else {
             left = gap;
             top = leftH + gap;
             itemH = domHeight;
             leftH += gap + domHeight;
           }
           this.list[i].top = top;
           this.list[i].left = left;
           console.log(domHeight,top)
         }
       },

  }
}
</script>

<style lang="scss">
.container {
  /*margin: 0 auto;*/
  /*min-height: 100vh;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*text-align: center;*/
}
.content{
  position:relative;
  .item{
    position:absolute;
    border:1px solid;
    img{
      width:100%;
    }
  }
}

</style>

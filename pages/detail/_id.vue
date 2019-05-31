<template>
  <div>
    <h1>detail2</h1>
    <waterfall
      align="center"
      :line-gap="200"
      :min-line-gap="100"
      :max-line-gap="220"
      :single-max-width="300"
      :watch="list"
      ref="waterfall"
    >
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in list"
        :width="150"
        :height="item.height?item.height:200"
        :order="index"
        :key="item.id"
        move-class="item-move"
        ref="waterfall-item"
      >
          <p>{{item.title}}</p>
          <span>{{item.author?item.author.loginname:''}}</span>
          <img :src="item.author?item.author.avatar_url:''" alt="" >
      </waterfall-slot>
    </waterfall>
  </div>
</template>
<script>
  const gap=10;
  export default{
    data(){
      return {
        list:[1,2],
        waterfallW:0,
        grow: [3, 2, 1, 2],
        page:2
      }
    },
    //在服务端调用，因此network中看不到
    //Nuxt.js 会将 asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件
    asyncData(context){
      return context.$axios.$get('topics',{params:{page:1,limit:10}})
        .then(async res=>{
          res.data.forEach(item=>item.height=200)
          return {list:res.data}
        })
        .catch((e) => {
          context.error({ statusCode: 404, message: 'Post not found' })//你可以通过调用该方法来显示错误信息页面。params.statusCode 可用于指定服务端返回的请求状态码
        })
    },
    mounted(){
      this.waterfallW = (document.documentElement.clientWidth - 3*gap) / 2;

      window.addEventListener('scroll', ()=>{
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop + window.innerHeight >= document.body.clientHeight&&this.list.length < 39) {
            this.$axios.$get('topics', {params: {page: this.page, limit: 10}})
              .then(async res => {
                res.data[0].author.avatar_url='https://pic2.zhimg.com/50/v2-81fd08f7a3c896e4d216889f94d9643d_hd.jpg'
                await Promise.all(res.data.map(item => this.$loadImageAsync(item.author.avatar_url).then(img=>{item.height=img.height*this.waterfallW/img.width+50;console.log(img.height,this.waterfallW,img.width,item.height)})))//图片预加载
                this.list = this.list.concat(res.data)
              })
            this.page++
        }
      })
    },
    methods:{

    }
  }
</script>
<style lang="scss">
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .vue-waterfall-slot{
    border:1px solid;
    img{
      width:100%;
    }
  }
</style>

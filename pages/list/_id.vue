<template>
  <div>
    <h1>one</h1>
    <nuxt-link to="/list">back index</nuxt-link>
    <h2>{{id}}</h2>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        id:-1
      }
    },
    validate ({ params }) {
      // 必须是number类型
      return /^\d+$/.test(params.id)
    },
    async asyncData(context) {
      console.log(context,context.params.id)
    },
    mounted(){
      this.id=this.$route.params.id
    }
  }
</script>

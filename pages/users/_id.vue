<template>
  <div>{{id}}</div>
</template>
<script>
  export default{
    data(){
      return {
        id:-1
      }
    },
    mounted(){
      this.id=this.$route.params.id
    }
  }
</script>

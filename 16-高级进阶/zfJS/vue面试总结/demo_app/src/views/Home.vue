<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      demo:{
        a:{
          b:2
        }
      },
      newArr:[1,3,4,4]
    }
  },
  computed: {
    message(){
      return '哈哈'
    },
    fullName:{
      get:()=>{
        return '我是fullname'
      }
    }
  },
  // watch:{
  //   demo:{
  //     handler(newVal,oldVal){
  //       console.log(newVal,oldVal)
  //     },
  //     deep:true,
  //     immediate:true
  //   }
  // }
}
</script>

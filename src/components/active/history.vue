<template>
   <div>
      <bar class="nav nav-tabs clearfix">
         <bar-item path="/u/active/thisShop/"+any+"/info" v-on:path="path" label="历史"></bar-item>
      </bar>
      <router-view></router-view>
   </div>
</template>

<script>
   import Bar from './../Bar.vue'
   import BarItem from './../BarItem.vue'
   export default {
      route:{
         data({to,next}){
            this.any = to.param.any;
            this.path ="/u/active/thisShop/"+this.any+"/info";

         }
      },
      ready(){},
      data(){
         return {
            any:"",
            path:""
         }
      },
      components:{
         Bar,
         BarItem
      }
   }
</script>


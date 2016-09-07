<template>
   <div>
      <bar class="nav nav-tabs clearfix">
         <bar-item v-bind:path="'/u/active/thisShop/'+any+'/info'" label="历史"></bar-item>
      </bar>
      <router-view></router-view>
   </div>
</template>

<script>
   import Bar from './../Bar.vue'
   import BarItem from './../BarItem.vue'
   export default {
      ready(){
         this.any = this.$route.params.any;
      },
      data(){
         return {
            any:""
         }
      },
      components:{
         Bar,
         BarItem
      }
   }
</script>


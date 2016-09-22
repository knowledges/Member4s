<template>
   <div>
      <bar class="nav nav-tabs clearfix">
         <bar-item v-bind:path="'/u/manage/myOffer/find/0/'+any+'/info'" label="历史"></bar-item>
         <!--<a href="javascript:history.go(-1)" style="float: right;"><i></i>返回列表</a>-->
         <a href="javascript:history.go(-1);" class="goback G_f14"  style="float: right;"><i class="ui_icon_18 icon-new-uc icon-new-uc-goback"></i>返回列表</a>
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
<style>
   .icon-new-uc-goback{
      background-position: 0 -320px;
      margin-right: 6px;
   }
</style>


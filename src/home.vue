<template>
    <div class="body">
        <nav-head></nav-head>
        <div class="uc_container">
            <div class="GB_frame">
                <div class="UC_main_l">
                    <div class="uc_leftnav_group">
                        <sidebar-head></sidebar-head>
                        <sidebar-items></sidebar-items>
                    </div>
                </div>
                <div class="uc_main GB_main_r">
                    <div class="uc_main_wrapper">
                        <router-view  transition="back"></router-view>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerWrap">
            <nav-footd></nav-footd>
        </div>
    </div>
</template>
<script>
    import NavHead from './components/NavHead.vue'
    import NavFootd from './components/NavFootd.vue'
    import SidebarHead from './components/SidebarHead.vue'
    import SidebarItems from './components/SidebarItems.vue'
    import config from './config'
    import $ from 'jquery'
    export default {
        route:{
            data({to,next}){
                next();
            }
        },
        ready () {
        },
        data(){
            return {
                sessionid:''
            }
        },
        components: {
            NavHead,
            SidebarHead,
            SidebarItems,
            NavFootd
        }
    }
</script>
<style>
    @import 'assets/css/app.css';
    [v-cloak] {
        display: none;
    }
</style>
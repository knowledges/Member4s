import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router'
import VueValidator from 'vue-validator'
// import pullToRefresh from './directives/pullToRefresh'
// import infiniteScroll from './directives/infiniteScroll'
import * as filters from './filters'
import app from './main'

// Router
Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true,
  root:"/member4s"
})

routerConfig(router)

// // Resource
Vue.use(VueResource)
//
Vue.http.options.root = '/data/'
// Vue.http.options.emulateJSON = true

//Validator
Vue.use(VueValidator)

//只能输入数字
Vue.validator('integer',function (val) {
  return /^[1-9]\d*$/.test(val);
})

//由数字、26个英文字母或下划线和中文组成的字符串
Vue.validator('username',function (val) {
  return /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,10}$/.test(val);
})

//手机号
Vue.validator('tel',function (val) {
  return /^1[3|4|5|7|8]\d{9}$/.test(val)
})

//邮箱
Vue.validator('email',function (val) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
})


// Directive
// Vue.directive('pullToRefresh', pullToRefresh)
// Vue.directive('infiniteScroll', infiniteScroll)

// Filters
Vue.filter('date', filters.dateFilter)

router.start(app, '#app')

window.router = router

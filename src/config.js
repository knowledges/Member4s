/**
 * Created by qbl on 2016/8/25.
 */
export default {

    /**
     *  引入了 Layer Ui 里，
     *  里面有 弹出提示、弹出一个页面层
     *  查看 api : http://layer.layui.com/hello.html
     *   分页
     *   查看 api http://laypage.layui.com/doc.html  使用查看 cloneStore.vue
     */

    /**
     *  loading 模板
     *  引入 util.js import {loader} from '../util/util'
     *  mask.show() 显示
     *  mask.hide() 隐藏
     */

    /**
     *  表格 和分页
     * <mould-table :stats="stats" :judge="judge" :idx="idx" :explain="explain" :pagesize="pagesize"  :arr_title="arr_title" :arr_items="arr_items"></mould-table>
     <nav-pagination :cur="cur" :all="all" v-on:btn-click="listen"></nav-pagination>
     stats:0 没有 操作 按钮，1 有操作按钮
     judge：true 有 icon
     idx:icon 的下表 ，judge 是false 的时候，idx 是空
     explain：提示内容
     pagesize：展示多少条
     arr_title：table 标题
     arr_items 表格内容，表格copy 模板到自己的模块下，tbody 部分重写，
     cur:当前页
     all:总数
     */

    // API_BASE:"https://www.woodche.com/YchLrestServer/api",

    // API_BASE:"https://www.woodche.com/YchLrestServer_test/api",
    API_BASE:"http://192.168.13.111/YchLrestServer/api",
    // API_BASE:"http://192.168.13.105:3000/api",
    FILE_IMG:"http://test3.gouchehui.com:8082",
    // FILE_IMG:"http://www.gouchehui.com",
    SESSIONID:function () {
        return  JSON.parse(sessionStorage.getItem("SESSIONID"))!=null?JSON.parse(sessionStorage.getItem("SESSIONID")).session.sessionid:""
    },
    USERID:function () {
        return JSON.parse(sessionStorage.getItem("SESSIONID"))!=null?JSON.parse(sessionStorage.getItem("SESSIONID")).id:""
    }
}

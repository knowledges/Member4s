/**
 * Created by qbl on 2016/8/25.
 */
export default {

    /**
     *  ������ Layer Ui �
     *  ������ ������ʾ������һ��ҳ���
     *  �鿴 api : http://layer.layui.com/hello.html
     *   ��ҳ
     *   �鿴 api http://laypage.layui.com/doc.html  ʹ�ò鿴 cloneStore.vue
     */

    /**
     *  loading ģ��
     *  ���� util.js import {loader} from '../util/util'
     *  mask.show() ��ʾ
     *  mask.hide() ����
     */

    /**
     *  ��� �ͷ�ҳ
     * <mould-table :stats="stats" :judge="judge" :idx="idx" :explain="explain" :pagesize="pagesize"  :arr_title="arr_title" :arr_items="arr_items"></mould-table>
        <nav-pagination :cur="cur" :all="all" v-on:btn-click="listen"></nav-pagination>
     stats:0 û�� ���� ��ť��1 �в�����ť
     judge��true �� icon
     idx:icon ���±� ��judge ��false ��ʱ��idx �ǿ�
     explain����ʾ����
     pagesize��չʾ������
     arr_title��table ����
     arr_items ������ݣ����copy ģ�嵽�Լ���ģ���£�tbody ������д��
     cur:��ǰҳ
     all:����
     */

    //API_BASE:"https://www.woodche.com/YchLrestServer/api",

    API_BASE:"http://192.168.13.111/YchLrestServer/api",

    SESSIONID:"",
}
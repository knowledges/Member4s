import $ from 'jquery'
(function($){
  var manageValidate = function(){};
  manageValidate.fn = manageValidate.prototype={
    isEmptys:function (val) {
      return val == "" ? true : false;
    },
    isNumber:function(val){
      var regex = /^\d*$/;// 只能输入数字
      return regex.test(val) ? true : false;
    },
    isUser:function(val){
      var regex = /^[\u4e00-\u9fa5\w\d]{3,10}$/; //用户名可以匹配中文下划线数字字符6到16位
      return regex.test(val) ? true : false;
    },
    isMail:function(val){
      var regex = /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\.\\w+([-.]\\w+)*$/;
      return regex.test(val) ? true : false;
    },
    isUserPwd:function(val){
      var regex = /^\w{6,16}$/;//用户名只能是字母字符数组下划线6到16位
      return regex.test(val) ? true : false;
    }
  }
  window.validate = new manageValidate();

  var maskLoader = function(){};
  maskLoader.fn = maskLoader.prototype = {
    show:function(){
      var body = document.body;
      $(body).append('<div class="mask-model" style=" position: fixed; display: inline-block; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); top: 0;  left: 0; z-index: 999;"><img src="/img/loading.gif" style=" position: absolute;top: 50%; left: 50%;" alt="loading"/></div>')
    },
    hide:function(){
      $(".mask-model").remove();
    }
  }
  window.mask = new maskLoader();
})(jQuery);

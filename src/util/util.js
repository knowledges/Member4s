import config from './../config'
export  default {
  login:function(){
    var body = document.body;
    var str = '<div class="mask-model" style="display: inline-block;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.7);position: fixed;top: 0;z-index: 999;">'+
        '<div style="position: absolute;top: 25%;left: 50%;width: 350px;margin-left: -175px;">'+
        '<div style="position: relative;   width: 320px;padding: 25px 20px 20px;color: #6c6c6c;background: #fff;margin: 0 auto;">'+
        '<div style="position: relative;">'+
        '<div style="height: 18px;line-height: 18px;font-size: 16px;color: #333;margin-top: 2px;margin-bottom: 10px;padding: 10px 0;border-bottom: 1px solid #bdbdbd;">'+
        '<a href="javascript:;;" id="close" >&nbsp;&nbsp;&nbsp;&nbsp;</a>4S店账户'+
        '</div>'+
        '<!--错误信息提示-->'+
        '<div id="L_Message" style="display:none;width: 296px;margin: 8px 0;">'+
        '<div style="line-height: 34px;padding: 0 10px;overflow: hidden;width: 298px;background: #fef2f2;border: 1px solid;border-color: #f40a0a;background-color: #fee6e6;color: #f40a0a;">'+
        '<i style="display:inline-block;width: 16px;height: 16px;background: url(data:image/png;base64,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) no-repeat;background-position: -104px -49px;margin: 9px 6px 0 0;"></i>'+
        '<p class="error G_f12" style="display:inline-block;"></p>'+
        '</div>'+
        '</div>'+
        '<div style=" position: relative;margin-bottom: 16px;z-index: 1;   border: 1px solid #bdbdbd;height: 38px;width: 318px; z-index: 6;margin-bottom: 20px;">'+
        '<label for="J_logname"  style="position: absolute;z-index: 3;top: 0;left: 0;width: 38px;height: 38px;border-right: 1px solid #bdbdbd;background: url(data:image/png;base64,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) no-repeat; background-position: 0 0;" ></label>'+
        '<input id="J_logname" type="text" style=" line-height: 18px;border: 0;padding: 10px 0 10px 50px;width: 268px;float: none;overflow: hidden;font-size: 14px;outline: none;" name="user_name" tabindex="1" autocomplete="off" placeholder="4S店账户">'+
        '<span style=" position: absolute;z-index: 20;right: 6px;top: 12px;width: 14px;height: 14px;background: url(data:image/png;base64,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) -25px -143px no-repeat;cursor: pointer;display: none;"></span>'+
        '</div>'+
        '<div  style=" position: relative;margin-bottom: 16px;z-index: 1;border: 1px solid #bdbdbd;height: 38px;width: 318px;  height: 38px;margin-bottom: 15px;">'+
        '<label style=" position: absolute;z-index: 3;top: 0;left: 0;width: 38px;height: 38px;border-right: 1px solid #bdbdbd;background: url(data:image/png;base64,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) no-repeat;background-position: -48px 0;" for="J_logpwd"></label>'+
        '<input type="password" id="J_logpwd" name="password" style=" line-height: 18px;border: 0;padding: 10px 0 10px 50px;width: 268px;float: none;overflow: hidden;font-size: 14px;outline: none;" tabindex="2"autocomplete="off" placeholder="密码">'+
        '<span style=" position: absolute;z-index: 20;right: 6px;top: 12px;width: 14px;height: 14px;background: url(data:image/png;base64,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) -25px -143px no-repeat;cursor: pointer;display: none;"></span>'+
        '</div>'+
        '<div style=" position: relative;margin-bottom: 16px;z-index: 1;">'+
        '<div style="position: relative;color: #666;">'+
        '<span style=" margin-right: 15px;">'+
        '<input id="autologin" name="autologin" type="checkbox" style=" float: none;vertical-align: middle;_vertical-align: -1px;margin: 0 3px 0 0;padding: 0;" checked="checked">'+
        '<label for="autologin">自动登录</label>'+
        '</span>'+
        '<span class="forget-pw" style=" position: absolute;right: 0;top: 0;margin: 0;">'+
        '<a href="javascript:;;" class="forgetPwd" style="color: #999;" target="_blank">忘记密码</a>'+
        '</span>'+
        '</div>'+
        '</div>'+
        '<div  style=" position: relative;margin-bottom: 16px;z-index: 1;">'+
        '<button type="submit" id="loginClk" style="font-size:18px; width: 319px;height: 42px;border: 0;display: inline-block;overflow: hidden;vertical-align: middle;line-height: 42px;font-weight: 500;color: #fff;background: #ff791f;border-radius: 3px;cursor: pointer;zoom: 1;" class="login-btn G_f18" tabindex="5">登 录</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
    $(body).append(str);

    $("#loginClk").unbind("click").bind("click",function (e) {
        loginMethod();
    });

    $(".itxt").unbind("keyup").bind("keyup",function (e) {
      if (e.keyCode == 13){
        loginMethod();
      }
    });

   /* $("#close").unbind("click").bind("click",function (e) {
      $(".mask-model").hide().remove();
    });*/

    $(".forgetPwd").unbind("click").bind("click",function (e) {
        $(".error").text("请联系客服 400-138-0808");
        $("#L_Message").show();
    });

    function loginMethod() {
        var username = $("#J_logname").val(),password = $("#J_logpwd").val();

        if(username==""){
            $(".error").text("4S店账户不能为空");
            $("#L_Message").show();
            return;
        }else{
          $("#L_Message").hide();
        }

        if(password == ""){
          $(".error").text("密码不能为空");
          $("#L_Message").show();
          return;
        }else{
          $("#L_Message").hide();
        }

        var url = config.API_BASE+"/login/auth/4s/web";
        var param = {};
        param.username = username;
        param.password = password;

        var ii = layer.load(1, {
            content:'加载中......',
            shade: [0.1,'#fff'] //0.1透明度的白色背景
        });

      $.ajax({
        url:url,
        method:'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data:JSON.stringify(param)
      }).then(function (response) {
        if(response.code == 0){
          layer.msg('登录成功！');
          sessionStorage.setItem("SESSIONID",JSON.stringify(response.data));
          $(".mask-model").hide().remove();
            setTimeout(function () {
                window.history.go(0);
            },500);
        }else if (response.code == -1){
          $(".error").text(response.desc);
          $("#L_Message").show();
        }
          layer.close(ii);
      });
    }
  },
}



import config from './../config'
export  default {
  login:function(){
    var body = document.body;
    var str = '<div class="mask-model" style="display: inline-block;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.7);position: fixed;top: 0;z-index: 999;">'+
        '<div style="position: absolute;top: 25%;left: 50%;width: 350px;margin-left: -175px;">'+
        '<div style="position: relative;   width: 320px;padding: 25px 20px 20px;color: #6c6c6c;background: #fff;margin: 0 auto;">'+
        '<div style="position: relative;">'+
        '<div style="height: 18px;line-height: 18px;font-size: 16px;color: #333;margin-top: 2px;margin-bottom: 10px;padding: 10px 0;border-bottom: 1px solid #bdbdbd;">'+
        '<a href="javascript:;;" id="close" title="关闭" style="float: right;color: #ff791f;font-size: 14px;">关闭</a>账户登录'+
        '</div>'+
        '<!--错误信息提示-->'+
        '<div id="L_Message" style="display:none;width: 296px;margin: 8px 0;">'+
        '<div style="line-height: 34px;padding: 0 10px;overflow: hidden;width: 298px;background: #fef2f2;border: 1px solid;border-color: #f40a0a;background-color: #fee6e6;color: #f40a0a;">'+
        '<i style="display:inline-block;width: 16px;height: 16px;background: url(../img/pwd-icons-new.png) no-repeat;background-position: -104px -49px;margin: 9px 6px 0 0;"></i>'+
        '<p class="error G_f12" style="display:inline-block;"></p>'+
        '</div>'+
        '</div>'+
        '<div style=" position: relative;margin-bottom: 16px;z-index: 1;   border: 1px solid #bdbdbd;height: 38px;width: 318px; z-index: 6;margin-bottom: 20px;">'+
        '<label for="J_logname"  style="position: absolute;z-index: 3;top: 0;left: 0;width: 38px;height: 38px;border-right: 1px solid #bdbdbd;background: url(../img/pwd-icons-new.png) no-repeat; background-position: 0 0;" ></label>'+
        '<input id="J_logname" type="text" style=" line-height: 18px;border: 0;padding: 10px 0 10px 50px;width: 268px;float: none;overflow: hidden;font-size: 14px;outline: none;" name="user_name" tabindex="1" autocomplete="off" placeholder="手机号">'+
        '<span style=" position: absolute;z-index: 20;right: 6px;top: 12px;width: 14px;height: 14px;background: url(../img/pwd-icons-new.png) -25px -143px no-repeat;cursor: pointer;display: none;"></span>'+
        '</div>'+
        '<div  style=" position: relative;margin-bottom: 16px;z-index: 1;border: 1px solid #bdbdbd;height: 38px;width: 318px;  height: 38px;margin-bottom: 15px;">'+
        '<label style=" position: absolute;z-index: 3;top: 0;left: 0;width: 38px;height: 38px;border-right: 1px solid #bdbdbd;background: url(../img/pwd-icons-new.png) no-repeat;background-position: -48px 0;" for="J_logpwd"></label>'+
        '<input type="password" id="J_logpwd" name="password" style=" line-height: 18px;border: 0;padding: 10px 0 10px 50px;width: 268px;float: none;overflow: hidden;font-size: 14px;outline: none;" tabindex="2"autocomplete="off" placeholder="密码">'+
        '<span style=" position: absolute;z-index: 20;right: 6px;top: 12px;width: 14px;height: 14px;background: url(../img/pwd-icons-new.png) -25px -143px no-repeat;cursor: pointer;display: none;"></span>'+
        '</div>'+
        '<div style=" position: relative;margin-bottom: 16px;z-index: 1;">'+
        '<div style="position: relative;color: #666;">'+
        '<span style=" margin-right: 15px;">'+
        '<input id="autologin" name="autologin" type="checkbox" style=" float: none;vertical-align: middle;_vertical-align: -1px;margin: 0 3px 0 0;padding: 0;" checked="checked">'+
        '<label for="autologin">自动登录</label>'+
        '</span>'+
        '<span class="forget-pw" style=" position: absolute;right: 0;top: 0;margin: 0;">'+
        '<a href="http://www.gouchehui.com/member.php/Public/findpw_verification.html" style="color: #999;" target="_blank">忘记密码</a>'+
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

    $("#close").unbind("click").bind("click",function (e) {
      $(".mask-model").hide().remove();
    });

    function loginMethod() {
        var username = $("#J_logname").val(),password = $("#J_logpwd").val();

        if(username==""){
            $(".error").text("手机号不能为空");
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
  }
}



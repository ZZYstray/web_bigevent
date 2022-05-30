$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  //引入layui 的form
  const form = layui.form;
  //引入layer 
  const layer = layui.layer;
  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: (val) => {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        const pwd = $(".reg-box [name=password").val();
        if(pwd !== val) return "两次密码不一致"
    },
  });
  //注册功能
  //定义根路径
  // const baseUrl = 'http://www.liulongbin.top:3007';
  //发送ajax请求
  $('#form_reg').on('submit',e =>{
    //阻止表单提交的默认行为
    e.preventDefault();
    //发送ajax请求  
    $.ajax({
      type:'POST',
      url:'/api/reguser',
      data:{
        username:$("#form_reg [name=username").val(),
        password: $("#form_reg [name=password").val(),
      },
      success: res =>{
        if(res.status !==0) return layer.msg('注册失败')
        layer.msg('注册成功！');
        // 注册成功后跳转到登录界面
        $("#link_login").click();

      },
    })
  })
  //登录功能
  $('#form_login').on('submit',function(e){
    //阻止表单默认提交
    e.preventDefault();
    //发送ajax请求
    $.ajax({
      type:'POST',
      url:'/api/login',
      data:$(this).serialize(),
      success:res=>{
        // console.log(res);
        if(res.status !==0) return layer.msg('登录失败');
        layer.msg('登录成功！');
        //将请求得到的身份令牌储存到本地
        localStorage.setItem('token',res.token);
        //跳转回到主页
        // location.href = '/index.html';
        
        location.pathname = '/index.html';
      }
    })
  })
});
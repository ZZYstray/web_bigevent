//发送请求获取数据渲染页面
function getUserInfo(){
    $.ajax({
        type:"GET",
        url:'/my/userinfo',
        data:null,
        /* headers: {
            Authorization:localStorage.getItem("token")
        }, */
        success:res=>{
            // console.log(res);
            //判断
            if(res.status !==0) return layer.msg('获取用户信息失败')
            layer.msg('获取用户信息成功')
            //调用渲染函数
            renderAvatar(res.data)
        }
    })
    
}
//调用请求函数
getUserInfo()

//封装渲染函数
function renderAvatar(user) {
    // console.log(user);
    let uname = user.nickname || user.username;
    // 渲染欢迎语
    $('#welcome').html(`欢迎您：${uname}`)
    //渲染用户头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic);
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(uname[0].toUpperCase());
    }
}

//退出功能
$("#btnlogout").click(()=>{
    layui.layer.confirm("确定退出登录？",{ icon: 3, title: "提示" },function (index) {
        // 清空本地存储里面的 token
        localStorage.removeItem("token");
        // 重新跳转到登录页面
        location.href = "/login.html";
    });
})

function change(){
    $('#change').attr('class','layui-this').next().attr('class','');
}



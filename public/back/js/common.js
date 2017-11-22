


//进度条功能

NProgress.configure({showSpinner:false});
    // 注册一个全局的ajaxStatus事件 所有的ajax在开启的
    // 时候,会触发这个事件
    $(document).ajaxStart(function(){
        //开启进度条
        NProgress.start();
    });

    $(document).ajaxStop(function(){
        //完成进度条
        setTimeout(function() {
            NProgress.done();
        }, 500);
    })


    //非登录页面  判断当前用户是否登录  如果登录继续  如果没有就返回登录页面

    if(location.href.indexOf("login.html")==-1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(data){
                
                
                if(data.error===400){
                    // 说明用户没登录跳转向登录页
                    location.herf="login.html";
                    
                }
            }
        })
    }



    //二级分类显示隐藏功能
$('.child').prev().on('click',function(){
    $(this).next().slideToggle();
})



//实现主体增大侧边栏减小功能


$('.main-menu').on('click',function(){
    $('.main').toggleClass("now");
    $('.sade').toggleClass("now");
})


//实现退出功能
$('.main-logout').on('click',function(){
    $('.modal').modal('show');
    $(".btn-logout").off().on("click",function(){
        $.ajax({
            type:'get',
            url:"/employee/employeeLogout",
            success:function(data){
                console.log(data.success)
                if(data.success){
                    location.href="login.html";
                }
            }
        })
    })
})
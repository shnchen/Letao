$(function () {
    //功能要求
    // 1.用户名不为空
    // 2.密码不为空
    // 3.用户名长度6-12
    //使用表格验证插件
    $('form').bootstrapValidator({
        //配置校验的图标
        feedbackIcons:{
            //成功是
            // valid:'glyphicon glyphicon-ok',
            // invalid:'glyphicon glyphicon-remove',
            // validdating:'glyphicon glyphicon-refresh'
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //配置校验规则

        fields: {
            //username 对应表单的 name属性
            username: {
                // username的规则
                validators:{
                    notEmpty: {
                        message: "用户名不为空"
    
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
                password: {
                    
                            //password的规则
                            validators: {
                              notEmpty: {
                                message: "用户密码不能为空"
                              },
                              stringLength: {
                                min: 6,
                                max: 12,
                                message: "密码长度是6-12位"
                              },
                              callback: {
                                message:"密码错误"
                              },
                              callback:{
                                  message:"密码错误"
                              }
                            }
                    
                          }
            }
        
    });
    //给表单注册校验事件  success.form.bv
    $('form').on('success.form.bv', function (e) {
        //阻止浏览器默认行为;
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: "POST",
            url: "/employee/employeeLogin",
            data: $('form').serialize(),
            dataType: "json",
            success: function (data) {
                // console.log(data)
                if (data.success == true) {
                    
                    location.href="index.html";

                } else if (data.error == 1000) {
                    // console.log("用户名不存在!")
                    //手动调用方法 updataStatus让username验证失败
                    //第一个参数:改变那个字段
                    //第二个参数:改成什么状态 VALID:通过INVALID:不通过
                    //第三个参数:选择提示什么信息
                    $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                } else if (data.error == 1001) {
                    // console.log("密码错误！")
                    $('form').data('bootstrapValidator').updateStatus('password',"INVALID","callback")
                }

            }
        })
    });

$("[type=reset]").on('click',function(){
   $('form').data('bootstrapValidator').resetForm();
   
})
})
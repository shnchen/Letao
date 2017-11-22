$(function(){
var currentPage=1;
var pageSize=5;
//发送ajax请求
function render(){
    $.ajax({
        type:"get",
        url:"/user/queryUser",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(info){
            
            var html=template('tel',info);
            $('.main-body>table>tbody').html(html);
                //添加分页渲染
$('#paginator').bootstrapPaginator({
    bootstrapMajorVersion:3,
    currentPage:currentPage,
    totalPages:Math.ceil(info.total/pageSize),
    onPageClicked:function(a,b,c,page){
        currentPage=page;
        render();
    }

})
        }
        
    });//完成渲染

}; render();

//开启禁用功能
$(".tbody").on('click',".btn",function(){
   
$('.modal_btn').modal('show');
//获取对应的id
var id =$(this).parent().data('id');
var isDelete=$(this).hasClass("btn-danger")?0:1;
//给确定按钮注册事件
$('.btn-confirm').off().on('click',function (){
    //发送ajax请求
    $.ajax({

        type:'post',
        url:'/user/updateUser',
        data:{
            id:id,
            isDelete:isDelete
        },
        success:function(info){
            console.log(info)
            if(info.success){//关闭模态框

                $('.modal_btn').modal('hide')
                //重新渲染页面
               render();           
             }
        }
    });
})
})


})
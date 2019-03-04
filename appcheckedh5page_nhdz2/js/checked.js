
var checkeduserinfo={
    "username":"",
    "userid":"",
    "userhead":"",
    "word":"",
    "level":"",
    "mes":"",//审核数
    "dvalue":"",//下一级差值
    "picup":"1",//升级图片
    "checknum":"",//升级图片
};


    $(function(){
      //  getcheckeduser();
    });
/*获取审核用户信息*/
    function getcheckeduser(){
          let tjdatas={};
         tjdatas=JSON.stringify(tjdatas);
           $.ajax({
               url : path+'/content/uploadAContentByUser.do',
               cache:true,//false就不会从浏览器缓存中加载请求信息了
               type:"POST",
               contentType: "application/json",
               dataType:"JSON",
               async:false,
               data: tjdatas,
               error: function(data){
                   layer.msg("网络有问题！！",{
                       offset:['50%'],
                       time: 1500 //2秒关闭（如果不配置，默认是3秒）
                   })
                   //console.log("提交图片/视频流失败：");
                   //console.log(data);
               },
               success:function(diskJson){
                   layer.closeAll();
                   // console.log("提交审核：");
                   //  console.log(diskJson);
                   if(diskJson.code =="1000"){

                   }else{
                       layer.msg("网络有问题，请重试！！",{
                           offset:['50%'],
                           time: 1500 //2秒关闭（如果不配置，默认是3秒）
                       });
                   }

               }
           });
    }
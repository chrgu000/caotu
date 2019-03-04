
/*弹出一键生成评论*/
$("#creatCommentBtn").click(function(){
    layer.open({
        type: 1,
        title: '一键生成评论',
        shadeClose: true,
        maxmin: true, //开启最大化最小化按钮
        shade: 0.8,
        area: ['450px', '280px'],
        content: $("#creatCommentBox"), //iframe的url
        success: function (layero, index) {

        }
    });
});

function creatComentSure(){
    let commentlibtagid=$("#comentTags").val();
    let commentnum=Number($("#creatComentNum").val());
    let tjdatas={"commentlibtagid":commentlibtagid,"commentnum":commentnum};
    tjdatas=JSON.stringify(tjdatas);
    $.ajax({
        url : path+'/commentlib/onekeycommennt.do',
        cache:true,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:false,
        data: tjdatas,
        error: function(data){

            layer.msg("评论生成失败，请重试！！")
        },
        success:function(diskJson){

            console.log("生成评论：：");
            console.log(diskJson);
            if(diskJson.code ==1000){
                if(diskJson.data.rows.length >0){
                    let comdata=diskJson.data.rows;

                    let goods=0;
                    let contentid=$("#mainCont").attr("data-id");//内容ID
                    let createtime=getmytime();
                    let commenturltype="";
                    let userselectlen=Number($("#myNameSelect option").length)-1;
                    $.each(comdata,function(i,n){
                        let ui=randomnum(0,userselectlen);
                        let userid=$("#myNameSelect option:eq("+ui+")").val();
                        let username=$("#myNameSelect option:eq("+ui+")").text();
                        let userHead=$("#myNameSelect option:eq("+ui+")").attr("data-head");
                        let commentid=genID(22);//评论ID
                        let fetcomurl=JSON.parse(n.commenturl);
                        if(fetcomurl.length >0){
                            commenturltype=fetcomurl[0].type;
                        }else{
                            commenturltype=5;
                        }
                        let comtext={ "addnew":1,"commentid":commentid,"userid":userid,"replyuser":"","ruusername":"","commentreply":1,"userheadphoto":userHead,"username":username,"contentid":contentid,"commenttext":n.commenttext, "commentgood":goods,"replycomment":"","replyfirst":commentid,"createtime":createtime,childList:[],"commenturl":fetcomurl,"commenturltype":commenturltype,"user":{"usertype":0},"selfaddatr":{"firstcommentgood":goods,"addcommentval":0}};
                        let comtext2={ "addnew":1,"commentid":commentid,"userid":userid,"replyuser":"","ruusername":"","commentreply":1,"userheadphoto":userHead,"username":username,"contentid":contentid,"commenttext":n.commenttext, "commentgood":goods,"replycomment":"","replyfirst":commentid,"createtime":createtime,"commenturl":fetcomurl,"commenturltype":commenturltype,"user":{"usertype":0},"selfaddatr":{"firstcommentgood":goods,"addcommentval":0}};
                        usertalk.items.push(comtext);
                        usertalk.postcommentlist.push(comtext2);
                        // console.log(usertalk.postcommentlist);
                    });
                    talknum=talknum+commentnum;
                    $("#talkAboutBox .talkNum").html(talknum);
                    layer.msg("已生成"+comdata.length+"条评论！！");
                }else{
                    layer.msg("该标签下尚无预备评论！！")
                }
            }else{
                layer.msg("评论生成失败，请重试！！")
            }
        }
    });
}

/*关闭layer弹窗*/
function closelayerall(){
    layer.closeAll();
}

/*标签列表获取*/
function getlabellist(dataval,searchid){
    var datapost={"taglevel":2,"pageno":1,"pagesize":999,"tagname":dataval};
    datapost=JSON.stringify(datapost);
    $.ajax({
        url : path2+'/tag/taglist.do',
        cache:true,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:false,
        data: datapost,
        //data: {taglevel:3,pageno:1,pagesize:999},
        error: function(data){
            layer.msg("服务器未响应,请稍后再试!");
            ////console.log("标签列表获取失败：");
            ////console.log(data);
        },
        success:function(diskJson){
//                //console.log("标签列表获取：");
//                //console.log(diskJson);

            if(searchid ==0){
                $(".searchSecondMenu").empty();
                $("#comentTags").empty();
                $.each(diskJson.data.rows,function(i,n){
                    $("#comentTags").append('<option value="'+ n.tagid+'">'+ n.tagname+'</option>')
                    if(n.tagid&&n.tagid !=null && n.tagname && n.tagname!=null){
                        $(".searchSecondMenu").append(' <li data-val="'+ n.tagid+'">'+ n.tagname+'</li>');
                    }
                });
            }else{
                var searid="#"+searchid;
                $(searid).siblings(".searchSecondMenu").empty();
                $.each(diskJson.data.rows,function(i,n){
                    if(n.tagid&&n.tagid !=null && n.tagname && n.tagname!=null){
                        $(searid).siblings(".searchSecondMenu").append(' <li data-val="'+ n.tagid+'">'+ n.tagname+'</li>');
                    }
                });

            }
        }
    });
}
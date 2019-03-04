
/*----------------二次编辑提交内容统一方法------------*/

var contentDatasurllist="";//内容链接（视频，图片地址）
var fileslist=[];//图片流
var iffilechange=1;//图片是否有替换或旋转:2视频替换，3图片旋转
var fielchangelist=[];//图片旋转改变的得到的云链接
/*品论区*/
var usertalk = new Vue({
    el: '#commentSectionBox',
    data: {
        items: [],
        postcommentlist:[],
        oldcommenttext:[]
    },
    computed: {

    },
    // 在 `methods` 对象中定义方法
    methods: {
        goods: function (event,i) {
            if(event.user.usertype == 0 && event.addnew && event.addnew ==1){
                console.log(event);
                this.items[i].commentgood++;
                changecomgoods(event.commentid,1)
            }
        },
        callgoods:function (event,i,d) {

            if(event.user.usertype == 0 && event.addnew && event.addnew ==1){
                console.log(event);
                this.items[i].childList[d].commentgood++;
                changecomgoods(event.commentid,1)
            }
        },
        oldComAddGood:function (event,i){
            // console.log(event);
          /*  if(event.user.usertype == 1 ){
                event.commentgood=Number(event.selfaddatr.addcommentval)+Number(event.commentgood);
            }else if(event.addnew && event.addnew ==1){
                event.commentgood=Number(event.selfaddatr.addcommentval)+Number(event.commentgood);
            }*/
            event.commentgood=Number(event.selfaddatr.addcommentval)+Number(event.commentgood);
            event.selfaddatr.addcommentval=0;
            let addgood=event.commentgood-event.selfaddatr.firstcommentgood;
            if(event.addnew && event.addnew ==1){
                changecomgoods(event.commentid,addgood)
            }else{
                this.oldcommenttext[event.commentid]={"commentid":event.commentid,"userid":event.userid,"commentgood":addgood}
                console.log(this.oldcommenttext)
            }

        },
        reloldComAddGood:function (event,i,d){
            // console.log(event);
           /* if(event.user.usertype == 1 ){
                event.commentgood=Number(event.selfaddatr.addcommentval)+Number(event.commentgood);
            }else if(event.addnew && event.addnew ==1){
                event.commentgood=Number(event.selfaddatr.addcommentval)+Number(event.commentgood);
            }*/
            event.commentgood=Number(event.selfaddatr.addcommentval)+Number(event.commentgood);
            event.selfaddatr.addcommentval=0;
            let addgood=event.commentgood-event.selfaddatr.firstcommentgood;
            if(event.addnew && event.addnew ==1){
                changecomgoods(event.commentid,addgood)
            }else{
                this.oldcommenttext[event.commentid]={"commentid":event.commentid,"userid":event.userid,"commentgood":addgood};
                console.log(this.oldcommenttext)
            }

        },
        backtalk:function(event,i){
            var callid=this.items[i].userid;
            var callname=this.items[i].username;
            $("#commontsSrBox").attr("data-type",1);
            $("#commontsSrBox").attr("data-list",i);
            $("#commontsSrBox").attr("data-list2","");
            $("#myComments").attr("placeholder","回复"+callname+"：")
        },
        backcalltalk:function(event,i,d){
            var callid=this.items[i].childList[d].userid;
            var callname=this.items[i].childList[d].username;
            $("#commontsSrBox").attr("data-type",2);
            $("#commontsSrBox").attr("data-list",i);
            $("#commontsSrBox").attr("data-list2",d);
            $("#myComments").attr("placeholder","回复"+callname+"：")
        },
        showimg: function (event,i,type) {
            //  console.log(event);
            // console.log(i);
            /*------自定义的图片左右切换-----------*/
            $("#faxAllBox").addClass("show");
            $("#faxAllBox ul").empty();
            $("#faxAllBox .toptip b.all").html(event.length);
            $("#faxAllBox .toptip b.pre").html(i+1);
            var w=$(window).width();
            var w2=w*event.length+"px";
            $("#faxAllBox ul").css("width",w2);
            var stw='width:'+w+"px";
            $.each(event,function(c,t){
                if(type==1){
                    if(c==i){
                        $("#faxAllBox ul").append('<li style="'+stw+'" class="show" data-type="'+(c+1)+'"><div class="simgbox"><span class="simgspan"><img src="'+ t.info+'" alt=""/></span></div> </li>');
                    }else{
                        $("#faxAllBox ul").append('<li style="'+stw+'" data-type="'+(c+1)+'"><div class="simgbox"><span class="simgspan"><img src="'+ t.info+'" alt=""/></span></div> </li>');
                    }
                }else{
                    $("#faxAllBox ul").append('<li style="'+stw+'" class="show" data-type="'+(c+1)+'"><div class="simgbox movieShowBox"><video src="'+ t.info+'" controls="controls"></video></div> </li>');
                }

            })
        },
        comdelete:function(event,i){//删除评论
            console.log(event);
            layer.confirm('确定删除该评论吗？', {
                btn: ['确定','取消'] //按钮
            }, function(index){
                //console.log(recondlist.chooselistnum);
                let comid= event.commentid;
                usertalk.items.splice(i,1);
                // console.log(usertalk.postcommentlist);
                let lastpostcommentlist=[];
                $.each(usertalk.postcommentlist,function(c,n){
                    if(n.replyfirst!=comid){
                        lastpostcommentlist.push(usertalk.postcommentlist[c]);
                    }
                });
                usertalk.postcommentlist=lastpostcommentlist;
                if(event.childList && event.childList.length>0){
                    talknum=talknum-event.childList.length;
                }
                talknum--;
                $("#talkAboutBox .talkNum").html(talknum);
                // console.log("usertalk.postcommentlist：：");
                // console.log(usertalk.postcommentlist);
                layer.close(index);
            }, function(index){
                layer.close(index);
            });


        },
        comdelete2:function(event,i,d){//删除评论
            console.log(event);
            let comid= event.commentid;
            $.each(usertalk.postcommentlist,function(c,n){
                if(n.commentid==comid){
                    usertalk.postcommentlist.splice(c,1);
                    return false;
                }
            });
            console.log("usertalk.postcommentlist：：");
            console.log(usertalk.postcommentlist);
            this.items[i].childList.splice(d,1);
            talknum--;
            $("#talkAboutBox .talkNum").html(talknum);

        }
    }
});

//已发送评论改变赞数
function changecomgoods(cmd,addnum) {
    $.each(usertalk.postcommentlist,function(i,n){
        if(n.commentid == cmd){
            usertalk.postcommentlist[i].commentgood+=addnum;
        }
    })
}

/*去除oldcommenttext中的null元素*/
function replacenull() {
    let getlist=[];
    for(key in usertalk.oldcommenttext){
      //  console.log(key); //key 获取的是键名
        getlist.push(usertalk.oldcommenttext[key])
    }
    return getlist;


}

/*NH通过内容id获取评论*/
function getcommentlistdatas(contentid){
    var datapost={"contentid":contentid};
    datapost=JSON.stringify(datapost);
    $.ajax({
        url : path2+'/content/commentList.do',
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
            // //console.log("NH通过内容id获取评论：");
            // //console.log(diskJson);
            $("#commentlistBox ul").empty();
            if(diskJson.data && diskJson.data.rows.length >0){
                $.each(diskJson.data.rows,function(i,n){
                    $("#commentlistBox ul").append("<li>"+n.commenttext+"</li>")
                })
            }
        }
    });
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
/*标签搜索框焦点事件*/
$("#detailCon .searchMenu .searchTag").focus(function(){
    $(this).siblings(".searchSecondMenu").addClass("show");
});
$("#detailCon .searchMenu .searchTag").blur(function(){
    var searchid=$(this).attr("id");
    setTimeout(function(){
        $("#"+searchid).siblings(".searchSecondMenu").removeClass("show");
    },500);

});
/*标签选择*/
$("#detailCon .searchMenu .searchSecondMenu").delegate("li","click",function(){
    let txt=$(this).html();
    let dataval=$(this).attr("data-val");
    $(this).parent(".searchSecondMenu").siblings(".searchTag").val(txt).attr("data-val",dataval);
});
/*搜索框键盘输入*/
$("#detailCon .searchMenu .searchTag").keyup(function(){
    $(this).attr("data-val","");
    var dataval=$(this).val();
    var searchid=$(this).attr("id");
    getlabellist(dataval,searchid)

});
$("#detailCon .searchMenu .searchTag").keydown(function(event) {
    if (event.keyCode == 13) {
        $(this).attr("data-val","");
        var dataval=$(this).val();
        var searchid=$(this).attr("id");
        getlabellist(dataval,searchid);
    }
});

/*马甲用户列表获取*/
function getpush(){
    var createuser=userdatas.data.userid;
    var tjdatas={"followid":"","type":1,"userid":createuser};
    tjdatas=JSON.stringify(tjdatas);
    $.ajax({
        url : path2+'/vest/getAllVestuserList.do',
        cache:true,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:false,
        data: tjdatas,
        //data: {taglevel:3,pageno:1,pagesize:999},
        error: function(data){
            layer.msg("服务器未响应,请稍后再试!");
            ////console.log("马甲用户列表失败：");
            ////console.log(data);
        },
        success:function(diskJson){
            //console.log("马甲用户列表获取：");
            //console.log(diskJson);
             $("#checkpublisher").empty();
            $("#myNameSelect").empty();
            if(diskJson.data.length >0){
                $.each(diskJson.data,function(i,n){
                    if(n.isused==1){
                         $("#checkpublisher").append(' <option value="'+ n.userid+'">'+ n.username+'</option>');
                        $("#myNameSelect").append(' <option  data-head="'+n.userheadphoto+'" value="'+ n.userid+'">'+ n.username+'</option>');
                    }

                })
            }



        }
    });
}

/*推荐队列最大页码*/
function getrubbigsetpige(type){
    $("#recommendPageSelect").empty();

    $("#recommendItemSelect").empty();
    if(type == 3 ){
        $("#recommendPageSelect").append(' <option value="">请选择</option>');
        $("#recommendItemSelect").append(' <option value="">请选择</option>');
        for(var i=0;i<100;i++){
            $("#recommendPageSelect").append(' <option value="'+(i+1)+'">第'+(i+1)+'页</option>');
        }
        for(var i=0;i<6;i++){
            $("#recommendItemSelect").append(' <option value="'+(i)+'">第'+(i+1)+'条</option>');
        }
    }else{
        getrubbigsetpige2();
    }

}

function getrubbigsetpige2(){
    var tjdatas={"YES":1,};
    tjdatas=JSON.stringify(tjdatas);
    $.ajax({
        url : path2+'/pushbakcontrol/queryAllPageSize.do',
        cache:true,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:false,
        data: tjdatas,
        error: function(data){
            layer.msg("服务器未响应,请稍后再试!");
            ////console.log("马甲用户列表失败：");
            ////console.log(data);
        },
        success:function(diskJson){
            //console.log("推荐队列最大页码：");
            //console.log(diskJson);
            $("#recommendPageSelect").empty();
            $("#recommendItemSelect").empty();
            // $("#recommendPageSelect").append(' <option value="">请选择</option>');
            let pagenum=parseInt(diskJson.data);
            for(var i=0;i<=pagenum;i++){
                $("#recommendPageSelect").append(' <option value="'+(i+1)+'">第'+(i+1)+'页</option>');
            }
            for(var i=0;i<6;i++){
                $("#recommendItemSelect").append(' <option value="'+(i)+'">第'+(i+1)+'条</option>');
            }
        }
    });
}

/*发送*/
var talknum=0;
function enterd(){
    var text= $("#myComments").val();
    text= $.trim(text);
    if(text == "" && dataArr==""){
        layer.msg("发送内容不能为空！");
    }else{
        layer.msg("上传中。。。。");
        var commenturl=[];
        var commenturltype="";
        //发送图片
        if(dataArr.length >0){
            //return alert('请先选择文件');
            commenturl=send();
            commenturltype=typefile;
            //send();
        }
        var userid=$("#myNameSelect").val();
        var username=$("#myNameSelect option:checked").text();
        var userHead=$("#myNameSelect option:checked").attr("data-head");
        var lvty= $("#commontsSrBox").attr("data-type");
        var index= $("#commontsSrBox").attr("data-list");
        var index2= $("#commontsSrBox").attr("data-list2");
        var goods=Number($("#mySetNum").val());
        var commentid=genID(22);//评论ID
        // var contentid=genID(22);//内容ID
        var contentid=$("#mainCont").attr("data-id");//内容ID
        var createtime=getmytime();

        /*  usertalk.postcommentlist.push(
              {
                  "commentid":commentid,
                  "userid":userid,
                  "replyuser":replyuser,
                  "ruusername":ruusername,
                  "commentreply":0,
                  "userheadphoto":userHead,
                  "username":username,
                  "contentid":contentid,
                  "commenttext":text,
                  "commentgood":goods,
                  "replycomment":replycomment,
                  "replyfirst":replycomment,
                  "createtime":createtime,
                  "commenturl":commenturl,
                  "commenturltype":commenturltype
              });*/
        if(lvty ==0){
            let comtext={ "addnew":1,"commentid":commentid,"userid":userid,"replyuser":"","ruusername":"","commentreply":1,"userheadphoto":userHead,"username":username,"contentid":contentid,"commenttext":text, "commentgood":goods,"replycomment":"","replyfirst":commentid,"createtime":createtime,childList:[],"commenturl":commenturl,"commenturltype":commenturltype,"user":{"usertype":0},"selfaddatr":{"firstcommentgood":goods,"addcommentval":0}};
            let comtext2={ "addnew":1,"commentid":commentid,"userid":userid,"replyuser":"","ruusername":"","commentreply":1,"userheadphoto":userHead,"username":username,"contentid":contentid,"commenttext":text, "commentgood":goods,"replycomment":"","replyfirst":commentid,"createtime":createtime,"commenturl":commenturl,"commenturltype":commenturltype,"user":{"usertype":0},"selfaddatr":{"firstcommentgood":goods,"addcommentval":0}};
            usertalk.items.push(comtext);
            usertalk.postcommentlist.push(comtext2);
        }else if(lvty ==1){
            var replyuser=usertalk.items[index].userid;
            var ruusername=usertalk.items[index].username;
            var replycomment =usertalk.items[index].commentid;
            let comtext={ "addnew":1,"commentid":commentid,"userid":userid,"replyuser":replyuser,"ruusername":ruusername,"commentreply":0,"userheadphoto":userHead,"username":username,"contentid":contentid,"commenttext":text, "commentgood":goods,"replycomment":replycomment,"replyfirst":replycomment,"createtime":createtime,"commenturl":commenturl,"commenturltype":commenturltype,"user":{"usertype":0},"selfaddatr":{"firstcommentgood":goods,"addcommentval":0}}
            let comtext2={ "addnew":1,"commentid":commentid,"userid":userid,"replyuser":replyuser,"ruusername":ruusername,"commentreply":0,"userheadphoto":userHead,"username":username,"contentid":contentid,"commenttext":text, "commentgood":goods,"replycomment":replycomment,"replyfirst":replycomment,"createtime":createtime,"commenturl":commenturl,"commenturltype":commenturltype,"user":{"usertype":0},"selfaddatr":{"firstcommentgood":goods,"addcommentval":0}}
            usertalk.items[index].childList.push(comtext2);
            usertalk.postcommentlist.push(comtext);
        }else if(lvty ==2){
            var replyuser=usertalk.items[index].childList[index2].userid;
            var ruusername=usertalk.items[index].childList[index2].username;
            var replycomment =usertalk.items[index].childList[index2].commentid;
            var replyfirst =usertalk.items[index].commentid;
            let comtext={ "addnew":1,"commentid":commentid,"userid":userid,"replyuser":replyuser,"ruusername":ruusername,"commentreply":0,"userheadphoto":userHead,"username":username,"contentid":contentid,"commenttext":text, "commentgood":goods,"replycomment":replycomment,"replyfirst":replyfirst,"createtime":createtime,"commenturl":commenturl,"commenturltype":commenturltype,"user":{"usertype":0},"selfaddatr":{"firstcommentgood":goods,"addcommentval":0}};
            let comtext2={ "addnew":1,"commentid":commentid,"userid":userid,"replyuser":replyuser,"ruusername":ruusername,"commentreply":0,"userheadphoto":userHead,"username":username,"contentid":contentid,"commenttext":text, "commentgood":goods,"replycomment":replycomment,"replyfirst":replyfirst,"createtime":createtime,"commenturl":commenturl,"commenturltype":commenturltype,"user":{"usertype":0},"selfaddatr":{"firstcommentgood":goods,"addcommentval":0}};
            usertalk.items[index].childList.push(comtext);
            usertalk.postcommentlist.push(comtext2);
        }
        $("#commontsSrBox").attr("data-type",0);
        $("#myComments").val("");
        $("#mySetNum").val(0);
        talknum++;
        $("#talkAboutBox .talkNum").html(talknum);
        $("#myComments").attr("placeholder","");
        layer.msg("发送成功。。。。");
        console.log("usertalk.postcommentlist：：");
        console.log(usertalk.postcommentlist);
        //console.log(usertalk.items);

    }

}



/*判断字数*/
$("#mainConTitle").keyup(function(){
    var len=$(this).val().length;
    $("#mainCont .contitleTip").html(len+"个字");
});

function backuncheck(){
    let ifinfo = window.location.search;
    ifinfo=ifinfo.substring(4);
    ifinfo=ifinfo.split(",");
    setTimeout(function(){
//        //console.log(ifinfo);
//        //console.log(ifinfo[2]);
        window.location.href="content-check.html?pageon="+ifinfo[2];
    },250)
}



$("#editoBtn").click(function(){
    $("#imgEditBox").addClass("show");
});

/*缩略图编辑打开放大*/
$("#movieImgBox .movieshowimg").click(function(){
    let imgsrc=$("#movieImgBox .movieshowimg img").attr("src");
    $("#imgEditBox .imgshowBox img").attr("src",imgsrc);
    $("#imgEditBox").addClass("show");
});
/*视频封面替换*/
$("#movieimgfile").change(function(){
    var files = this.files[0];
    var fileSize = 0;
    var fileMaxSize = 1024*3;//1M
    var filePath = $("#movieimgfile").val();
    if(filePath){
        fileSize =files.size;
        var size = fileSize / 1024;
        if (size > fileMaxSize) {
            layer.msg("图片太大啦！");
            file.value = "";
            return false;
        }else if (size <= 0) {
            alert("图片呢？？");
            file.value = "";
            return false;
        }
    }
    if (window.FileReader) {
        var reader = new FileReader();
        reader.index = 0;
        reader.file = this.files[0];
        reader.readAsDataURL(this.files[0]);  //转成base64
        reader.fileName = this.files[0].name;
        //监听文件读取结束后事件
        reader.onloadend = function (e) {
            fileslist[0]=files;
            iffilechange=2;
            var imgMsg = {
                name : this.fileName,//获取文件名
                file:this.file,//文件流
                base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
            };
            let img = new Image();              //手动创建一个Image对象
            img.src = e.target.result;//创建Image的对象的url
            img.onload = function () {
                ////console.log('height:'+this.height+'----width:'+this.width);
                $("#movieImgBox .movieshowimg img").attr("data-width",this.width);
                $("#movieImgBox .movieshowimg img").attr("data-height",this.height);
            };
            $("#movieImgBox .movieshowimg img").attr("src",e.target.result);    //e.target.result就是最后的路径地址
            /*提交到腾讯云上*/
            // //console.log("imgMsg::");
            // //console.log(imgMsg);
            runAsync(imgMsg).then(function(data){
                var onetdk=data.Url.substring(0, data.Url.indexOf('?'));
                return onetdk;
            }).then(function(onetdk) {
                // //console.log("onetdk::");
                // //console.log(onetdk);
                var moviecover=JSON.parse(contentDatasurllist);
                moviecover[0]=onetdk;
                contentDatasurllist=moviecover;

            });

        };
    }
});


/*位置选择切换*/
$("#alternativeList").change(function(){
    var va=$(this).val();
    getrubbigsetpige(va);
});


/*初始化*/
function backzero(){
    $("#detailCon .searchMenu .searchTag").val("");
    $("#checkConLevel").val("0");
    talknum=0;
    $("#talkAboutBox .talkNum").html(talknum);
    usertalk.items=[];
    usertalk.postcommentlist=[];
    $("#subcheckbtn").removeAttr("disabled");
    getcheckdata();
    $("#ispassSelect").val("YES");
}

//显示内容链接
function  contentUrldel(contentDatasurllist){
    console.log("contentDatasurllist::");
    console.log(contentDatasurllist);
    $("#contentUrlBox ul").empty();
    if(contentDatasurllist && contentDatasurllist!=undefined && contentDatasurllist!=""){
        let nedurl=JSON.parse(contentDatasurllist);
        $.each(nedurl,function(i,n){
            $("#contentUrlBox ul").append('<li><a href="'+n+'" target="_blank">'+n+'</a></li>');
        })
    }



}
$("#lookContentUrl").click(function(){
    layer.open({
        type: 1,
        title: '备选队列页码选择',
        maxmin: false, //开启最大化最小化按钮
        area: ['500px', "320px"],
        content: $("#contentUrlBox"),
        success: function (layero, index) {

        }
    });
});

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

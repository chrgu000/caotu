/**
 * Created by zhu on 2018/8/14.
 */

$(function(){
    startis();//初始进入页面统计
    setTimeout(function(){
        $("#loading_hype_containerBox").css({"display":"none"});
        moonfirst();
    },5000);
     //getBase64Image("#endPage",1,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/endbg.png");
     //getBase64Image("#moshuibg",2,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/moshui.png");
     ////getBase64Image("#endUserMoon",2,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/Ball.png");
     //getBase64Image("#userTagImg",2,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/tagsbox.png");
     //getBase64Image("#ewmimg",2,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/ewm.png");

});
/*window.onload=function() {

    /!*1_初始动画——月球隐现上升*!/
}*/

/*进入页面判断*/
    function startis(){
         //var loctionsrc="?appevent=splash&apptype=ios";//假设得到的location.search; //获取url中"?"符后的字串
        var loctionsrc= window.location.search;
        console.log(loctionsrc);
        var pagestr="";
        if(loctionsrc ==""){
             pagestr="WEBALL";
            magnitude(pagestr,"NO")
        }else{
            var urlcs=GetRequest(loctionsrc);
            //console.log(urlcs);
            if(urlcs.appevent && urlcs.appevent !="" && urlcs.apptype && urlcs.apptype !=""){
                 pagestr=urlcs.apptype+"ALL"+urlcs.appevent;
                magnitude(pagestr,"NO")
            }else{
                 pagestr="WEBALL";
                magnitude(pagestr,"NO");
            }
        }


    }
/*统计数量*/
function magnitude(pagestr,needcount){
    var tjdatas={"pagestr":pagestr,"needcount":needcount};
    console.log(tjdatas);
    tjdatas=JSON.stringify(tjdatas);

    $.ajax({
        url : path+'/CTKJSEVER/activepage/countactive.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:true,
        data: tjdatas,
        error: function(data){
            /*  layer.msg("服务器未响应,请稍后再试!");*/
            //console.log("获取失败：");
            //console.log(data);
        },
        success:function(diskJson){
                console.log("统计:");
                console.log(diskJson);
            if(diskJson.code =="1000"){
                if(diskJson.data && diskJson.data !=""){
                    result.userNumber=diskJson.data;
                }
            }else{

                /*  layer.msg("网络异常，请重试！！")*/
            }

        }
    });
}

//音乐开关
var musicplay=true;//播放开关
$("#music").click(function () {
    if (musicplay) {
        $("#music .musicimg").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/musicclose.png");
        $("#bgm").get(0).pause();
        musicplay=false;
    }else{
        $("#music .musicimg").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/musicopen.png");
        $("#bgm").get(0).play();
        musicplay=true;
    }
});

/*初始动画——月球隐现上升*/
    function moonfirst(){
        //月亮出现
        $("#moonImg").animate({
            opacity: 1
        },3000);
        /*月亮上升*/
        setTimeout(function(){
            $("#moonImg").animate({
                top: "33%"
            },2000,"swing");
        },3000);
        /*文字出现*/
        var fontnum=0;
        setTimeout(function(){
            var fontshow= setInterval(function(){
                fontnum= fontnum+1;
                if(fontnum <=5){
                    $("#indexIntroBox .intro:nth-child("+fontnum+")").animate({
                        opacity: 1
                    },1500);
                }else{
                    clearInterval(fontshow);
                }
            },1500);
        },4000);
    }

/*点击播放按钮*/
    $("#playBtn").on("click",function(){
       /* $("#indexvideo").get(0).play();
        document.addEventListener("WeixinJSBridgeReady", function() {
            document.getElementById("indexvideo").get(0).play();
        }, false);*/
        playtab();
    });
    function playtab(){
        /*文字隐藏*/
        $("#indexIntroBox").animate({
            opacity:0
        },2000);
        /*月亮再上升*/
        setTimeout(function(){
            $("#moonImg").animate({
                top: "22%"
            },1500,"swing");
        },1500);
        /*输入框显示*/
        setTimeout(function(){
            $("#infoInputBox").css("display","block");
            $("#infoInputBox").animate({
                opacity: 1
            },1500);
        },3000);
    }
    /*测试结果——过度动画*/

    $("#playBtn2").on("click",function(){
        var username=$("#userName").val();
        var birth=$("#birthday").val();
        //console.log(birth);
        if(username !="" && birth !=""){
            result.username=username;
            result.birthday=birth;
            birth=birth.split("-");
            birth=Number(birth[1]+birth[2]);
            //console.log(birth);
            moontest(username,birth);
        }else{
            return false;
        }

        var movid="video";//video播放还是canvas
       // var phone=phoneType2();
       // movid="video";
        $("#video").get(0).play();
        document.addEventListener("WeixinJSBridgeReady", function() {
            document.getElementById("video").get(0).play();
        }, false);
        /*if(phone == 2){
            movid="video";
            $("#video").get(0).play();
            document.addEventListener("WeixinJSBridgeReady", function() {
                document.getElementById("video").get(0).play();
            }, false);
        }else{
            movid="video";
            $("#video").get(0).play();
            document.addEventListener("WeixinJSBridgeReady", function() {
                document.getElementById("video").get(0).play();
            }, false);

        }*/
        playtab2(movid);
    });
    function playtab2(movid){
        /*月亮消失*/
        $("#moonImg").animate({
            opacity: 0,
            width:"20%"
        },1500);
        /*信息表消失*/
        $("#infoInputBox").animate({
            opacity: 0,
            height:"100px"
        },1000);

        $("#"+movid).css("display","block");
        setTimeout(function(){
            $("#infoInputBox").css("display","none");
        },1500);
        /*过度视频播放*/
        setTimeout(function(){

            $("#"+movid).animate({

                opacity: 1
            },2000);
        },800);
        setTimeout(function(){
            $("#endPage").css("display","block");
            /*过度视频消失*/
            $("#"+movid).animate({
                opacity: 0
            },2000);

            setTimeout(function(){
                $("#"+movid).css("display","none");
            },2200);
            /*结果页显示*/
            setTimeout(function(){
                $("#endPage").animate({
                    opacity: 1
                },1500);
                $("#moshuibg").animate({
                    opacity: 1,
                    width:"100%"
                },3000);
                //显示内容
                setTimeout(function(){
                    $("#endPage .endContBox").animate({
                        opacity: 1
                    },2000);
                    /*截图显示截图页*/
                    setTimeout(function(){
                        getcanvasimg();
                        setTimeout(function(){
                            $("#endPage").animate({
                                opacity: 0,
                                width:"80%",
                                height:"80%",
                                top:"10%",
                                left:"10%"
                            },1500);
                            $("#endPageImg").css("display","block");

                            $("#endPageImg").animate({
                                opacity: 1
                            },1500);
                        },1000);

                    },2000);

                },1500);
            },250);



        },5000)
    }

    /*测算1*/
    function moontest(username,birth){
        $.each(moonlist,function(i,n){
            if(birth >= n.minday && birth <= n.maxday){
                //console.log(n);
                result.astro= n.astro;
                var len= n.moonarry.length;
                moontest2(len,n);

            }
        });


    }

    /*测算2*/
    function moontest2(lenth,getdata){
        var mu=randomnum(0,99);
        //console.log(lenth);
        //console.log(getdata);
        //console.log(mu);
        if(mu !=99){
            let c=randomnum(0,lenth-1);
            let mlist=getdata.moonarry[c];
            result.moon=mlist.moon;
            result.moonid=mlist.moonid;
            result.sign=mlist.sign;
            result.society=mlist.society;
            result.signnum=mlist.signnum;

        }else{
            let c=randomnum(0,2);
            let mlist=othermoon[c];
            result.moon=mlist.moon;
            result.moonid=mlist.moonid;
            result.sign=mlist.sign;
            result.society=mlist.society;
            result.signnum=mlist.username;
        }
        $("#endPage .tagBoxs .userTag .tag").html( result.society);
        $("#userMoonStyle").html( result.moon);
        $("#userVersion").html( result.sign);
        $("#getname").html( result.username);
        //$("#endUserMoon").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/moon/moon"+result.moonid+".png");
        magnitude(result.moonid,"YES");//统计

        var wxfxxinfo2={"imgUrl":"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/sharicon.png",
            "link" : "https://v3.toutushare.com/activity_zhongqiu/active.html",
            "desc" : "他是第"+result.userNumber+"个找到自己专属月相的人……",   // 分享描述
            "title" : result.username+"的月相居然是【"+result.moon+"】？！"   // 分享标题*/
        };
        wxpz(wxfxxinfo2);
        $('meta[property="og:title"]').attr('content',result.username+"的月相居然是【"+result.moon+"】？！");
        $('meta[itemprop="name"]').attr('content',result.username+"的月相居然是【"+result.moon+"】？！");
        $('meta[name="description"]').attr('content',"他是第"+result.userNumber+"个找到自己专属月相的人……");

    }

/*/!*以下是渲染CANVAS画布中的视频*!/
function getvideo(){
    var videoW=$("body").width();
    var videoH=$("body").height();
    $("#canvas").css({"width":videoW+"px","height":videoH+"px"});
    //获取video
    var TestVideo=document.getElementById("video2");
//获取canvas画布
    var TestCanvas=document.getElementById("canvas");
//设置画布
    var TestCanvas2D=TestCanvas.getContext('2d');
//设置setinterval定时器
    var TestVideoTimer=null;
//监听播放

    TestVideo.addEventListener('play',function() {

        TestVideoTimer=setInterval(function() {
            alert(11);
            TestCanvas2D.drawImage(TestVideo,0,0,videoW,videoH);
        },20);
    },false);
//监听暂停
    TestVideo.addEventListener('pause',function() {
        clearInterval(TestVideoTimer);
    },false);
//监听结束
    TestVideo.addEventListener('ended',function() {
        clearInterval(TestVideoTimer);
    },false);
}*/


//     *转换图片为base64*/
function getBase64Image(tabs,style,imgurl) {
    //console.log("imgurl::");
    //console.log(imgurl);
    var img = new Image();
    img.crossOrigin = "Anonymous";//解决跨域图片问题，就是上面提及的
    img.src = imgurl;
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload=function(){
        //console.log(img.width);
        //console.log(img.height);
        let cw=img.width;
        let ch=img.height;
        if(tabs == "#endPage"){
            cw=$("#endPage").width();
            ch=$("#endPage").height();
        }
        var canvas = document.createElement("canvas");
        canvas.width = cw;//这个设置不能丢，否者会成为canvas默认的300*150的大小
        canvas.height = ch;//这个设置不能丢，否者会成为canvas默认的300*150的大小
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, cw, ch);
        var dataURL = canvas.toDataURL("image/png");
        console.log("dataURL");
        console.log(tabs);
        console.log(dataURL);
        if(style == 1){
            $(tabs).css("background",'url("'+dataURL+'") no-repeat');
        }else{
            $(tabs).attr("src",dataURL);
        }


    }
}



function getcanvasimg(){
    var cntElem = $('#endPage')[0];

    var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
    var width = shareContent.offsetWidth; //获取dom 宽度
    var height = shareContent.offsetHeight; //获取dom 高度
    var canvas = document.createElement("canvas"); //创建一个canvas节点
    var scale = 2; //定义任意放大倍数 支持小数
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
    };

    html2canvas(shareContent, opts).then(function (canvas) {

        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        // 【重要】默认转化的格式为png,也可设置为其他格式
        var dataUrl = canvas.toDataURL("image/png");
        console.log(dataUrl);
        $("#canvasImg").attr("src",dataUrl);
       /* console.log(canvas);
        var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
        $("#endPageImg .canvasImgBox").append(img);
        document.body.appendChild(img);
        $(img).attr("id","canvasImg");*/


    });


}


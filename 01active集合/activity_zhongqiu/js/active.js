/**
 * Created by zhu on 2018/8/14.
 */

var isover=1;
$(function(){
    splaybgmusic();
    setTimeout(function(){
        isover=2;
       /* if(isover ==2){
            startis();//初始进入页面统计
            $("#loading_hype_containerBox").css({"display":"none"});
            moonfirst();
            splaybgmusic();
        }*/

    },3000);
});
window.onload=function() {
    var onl=setInterval(function(){
        if(isover ==2){
            isovers();
            clearInterval(onl);
            $("#drumpMoon").css({"display":"block"});
           // isphone();
        }
    },500);
};

function isovers(){
    startis();//初始进入页面统计
    $("#loading_hype_containerBox").css({"display":"none"});
    moonfirst();

}

//getBase64Image("#endPage",1,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/endbg2.jpg");
//getBase64Image("#moshuibg",2,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/moshui2.png");
//getBase64Image("#userTagImg",2,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/tagsbox2.png");
//getBase64Image("#ewmimg",2,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/ewm2.png");
/*进入页面判断*/
    function startis(){
         //var loctionsrc="?appevent=splash&apptype=ios";//假设得到的location.search; //获取url中"?"符后的字串
        var loctionsrc= window.location.search;
        //console.log(loctionsrc);
        var pagestr="";
        if(loctionsrc ==""){
             pagestr="WEBALL";
            magnitude(pagestr,"NO");
            _czc.push(['_trackEvent', '进入活动',"WEBALL"]);
        }else{
            var urlcs=GetRequest(loctionsrc);
            //console.log(urlcs);
            if(urlcs.appevent && urlcs.appevent !="" && urlcs.apptype && urlcs.apptype !=""){
                 pagestr=urlcs.apptype+urlcs.appevent+"ALL";
                pagestr=pagestr.toUpperCase();
                magnitude(pagestr,"NO");
                _czc.push(['_trackEvent', '进入活动',pagestr]);
            }else{
                 pagestr="WEBALL";
                magnitude(pagestr,"NO");
                _czc.push(['_trackEvent', '进入活动',"WEBALL"]);
            }
        }


    }

/*判断机型*/
    function isphone(){
        var phone =phoneType2();
        var ewmurl="ewm2.png";
        switch(phone){
            case 2:ewmurl ="ewmaz.png";break;
            case 3:ewmurl ="ewnIOS.png";break;
            default:ewmurl="ewm2.png";
        }
        $("#ewmimg").attr("src","img/"+ewmurl);
    }
/*统计数量*/
function magnitude(pagestr,needcount){
    if(pagestr == "" || pagestr == null || pagestr == undefined){
        pagestr ="WEBALL";
    };
    var tjdatas={"pagestr":pagestr,"needcount":needcount};
    //console.log(tjdatas);
    tjdatas=JSON.stringify(tjdatas);
    $.ajax({
        url : path+'/CTKJSEVER/activepage/countactive.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:false,
        data: tjdatas,
        error: function(data){
            /*  layer.msg("服务器未响应,请稍后再试!");*/
            //console.log("获取失败：");
            //console.log(data);
        },
        success:function(diskJson){
                //console.log("统计:");
                //console.log(diskJson);
            if(diskJson.code =="1000"){
                if(diskJson.data && diskJson.data !="" && diskJson.data >0){
                    //console.log(diskJson.data)
                    result.userNumber=diskJson.data;
                    sharepzs(diskJson.data)
                }
            }else{

                /*  layer.msg("网络异常，请重试！！")*/
            }

        }
    });
}

//音乐开关
var musicplay=true;//播放开关

function splaybgmusic(){
    var audio=document.querySelector("#bgm");
    $("#bgm").get(0).play();
    document.addEventListener("WeixinJSBridgeReady",function(){
        audio.play();
    },false);
}


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
var startover=1;
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
                    },1200);
                }else{
                    clearInterval(fontshow);
                    startover=2;
                    $("#drumpMoon").css({"display":"none"});
                }
            },1200);

        },3500);
    }

/*点击播放按钮*/
    $("#playBtn").on("click",function(){
       /* $("#indexvideo").get(0).play();
        document.addEventListener("WeixinJSBridgeReady", function() {
            document.getElementById("indexvideo").get(0).play();
        }, false);*/
        playtab();
        $("#clickibg").get(0).play();
        $("#startClickBox").css({"display":"none"});
        $("#drumpMoon").css({"display":"none"});
    });
    $("#startClickBox").on("click",function(){
        if(startover == 2){
            playtab();
            $("#clickibg").get(0).play();
            $("#startClickBox").css({"display":"none"});
            $("#drumpMoon").css({"display":"none"});
        }

    });

    function playtab(){
        /*文字隐藏*/
        $("#indexIntroBox").animate({
            opacity:0
        },1500);
        /*月亮再上升*/
        setTimeout(function(){
            $("#moonImg").animate({
                top: "22%"
            },1500,"swing");
        },1000);
        /*输入框显示*/
        setTimeout(function(){
            $("#infoInputBox").css("display","block");
            $("#infoInputBox").animate({
                opacity: 1
            },1500);
        },2000);
    }
    /*测试结果——过度动画*/
    $("#userName").keyup(function(){
        var username=$("#userName").val();
        var usernamelen=username.length;
        if(usernamelen >12){
            $("#infoInputBox .tips").html("尊名过长，解锁败矣").addClass("show");
            return false;
        }else{
            $("#infoInputBox .tips").removeClass("show");
        }
    });
    $("#playBtn2").on("click",function(){
        var username=$("#userName").val();
       var usernamelen=username.length;
        if(usernamelen >12){
            $("#infoInputBox .tips").html("尊名过长，解锁败矣").addClass("show");
            return false;
        }else{
            $("#infoInputBox .tips").removeClass("show");
        }
        if(username !=""){
            result.username=username;
            moontest(username);
        }else{
            return false;
        }
        $("#clickibg").get(0).play();

        var movid="videosBox";//video播放还是canvas
       // var phone=phoneType2();
       // movid="video";
        $("#video").get(0).play();
        document.addEventListener("WeixinJSBridgeReady", function() {
            document.getElementById("video").get(0).play();
        }, false);
        playtab2(movid);
    });

    var isdrumpvideo=1;//判断是否跳过动画
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
            $("#music").css("display","none");
            $("#"+movid).animate({
                opacity: 1
            },2000);
        },1000);
        setTimeout(function(){
            /*过度视频消失*/
            if(isdrumpvideo ==1){
                videohiden(movid);
            }
        },6000)
    }

/*初始月亮升起时跳过动画*/
function drumpMoon(){
    playtab();
    $("#clickibg").get(0).play();
    $("#startClickBox").css({"display":"none"});
    $("#drumpMoon").css({"display":"none"});
}
/*跳过动画*/
function drumpVideo(){
    isdrumpvideo=2;
    var movid="videosBox";//video播放还是canvas
    videohiden(movid);

}

    /*过度视频消失显示结果页*/
    function videohiden(movid){
        $("#endPage").css("display","block");
        $("#"+movid).animate({
            opacity: 0
        },1500);
        setTimeout(function(){
            $("#"+movid).css("display","none");
            $("#"+movid).remove();
            $("#music").css("display","block");
        },1700);
        /*结果页显示*/
        setTimeout(function(){
            $("#playBtn2").css("display","none");
            $("#endPage").animate({
                opacity: 1
            },1500);
            $("#moshuibg").animate({
                opacity: 1,
                width:"100%"
            },2500);

            setTimeout(function(){
                //显示内容
                $("#endPage .endContBox").animate({
                    opacity: 1
                },1500);
                setTimeout(function(){
                    getcanvasimg();
                },2000);
            },1500);
        },2000);
    }
    /*测算1*/
    function moontest(username){
        var birth=randomnum(0,12);
        //console.log(birth);
        $.each(moonlist,function(i,n){
            if(birth == i){
                //console.log(n);
                result.astro= n.astro;
                var len= n.moonarry.length;
                moontest2(len,n);

            }
        });


    }

    /*测算2*/
    function moontest2(lenth,getdata){
        var mu=randomnum(0,299);
        //console.log(lenth);
        //console.log(getdata);
        //console.log(mu);
        if(mu !=299){
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
            result.signnum=mlist.signnum;
            $("#endPage .endContBox").css("color","#fff");
            $("#userMoonStyle").css("color","#fff");
            $("#endPage .endContBox .ewmBox").css("color","#fff");
            $("#userTagImg").attr("src","img/tagsbox3.png");
            $("#moshuibg").attr("src","");
            $("#endPage").css({"background":'url("img/endbg3.jpg") no-repeat',"background-size":"cover"});

        }
        magnitude(result.signnum,"YES");//统计
        _czc.push(['_trackEvent', '测算结果',result.signnum]);
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

    /*分享配置*/
    function sharepzs(getusername){
        $("#endPage .tagBoxs .userTag .tag").html( result.society);
        //console.log(result);
        $("#userMoonStyle").html( result.moon);
        $("#userVersion").html( result.sign);
        $("#getname").html( result.username);
        $("#endUserMoon").attr("src","img/moon/moon"+result.moonid+".png");
        // getBase64Image("#endUserMoon",2,"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/moon2/moon"+result.moonid+".png");

        //console.log(result.userNumber);
        var desc ="他是第"+getusername+"个找到自己专属月相的人……";
        var title =result.username+"的中秋专属月相居然是【"+result.moon+"】？！";
        var wxfxxinfo2={"imgUrl":"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/sharicon.png",
            "link" : "https://cdn.toutushare.com/activity_zhongqiu/active.html",
            "desc" : desc,   // 分享描述
            "title" : title   // 分享标题*/
        };
        //console.log(wxfxxinfo2);
        wxpz(wxfxxinfo2);
        $('meta[property="og:title"]').attr('content',title);
        $('meta[itemprop="name"]').attr('content',title);
        $('meta[name="description"]').attr('content',desc);
        $(document).attr("title",title);
    }


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
        //console.log("dataURL");
        //console.log(tabs);
        //console.log(dataURL);
        if(style == 1){
            $(tabs).css("background",'url("'+dataURL+'") no-repeat');
        }else{
            $(tabs).attr("src",dataURL);
        }


    }
}

var canvasinfo = new Vue({
    el: '#endPageImg',
    data: {
        "url":""

    },
    // 在 `methods` 对象中定义方法
    methods: {

    }
});


function getcanvasimg(){
    //console.log("截图")
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
        //console.log(dataUrl);
        canvasinfo.url=dataUrl;
        //$("#canvasImg").attr("src",dataUrl);
        setTimeout(function(){
            $("#clickibg").get(0).play();
            $("#endPage").animate({
                opacity: 0,
                width:"80%",
                height:"80%",
                top:"10%",
                left:"10%"
            },1100);
            $("#endPageImg").css("display","block");

            $("#endPageImg").animate({
                opacity: 1
            },1500);
        },1000);

    });


}


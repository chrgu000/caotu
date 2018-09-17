/**
 * Created by zhu on 2018/8/14.
 */

$(function(){
    magnitude("s0");//统计进入的数量
    setTimeout(function(){
        $("#loading_hype_containerBox").css({"display":"none"});
        moonfirst();
    },5000);
});
/*window.onload=function() {

    /!*1_初始动画——月球隐现上升*!/
}*/

/*统计数量*/
function magnitude(pagestr){
    var tjdatas={"pagestr":pagestr};
    tjdatas=JSON.stringify(tjdatas);
//        //console.log(tjdatas);
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
//                //console.log("统计:");
//                //console.log(diskJson);
            if(diskJson.code =="1000"){

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
        $(this).attr("src","img/musicclose.png");
        $("#bgm").get(0).pause();
        musicplay=false;
    }else{
        $(this).attr("src","img/musicopen.png");
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
        var movid="";//video播放还是canvas
        var phone=phoneType2();

        if(phone == 2){
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

        }
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
                },2000);
                $("#moshuibg").animate({
                    opacity: 1,
                    width:"100%"
                },3000);
                setTimeout(function(){
                    $("#endPage .endContBox").animate({
                        opacity: 1
                    },2000);
                },2500);


            },2000)

        },12000)
    }

/*以下是渲染CANVAS画布中的视频*/
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
}


function getcanvasimg(){
    var cntElem = $('.conntentsBox')[0];

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
        console.log(canvas);
        var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);

        document.body.appendChild(img);

        $(img).css({
            "width": canvas.width / 2 + "px",
            "height": canvas.height / 2 + "px"
        }).addClass('canimg');

    });


}


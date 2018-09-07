/**
 * Created by zhu on 2018/8/14.
 */

$(function(){

    var phonetype=phoneType();
    if(phonetype == 1){
//           微信分享
       getweixininfo();

    }
    isllq();
    magnitude("s0");

});

/*浏览器*/
function isllq(){
    var phonetype=phoneType();//浏览器判断
    var phonetype2=phoneType2();//手机判断
    if(phonetype =="qq" || phonetype =="Opera" || phonetype =="FF" || phonetype =="Chrome" ||  phonetype =="IE"){

    }else{

    }
    if(phonetype2==2){
//            安卓手机用户信息
        $("#downAppBtn").attr("href","http://sj.qq.com/myapp/detail.htm?apkName=com.caotu.toutu");

    }else if(phonetype2==3){
//              苹果手机用户信息

        $("#downAppBtn").attr("href","https://itunes.apple.com/cn/app/id1398165300?mt=8");
    }

}

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
        $(this).html("<img src='img/music_colse.png'/>");
        $("#bgm").get(0).pause();
        musicplay=false;
    }else{
        $(this).html("<img src='img/music_open.png'/>");
        $("#bgm").get(0).play();
        musicplay=true;
    }
});

/*开始测试的声音控制*/
function shortmusic(){
    $("#choosemusic").get(0).play();
}

/*开始测试*/
var isimgload=0;
    function begintest(){
        shortmusic();
        var birthdata=$("#testParameter").val();
        console.log(birthdata);
        if(birthdata == ""){
            $(".creatUsernameBox .tips").addClass("show");
            return false;
        }else{
            $("#indexpage").removeClass("active");
            $("#lastpage").addClass("active");
            layer.msg("测算中！！");
            var getcanvas=setInterval(function(){
                if(isimgload==1){
                    getcanvasimg();//生成图片
                    clearInterval(getcanvas);
                }
            },250);

        }
    }

/*逗逗好友分享*/
function sharefriend(){
    var phonetype=phoneType();
    _czc.push(['_trackEvent', '分享好友', '分享']);
    if(phonetype == 1 || phonetype == "qq" ){
//           微信分享
        $("#shareActiveBtn").attr("href","javascript:void(0)");
        $("#flowImgBox").addClass("show").css("background","rgba(0,0,0,.6)");
        $("#flowImgBox img").attr("src","img/shareflow.png");
    }
}

/*结束狗生下载APP*/
function downApp(e){
    _czc.push(['_trackEvent', '结束狗生', '下载']);

}
/*获取用户信息-1*/
function getuserinfo(){
//         var account= $.cookie('name');
    var phonetype=phoneType();
    if(phonetype == 1){
//           微信信息

    }else{

        getuserinfo2();
    }




}

/*app获取用户信息-2*/
function getuserinfo2(){
    // var loctionsrc="?eyJuYW1lIjoi5YK755m9IiwiaW1hZ2UiOiJodHRwOi8vY3Rrai0xMjU2Njc1MjcwLmNvcy5hcC1zaGFuZ2hhaS5teXFjbG91ZC5jb20vN0NGRUY3MzEtRUIzNS00NkUyLTk4ODItMTBDODYyNjg0MkNELnBuZyJ9";//假设得到的location.search; //获取url中"?"符后的字串
    var loctionsrc= window.location.search;
    //console.log(loctionsrc);
    if(loctionsrc && loctionsrc!=""){
        var result2 = utf8to16(base64decode(loctionsrc));
        result2=JSON.parse( result2 );
//             //console.log("result2::");
//             //console.log(result2);
        if(result2 && result2!=""){
            $("#lastpage .userinfobox").removeClass("weixin");
            $("#userInfoHead").attr("src",result2.image);
            $("#userInfoName").html(result2.name);
        }else{
            if(result.username !=""){
                $("#userInfoName").html(result.username);
                $("#lastpage .userinfobox").addClass("weixin");
                $("#lastpage .userInfo .dogName").html(result.dog);
            }else{
                $("#lastpage .userinfobox").empty();
                $("#lastpage .userinfobox").append('<p class="dogNameOnly" style="color: #333;font-size: 4.5rem;line-height: 145px;">'+result.dog+'</p>');
            }


        }
    }else{
        if(result.username !=""){
            $("#userInfoName").html(result.username);
            $("#lastpage .userinfobox").addClass("weixin");
            $("#lastpage .userInfo .dogName").html(result.dog);
        }else{
            $("#lastpage .userinfobox").empty();
            $("#lastpage .userinfobox").append('<p class="dogNameOnly" style="color: #333;font-size: 4.5rem;line-height: 145px;">'+result.dog+'</p>');
        }
    }


}

/*点击引导页返回*/
$("#flowImgBox").click(function(){
    $("#flowImgBox").removeClass("show");
});
/*获取当前页是否是最后一页*/
function getpage(){
    var isy=$(".actPages.active").attr("data-page");
    if(isy == "end0"){
        return 1;
    }else{
        return 0;
    }
}


/**
 * 根据window.devicePixelRatio获取像素比
 */
function DPR() {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
    }else{
        return 1;
    }

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


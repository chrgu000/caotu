

window.onload=function() {

    setTimeout(function(){
        autoPlayMusic();
        splaybgmusic();
        magnitude("MYDOGYEARWEB1");
        _czc.push(['_trackEvent', '进入活动页1']);
        $("#loading_hype_containerBox").css({"display":"none"});
        showfirstpage();
        endpageinfobefor();//预先处理部分结果页
    },2500);
};

/*第一页内容显示动画*/
    var pageindex=0;
    function showfirstpage(){
        $("#fistPageBox .firstpage_wold1").animate({
            "opacity":1
        },2000);
        $("#fistPageBox .firstpage_plant").animate({
            "opacity":1
        },4000);
        setTimeout(function(){
            $("#fistPageBox .firstpage_wold2").animate({
                "opacity":1
            },2000);
            setTimeout(function(){
                $("#fistPageBox .firstpage_wold3").animate({
                    "opacity":1
                },2000);
            },1000)
        },1000);
        setTimeout(function(){
            $("#fistPageBox .firstpage_plantall").animate({
                "opacity":1
            },4000);
            $("#turnNextBox").animate({
                "opacity":1
            },4000);
            setTimeout(function(){
                pageindex=1;
            },500);

        },2000)
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
        $("#music .musicimg").attr("src","img/musicclose.png");
        $("#bgm").get(0).pause();
        musicplay=false;
        magnitude("SILIENCE");
    }else{
        $("#music .musicimg").attr("src","img/musicopen.png");
        $("#bgm").get(0).play();
        musicplay=true;
    }
});

// 音乐播放
function autoPlayMusic() {
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    function musicInBrowserHandler() {
        musicPlay(true);
        document.body.removeEventListener('touchstart', musicInBrowserHandler);
    }
    document.body.addEventListener('touchstart', musicInBrowserHandler);

    // 自动播放音乐效果，解决微信自动播放问题
    function musicInWeixinHandler() {
        musicPlay(true);
        document.addEventListener("WeixinJSBridgeReady", function () {
            musicPlay(true);
        }, false);
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    }
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
}
function musicPlay(isPlay) {
    var media = document.querySelector('#bgm');
    if (isPlay && media.paused) {
        media.play();
    }
    if (!isPlay && !media.paused) {
        media.pause();
    }
}

$("#fistPageBox").on("touchstart", function(e) {
    e.preventDefault();
    startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
});
$("#fistPageBox").on("touchmove", function(e) {
    e.preventDefault();
    moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;

    if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
       // alert("left 2 right");
    }
    else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
       // alert("right 2 left");
    }
    else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
       // alert("top 2 bottom");
    }
    else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
        //alert("bottom 2 top");
        if(pageindex==1){
            $("#fistPageBox").slideUp("slow");
            $("#secondPageBox").slideDown("slow");
            pageindex=2;

            magnitude("MYDOGYEARWEB2");
            _czc.push(['_trackEvent', '进入活动页2']);

        }

    }
    else{
       // alert("just touch");
    }
});


//运动事件监听
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler,false);
}

//获取加速度信息
//通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
//而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
var SHAKE_THRESHOLD = 10000;
var last_update = 0;
var x, y, z, last_x = 0, last_y = 0, last_z = 0;
function deviceMotionHandler(eventData) {
    var acceleration =eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime-last_update)> 10) {
        var diffTime = curTime -last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
            if(pageindex==2){
                $("#waggleBox").addClass("waggleing");
                // $("#fistPageBox").slideUp("slow");
                // $("#secondPageBox").slideDown("slow");
                setTimeout(function(){
                    $("#waggleBox").removeClass("waggleing");

                    if(resultInfoData.username && resultInfoData.username!="" && resultInfoData.username!=null && resultInfoData.username!=undefined){
                        popendpage();

                    }else{
                        $("#secondFixedBox").fadeIn(1000);
                    }
                },600)
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}

    /*确定昵称*/
    $("#userNamesureBtn").click(function(){
       let username=$("#userNameInput").val();
       if(username.length>10){
            //layer.msg("昵称不能超过10个字！");
           showMessage("昵称不能超过10个字！", $("#userNameInput"));
            return false;
       }
        if(username==""){
            //layer.msg("昵称不能超过10个字！");
            showMessage("请输入名字哦～！", $("#userNameInput"));
            return false;
        }
        resultInfoData.username=username;
        if(username && username !=""){
            popendpage();
        }
    });

    $("#userNameInput").click(function(){
        $("#userNameInput").focus();
    });



/*弹出结果页的操作*/
function popendpage(){
    magnitude("MYDOGYEARWEB3");
    _czc.push(['_trackEvent', '进入活动页3']);
    $("#secondPageBox").slideUp("800");
    $("#thirdPageBox").slideDown("800");
    endpageinfo();
    pageindex=3;

}

    /*预先处理结果页*/
function endpageinfobefor(){
    if(resultInfoData.userheadphoto && resultInfoData.userheadphoto!=""){
        $("#userHead").attr("src",resultInfoData.userheadphoto);
    }else{
        $("#endShareBox .userHeadBox").remove();
    }
    let index=randomnum(0,99);
    let signchoose=signword[index];
    resultInfoData.sign=signchoose.sign;
    $("#signWord").html(signchoose.word);
    let signlist=signchoose.sign.split("");
    $("#signWordBox").empty();
    $.each(signlist,function(i,n){
        $("#signWordBox").append(' <div class="signCon"><img class="signConBg" src="img/signConBg.png" alt=""><span class="sign">'+n+'</span></div>')
    });
    let length=signlist.length;
    let w=parseInt(100/length)-1+"%";
    if(length == 2){
        w="45%";
        $("#signWordBox .signCon").css({"margin-left":"20px;"});
    }
    $("#signWordBox .signCon").css({"width":w});
    $("#signWordBox .sign").addClass("sign"+length);

}

/*结果页2*/
    function endpageinfo() {
        $("#userName").html(resultInfoData.username);
        let shareTitle=resultInfoData.username+"的狗年个性词是"+resultInfoData.sign;
        let sharedesc="你看，那个人好像一条狗啊";
        wxfxxinfo.title=shareTitle;
        wxfxxinfo.desc=sharedesc;
        sharewxjson.title=shareTitle;
        sharewxjson.content=sharedesc;
        wxpz(wxfxxinfo);
        $('meta[property="og:title"]').attr('content',shareTitle);
        $('meta[itemprop="name"]').attr('content',shareTitle);
        $('meta[name="description"]').attr('content',sharedesc);
        $(document).attr("title",shareTitle);
        setTimeout(function(){
            getcanvasimg();
        },800);
        if (resultInfoData.apptype=="Android"){
            let wxjsonstring = JSON.stringify(sharewxjson);
            window.android.setShareContent(wxjsonstring);
        }


    }




    function getcanvasimg() {
        //console.log("截图")
        var cntElem = $('#endShareConBox')[0];
        var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        canvas.getContext("2d").translate(0,0);
        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            // logging: true, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,
            useCORS: true, // 【重要】开启跨域配置
            allowTaint: false
        };
        html2canvas(shareContent, opts).then(function (canvas) {
            var context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            // 【重要】默认转化的格式为png,也可设置为其他格式
            let dataUrl = canvas.toDataURL("image/png");
           $("#shareImg").attr("src",dataUrl).css("display","block");
            posttenxun(dataUrl);

        });



    }

    /*防止透点*/
    $("#endShareBox").on("touchend", function (event) {
    //很多处理比如隐藏什么的
        event.preventDefault();
    });

    /*重来一次*/
    $("#palyAgain").click(function(){
        magnitude("PLAYAGAIN");
        location.reload();
    });

    /*分享好友*/
    $("#shareBtn").click(function(){
       $("#shareTipsBox").css("display","block");
    });
    $("#shareTipsBox").click(function(){
        $("#shareTipsBox").css("display","none");
    });

    /*举报*/
    $("#reportFont").click(function(){
        $("#reportBox").css({"display":"block"});
        $("#reportBox .report1").css({"display":"block"});
        $("#reportBox .report2").css({"display":"none"});
    });
    $("#reportBox .report1").click(function(){
        $("#reportBox .report1").css({"display":"none"});
        $("#reportBox .report2").css({"display":"block"});
        magnitude("REPORT");
    });
    $("#reportBox .report2").click(function(){
        $("#reportBox").css({"display":"none"});
    });

    /*app中长按分享*/
    $("#endShareConBox").on({
        touchstart: function (e) {
            // 长按事件触发
            timeOutEvent = setTimeout(function () {
                timeOutEvent = 0;
                // alert('你长按了');
                if (resultInfoData.apptype != "web") {
                    let share = {
                        "webType": "1", //类型
                        "title": wxfxxinfo.title, //分析的title名
                        "url": postappimgurl, //分享的链接
                        "content": wxfxxinfo.desc, //描述
                        "icon": wxfxxinfo.imgUrl
                    };
                    //let sharestring2 = JSON.stringify(share);
                   // $("#show").html(sharestring2);
                    if(share.url==""){
                        share=sharewxjson;
                    }
                    let sharestring = JSON.stringify(share);
                  // $("#show2").html(sharestring);
                    if (resultInfoData.apptype == "Android") {
                        // alert("Android::");
                        window.android.shareweb(sharestring);
                    } else if (resultInfoData.apptype == "IOS") {
                        // alert("ios::");
                        window.webkit.messageHandlers.shareweb.postMessage(sharestring); //调用ios方法
                    }
                }
            }, 400);
            //长按400毫秒
        },
        touchmove: function () {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
            // alert("移动了");
        },
        touchend: function () {
            clearTimeout(timeOutEvent);
            if (timeOutEvent != 0) {
                // 点击事件
                // alert('你点击了');
            }
            return false;
        }
    });



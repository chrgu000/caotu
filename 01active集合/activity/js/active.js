/**
 * Created by zhu on 2018/8/14.
 */

$(function(){
     var phonetype=phoneType();
    if(phonetype == 1){
//           微信分享
        getweixininfo();
       // $("#lastpage .userinfobox").addClass("weixin");
    }
    isllq();
    magnitude("s0");
    //$("#userInfoName").html( result.username);
});

/*浏览器*/
function isllq(){
    var phonetype=phoneType();
    var phonetype2=phoneType2();
    //console.log(phonetype);
    if(phonetype =="qq" || phonetype =="Opera" || phonetype =="FF" ||  phonetype =="IE"){
        $(".creatUsernameBox").css("display","block");
        $("#indexpage").attr("data-name","1");

        $("#indexpage .sexChooseBox").addClass("no");
    }else{
        $(".creatUsernameBox").css("display","none");
        $("#indexpage").attr("data-name","0");
        $("#indexpage .sexChooseBox").removeClass("no");
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

$("#creatUsername").keydown(function(){
    var name=$("#creatUsername").val();
    var len=$("#creatUsername").val().length;
    if(len >9){
        name=name.substring(0, 9);
        $("#creatUsername").val(name);
        $(".creatUsernameBox .tips").addClass("show").html("太长了，我说的昵称（≤10）");
    }else{
        $(".creatUsernameBox .tips").removeClass("show");
    }
});
/*男女选择*/
function choosesex(sex){
    shortmusic();//短促声音
    var isu=$("#indexpage").attr("data-name");
    if(isu =="1"){
        var username=$("#creatUsername").val();
        ismgc(username);//敏感词
        if(result.mgc == 1){
            return false;
        }
        if(username == ""){
            $(".creatUsernameBox .tips").addClass("show").html("我是头图，独占鳌头的头，大展宏图的图，你呢？");
            return false;
        }
        result.username=username;
    }

        if(sex=="1"){
            $("#indexpage").removeClass("active");
            _czc.push(['_trackEvent', '性别', '选择', '男','1']);
            $("#manquestion").addClass("active");
            $("#manPage1").addClass("active");
            magnitude("m1");
            result.sex=1;

        }else{
            $("#indexpage").removeClass("active");
            _czc.push(['_trackEvent', '性别', '选择', '女','2']);
            $("#womanquestion").addClass("active");
            $("#womPage1").addClass("active");
            magnitude("w1");
            result.sex=2;

        }



}

/*选择答案*/
$(".actPages .quelist li").click(function(){
    shortmusic();//短促声音
    $(".actPages .quelist li.choose").removeClass("choose");
    $(".actPages .quelist li .chooing").remove();
    $(this).addClass("choose");
    $(this).append('<img class="chooing" src="img/xuanzhong.png" alt=""/>')
});
/*下一题*/
$(".actPages .nextQuestion").click(function(){
    var isc=$(this).siblings(".quelist").children("li").hasClass("choose");
    shortmusic();//短促声音
    if(isc){
        var thisgrade=Number($(".actPages .quelist li.choose").attr("data-index"));
        result.grade+=thisgrade;
        $(this).closest(".actPages").removeClass("active").next(".actPages").addClass("active");
        var pagestr=$(".actPages.active").attr("data-page");
        magnitude(pagestr);

    }



});

/*确认提交*/
$(".actPages .sureSub").click(function(){
    /* var w=$("#lastpage").width();
     var h=$("#lastpage").height();
     $("#lastpage").css({"width":w,"height":h});*/
    var isc=$(this).siblings(".quelist").children("li").hasClass("choose");
    if(isc){
        var thisgrade=Number($(".actPages .quelist li.choose").attr("data-index"));
        result.grade+=thisgrade;
        /*最后个问题*/
        $(this).closest(".actPages").removeClass("active");
        $(".question.active").removeClass("active");

        if(result.grade ==0){
            result.dog="微笑萨摩耶";
            result.dogimg="samoye.png";
            result.evaluate="<p>说好一起做单身狗，</p><p>你却偷偷撩了猫。</p>";
        }else if(result.grade>=1 && result.grade <=20){
            result.dog="暖男金毛";
            result.dogimg="jinmao.png";
            result.evaluate="<p>明明情话技能满分，</p><p>却不小心变成中央空调。</p>";
        }else if(result.grade>=21 && result.grade <=40){
            result.dog="网红斗牛梗";
            result.dogimg="douniudog.png";
            result.evaluate="<p>一条狗的夜，我的心，</p><p>应该放在哪里。</p>";
        }else if(result.grade>=41 && result.grade <=60){
            result.dog="忠诚拉布拉多";
            result.dogimg="labuladuo.png";
            result.evaluate="<p>爱情的巨轮说沉就沉，</p><p>唯有单身狗的小船屹立不倒。</p>";
        }else if(result.grade>=61 && result.grade <=80){
            result.dog="小短腿柯基";
            result.dogimg="keji.png";
            result.evaluate="<p>恩爱没有那么容易，</p><p>单身狗有它的脾气。</p>";
        }else if(result.grade>=81 && result.grade <=89){
            result.dog="法国斗牛犬";
            result.dogimg="douniu.png";
            result.evaluate="<p>全世界都在散发着恋爱的酸臭味，</p><p>只有你散发着单身狗的清香。</p>";
        }else if(result.grade>=91 && result.grade <=99){
            result.dog="真皮柴犬";
            result.dogimg="chai.png";
            result.evaluate="<p>这个夏天你不再是单身狗，</p><p>你叫热狗。</p>";
        }else if(result.grade ==100){
            result.dog="纯种哈士奇";
            result.dogimg="hashiqi.png";
            result.evaluate="<p>你还是狗吗？</p><p>按年龄算，叫单身鳖；</p><p>按体型算，叫单身猪。</p>";
        }
        $("#lastpage .userInfo .dogName").html(result.dog);
        $("#lastpage .grade").html(result.grade);
        $("#lastpage .evaluate").html(result.evaluate);
        $("#lastpage .dogHeadBox .dogHead").attr("src","img/dog/"+ result.dogimg);
        $("#userInfoName").html(result.username);
        $("#lastpage").addClass("active");
        $("#lastBtnListBox").addClass("show");
        magnitude("end0");
        getuserinfo();

    }



});
//音乐开关
var musicplay=true;//播放开关
$(window).one("touchstart",function(){
    $("#bgm").get(0).play();
});
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

/*选择答案和下一题的声音*/
function shortmusic(){
    $("#choosemusic").get(0).play();
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
    setTimeout(function(){
        getcanvasimg();//生成图片
    },500);



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
        if(result2 && result2!="" && result2.name!="(null)"){
            //$("#lastpage .userinfobox").removeClass("weixin");
            //$("#userInfoHead").attr("src",result2.image);
            $("#userInfoName").html(result2.name);

        }else{
            if(result.username !=""){
                $("#userInfoName").html(result.username);
                $("#lastpage .userInfo .dogName").html(result.dog);
            }else{
                $("#lastpage .userinfobox").empty();
                $("#lastpage .userinfobox").append('<p class="dogNameOnly" style="color: #333;font-size: 4.5rem;line-height: 145px;">'+result.dog+'</p>');
            }
        }
    }else{
        if(result.username !=""){
            $("#userInfoName").html(result.username);
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



function getcanvasimg(){
    var w = $(".conntentsBox").width();
    var h = $(".conntentsBox").height();

//要将 canvas 的宽高设置成容器宽高的 2 倍
    var canvas = document.createElement("canvas");
    canvas.width = w * 2;
    canvas.height = h * 2;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    var context = canvas.getContext("2d");
//然后将画布缩放，将图像放大两倍画到画布上
    context.scale(2,2);
    html2canvas($(".conntentsBox")[0], {scale:2,logging:false,useCORS:true,allowTaint: false}).then(function(canvas) {
        var dataUrl = canvas.toDataURL("image/png");
        $("#canimg").attr("src",dataUrl).addClass("show");
        //$("#lastBtnListBox").addClass("show");
    });

}


/**
 * Created by zhu on 2018/8/8.
 */
/*var $wx_account = wxdata.wx_account, // 自定义数据，见wxShare_data.js
    $wx_share = wxdata.wx_share;   // 自定义数据  ，见wxShare_data.js*/
var wxlist={"appId":"wx7209465a9ddef7e2","timestamp":"","nonceStr":"","signature":""};
var wxfxxinfo={"imgUrl":"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/sharicon.png",
    "link" : "https://cdn.toutushare.com/activity_zhongqiu/active.html",
    "desc" : "中秋专属月相",   // 分享描述
    "title" : "解锁月相，发现未知的自己"   // 分享标题*/
};

$(function(){
    var phonetype=phoneType();
    if(phonetype ==1){
        console.log(111);
        gettiken();//获取微信token
    }
})

/*获取token*/
function gettiken(){
    $.ajax({
        url : path+'CTKJSEVER/activepage/getToken.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"GET",
        dataType:"JSON",
        async:false,
        data: "",
        error: function(data){
            //layer.msg("服务器未响应,请稍后再试!");
            //console.log("获取失败：");
            //console.log(data);
        },
        success:function(diskJson){
                console.log("token:");
                console.log(diskJson);
            if(diskJson.code =="1000"){
                var jsapi_ticket=diskJson.data;
                var noncestr=randomString(16);//随机字符串
                var timestamp=Math.round(new Date() / 1000);//时间戳
                ////console.log("jsapi_ticket::");
                ////console.log(jsapi_ticket);
                ////console.log("noncestr::");
                ////console.log(noncestr);
                ////console.log("timestamp::");
                ////console.log(timestamp);
//                var url="http://192.168.1.110:8081/workspace/activity/active.html";//分享网址
                var url=location.href;//分享网址
                wxfxxinfo.link=url;
                ////console.log("url::");
                ////console.log(url);
                wxlist.timestamp=timestamp;
                wxlist.noncestr=noncestr;
                var shastr="jsapi_ticket="+jsapi_ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;
                var signature=SHA2(shastr);
                wxlist.signature=signature;
                ////console.log("signature::");
                ////console.log(signature);
                config(wxlist);
            }else{

               // layer.msg("网络异常，请重试！！")
            }

        }
    });
}



//配置微信信息
function config(wxlist){
    wx.config ({
        debug : false,    // true:调试时候弹窗
        appId : wxlist.appId,  // 微信appid
        timestamp : wxlist.timestamp, // 时间戳
        nonceStr : wxlist.noncestr,  // 随机字符串
        signature : wxlist.signature, // 签名
        jsApiList : [
            // 所有要调用的 API 都要加到这个列表中
            'onMenuShareTimeline',       // 分享到朋友圈接口
            'onMenuShareAppMessage',  //  分享到朋友接口
            'onMenuShareQQ',         // 分享到QQ接口
            'onMenuShareWeibo'      // 分享到微博接口
        ]
    });
}

wxpz(wxfxxinfo);

function wxpz(wxfxxinfo){
    wx.ready(function () {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            imgUrl: wxfxxinfo.imgUrl,
            success: function () {
                magnitude("WEBSHAREFRIENDCIRCLE"+result.signnum,"NO");//统计
                _czc.push(['_trackEvent', '分享到朋友圈',result.signnum]);
            },
            cancel: function () {
            }
        });

        // 分享给朋友
        wx.onMenuShareAppMessage({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            desc: wxfxxinfo.desc,
            imgUrl: wxfxxinfo.imgUrl,
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                magnitude("WEBSHAREFRIEND"+result.signnum,"NO");//统计
                _czc.push(['_trackEvent', '分享给朋友',result.signnum]);

            },
            cancel: function () {
            }
        });

        // 分享到QQ
        wx.onMenuShareQQ({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            desc: wxfxxinfo.desc,
            imgUrl: wxfxxinfo.imgUrl,
            success: function () {
                magnitude("WEBSHAREQQ"+result.signnum,"NO");//统计
                _czc.push(['_trackEvent', '分享到QQ',result.signnum]);
            },
            cancel: function () {
            }
        });

        // 微信到腾讯微博
        wx.onMenuShareWeibo({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            desc: wxfxxinfo.desc,
            imgUrl: wxfxxinfo.imgUrl,
            success: function () {
                magnitude("WEBSHAREWB"+result.signnum,"NO");//统计
                _czc.push(['_trackEvent', '微信到腾讯微博',result.signnum]);
            },
            cancel: function () {
            }
        });

        // 分享到QQ空间
        wx.onMenuShareQZone({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            desc: wxfxxinfo.desc,
            imgUrl: wxfxxinfo.imgUrl,
            success: function () {
                magnitude("WEBSHAREQQKJ"+result.signnum,"NO");//统计
                _czc.push(['_trackEvent', '分享到QQ空间',result.signnum]);
            },
            cancel: function () {

            }
        });
    });
    wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //console.log(res);
    });
}




/*获取微信用户信息*/
function getweixininfo(){
    var loctionsrc= window.location.search;
   var cc= GetRequest(loctionsrc);
    console.log("cc");
    console.log(cc);
    //alert(cc.code);
   if(cc.code=="" || cc.code==null){
       //alert(1);
       //console.log("cc");
       //console.log(cc);
        //var redirect_uri=location.href;//分享网址
        var redirect_uri=encodeURIComponent("https://v3.toutushare.com/activity_zhongqiu/active.html");
        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5527fcd602603a18&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

   }else{
       //alert(2);
       var tjdatas={"code":cc.code};
       tjdatas=JSON.stringify(tjdatas);
       $.ajax({
        url : path+'/CTKJSEVER/activepage/getUserInfoForWX.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        dataType:"JSON",
        contentType: "application/json",
        async:true,
        data: tjdatas,
        error: function(data){
            layer.msg("服务器未响应,请稍后再试!");
            console.log("获取微信用户信息失败：");
            console.log(data);
        },
        success:function(diskJson){
            console.log("获取微信用户信息:");
            console.log(diskJson);
            if(diskJson.code =="1000" && diskJson.data.nickname){
                result.username=diskJson.data.nickname;
                $("#userInfoHead").attr("src",diskJson.data.headimgurl);
                $("#userInfoName").html(diskJson.data.nickname);
                getBase64Image(diskJson.data.headimgurl);

            }else{
                //alert("微信信息失败::");
                //console.log("微信信息失败::");
                $("#userInfoName").attr("data-id","0");
            }

        }
        });
   }


}


//     *手机长按事件_1截屏*/
function getBase64Image(imgurl) {
    var ish=imgurl.split(":")[0];
    var ish2=imgurl.split(":")[1];
    if(ish == "http"){
        imgurl="https:"+ish2;
    }
    //console.log("imgurl::");
    //console.log(imgurl);
    var img = new Image();
    img.src = imgurl;
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload=function(){
        var canvas = document.createElement("canvas");
        canvas.width = 300;//这个设置不能丢，否者会成为canvas默认的300*150的大小
        canvas.height = 300;//这个设置不能丢，否者会成为canvas默认的300*150的大小
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 300, 300);
        var dataURL = canvas.toDataURL("image/png");
      /*  console.log("dataURL");
        console.log(dataURL);*/
        $("#userInfoHead").attr("src",dataURL);
        isimgload=1;

    }
}


/*
/!*微博分享配置*!/
(function(){
    var _w = 90 , _h = 24;
    var param = {
        url:"https://v3.toutushare.com/activity_zhongqiu/active.html",
        type:'2',
        count:'', /!**是否显示分享数，1显示(可选)*!/
        appkey:'', /!**您申请的应用appkey,显示分享来源(可选)*!/
        title:'中秋月饼', /!**分享的文字内容(可选，默认为所在页面的title)*!/
        pic:'https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/seven_xi2.png', /!**分享图片的路径(可选)*!/
        ralateUid:'', /!**关联用户的UID，分享微博会@该用户(可选)*!/
        language:'zh_cn', /!**设置语言，zh_cn|zh_tw(可选)*!/
        rnd:new Date().valueOf()
    } ;
    var temp = [];
    for( var p in param ){
        temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
    }
    document.write('<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>')
})() ;*/

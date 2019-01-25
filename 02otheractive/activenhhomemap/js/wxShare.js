/**
 * Created by zhu on 2018/8/8.
 */
/*var $wx_account = wxdata.wx_account, // 自定义数据，见wxShare_data.js
    $wx_share = wxdata.wx_share;   // 自定义数据  ，见wxShare_data.js*/


const path2 = "https://api.itoutu.com:8899/NHDZSEVER"; //测试
/*线上改*/
// const path="https://api.itoutu.com:8899/NHDZSEVER";

var wxlist = {
    "appId": "wx5527fcd602603a18",
    "timestamp": "",
    "nonceStr": "",
    "signature": ""
};
var wxfxxinfo = {
    "imgUrl": "https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/activeallimgs/activemap/sharelogo.png",
    "link": "https://active.oalul.cn/activenhhomemap/tlrindex.html",
    "desc": "内含的不只是段子", // 分享描述
    "title": "滴~滴滴，点亮段友回家的旅途" // 分享标题*/
};



let sharewxjson = {
    "webType": "0", //类型
    "title": "滴~滴滴，点亮段友回家的旅途", //分析的title名
    "url": "https://active.oalul.cn/activenhhomemap/tlrindex.html", //分享的链接
    "content": "内含的不只是段子", //描述
    "icon": "https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/activeallimgs/activemap/sharelogo.png"
};

let wxjsonstring = JSON.stringify(sharewxjson);
//ios获取的分享信息
function setShareContent() {
    return wxjsonstring;
} 
//调用安卓方法
// window.android.setShareContent(wxjsonstring);

function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

gettiken();
/*获取token*/
function gettiken() {
    $.ajax({
        url: path2 + '/activepage/getToken.do',
        cache: false, //false就不会从浏览器缓存中加载请求信息了
        type: "GET",
        dataType: "JSON",
        async: false,
        data: "",
        error: function (data) {
            //layer.msg("服务器未响应,请稍后再试!");
            //console.log("获取失败：");
            //console.log(data);
        }, 
        success: function (diskJson) {
            // console.log("token:");
            // console.log(diskJson);
            if (diskJson.code == "1000") {
                var jsapi_ticket = diskJson.data;
                var noncestr = randomString(16); //随机字符串
                var timestamp = Math.round(new Date() / 1000); //时间戳
                // var url="http://192.168.1.110:8081/workspace/activity/active.html";//分享网址
                var url = location.href; //分享网址
                var urlwx = wxfxxinfo.link + location.search; //分享网址
                //  var urlhash=location.search;
                //  url=url+urlhash;
                // console.log(url);
                wxfxxinfo.link = urlwx;
                // console.log("url::");
                // console.log(url);
                wxlist.timestamp = timestamp;
                wxlist.noncestr = noncestr;
                var shastr = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url;
                var signature = SHA2(shastr);
                wxlist.signature = signature;
                ////console.log("signature::");
                ////console.log(signature);
                config(wxlist);
                wxpz(wxfxxinfo)
            } else {

                // layer.msg("网络异常，请重试！！")
            }

        }
    });
}



//配置微信信息
function config(wxlist) {
    wx.config({
        debug: false, // true:调试时候弹窗
        appId: wxlist.appId, // 微信appid
        timestamp: wxlist.timestamp, // 时间戳
        nonceStr: wxlist.noncestr, // 随机字符串
        signature: wxlist.signature, // 签名
        jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'onMenuShareTimeline', // 分享到朋友圈接口
            'onMenuShareAppMessage', //  分享到朋友接口
            'onMenuShareQQ', // 分享到QQ接口
            'onMenuShareWeibo' // 分享到微博接口
        ]
    });
}

function getShare(wxjsonstring){
    //调用安卓方法
    // console.log('wxjsonstring:')
    // console.log(wxjsonstring)
    window.android.setShareContent(wxjsonstring);
}

function wxpz(wxfxxinfo) {
    // console.log('wxfxxinfo:')
    // console.log(wxfxxinfo)

    wx.ready(function () {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            imgUrl: wxfxxinfo.imgUrl,
            success: function () {
                magnitude("OVERTLR", "YES");
            },
            cancel: function () {}
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
                var tjdatas = {
                    "pagestr": "OVERTLR",
                    "needcount": "NO"
                };
                //console.log(tjdatas);
                tjdatas = JSON.stringify(tjdatas);
                $.ajax({
                    url: path2 + '/activepage/countactive.do',
                    cache: false, //false就不会从浏览器缓存中加载请求信息了
                    type: "POST",
                    contentType: "application/json",
                    dataType: "JSON",
                    async: false,
                    data: tjdatas,
                    error: function (data) {
                        /*  layer.msg("服务器未响应,请稍后再试!");*/
                        //console.log("获取失败：");
                        //console.log(data);
                    },
                    success: function (diskJson) {
                        //console.log("统计:");
                        //console.log(diskJson);
                        if (diskJson.code == "1000") {
            
                        } else {
            
                            /*  layer.msg("网络异常，请重试！！")*/
                        }
            
                    }
                });

            },
            cancel: function () {}
        });

        // 分享到QQ
        wx.onMenuShareQQ({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            desc: wxfxxinfo.desc,
            imgUrl: wxfxxinfo.imgUrl,
            success: function () {
                magnitude("OVERTLR", "YES");
            },
            cancel: function () {}
        });

        // 微信到腾讯微博
        wx.onMenuShareWeibo({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            desc: wxfxxinfo.desc,
            imgUrl: wxfxxinfo.imgUrl,
            success: function () {
                magnitude("OVERTLR", "YES");
            },
            cancel: function () {}
        });

        // 分享到QQ空间
        wx.onMenuShareQZone({
            title: wxfxxinfo.title,
            link: wxfxxinfo.link,
            desc: wxfxxinfo.desc,
            imgUrl: wxfxxinfo.imgUrl,
            success: function () {
                magnitude("OVERTLR", "YES");
            },
            cancel: function () {

            }
        });
    });
}

/*统计数量*/
function magnitude(pagestr, needcount) {
    var tjdatas = {
        "pagestr": pagestr,
        "needcount": needcount
    };
    //console.log(tjdatas);
    tjdatas = JSON.stringify(tjdatas);
    $.ajax({
        url: path2 + '/activepage/countactive.do',
        cache: false, //false就不会从浏览器缓存中加载请求信息了
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        async: false,
        data: tjdatas,
        error: function (data) {
            /*  layer.msg("服务器未响应,请稍后再试!");*/
            //console.log("获取失败：");
            //console.log(data);
        },
        success: function (diskJson) {
            //console.log("统计:");
            //console.log(diskJson);
            if (diskJson.code == "1000") {

            } else {

                /*  layer.msg("网络异常，请重试！！")*/
            }

        }
    });
}


/*function sharepostajx(){
    var ajax = new XMLHttpRequest();
    ajax.open('post', 'http://dev.api.toutushare.com/NHDZSEVER/activepage/countactive.do');
    ajax.setRequestHeader("Content-type", "application/json");
    var data = {
        needcount: 'YES',
        pagestr: 'OVERTLR'
    }
    data = JSON.stringify(data);
    ajax.send(data);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // console.log(JSON.parse(ajax.responseText));
        }
    }
}*/

/*
wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
   //console.log(res);
});*/
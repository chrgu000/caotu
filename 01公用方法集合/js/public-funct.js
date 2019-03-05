
/*-------------公用方法-----------*/

/*1-//数据转存excel*/
function getVirtulData() {
    var date = +echarts.number.parseDate(sTime);
    var end = +echarts.number.parseDate(eTime);
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date,i =0; i < dataList.length; time += dayTime,i++) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            dataList[i][0],dataList[i][1]
        ]);
    }
    //console.log(data);
    return data;
}
//导出通用方法,在onlick事件中调用getImport(table名称)即可
var idTmr;
function getExplorer() {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("MSIE") >= 0 || (explorer.indexOf("Windows NT 6.1;") >= 0 && explorer.indexOf("Trident/7.0;") >= 0)) {
        return 'ie';   //ie
    }
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';  //firefox
    }
    else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome'; //Chrome
    }
    else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera';  //Opera
    }
    else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari';   //Safari
    }
}

//此方法为ie导出之后,可以保留table格式的方法
function getIEsink(tableid) {
    var curTbl = document.getElementById(tableid);
    if (curTbl == null || curTbl == "") {
        alert("没有数据");
        return false;
    }
    var oXL;
    try {
        oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
    } catch (e) {
        alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" + "那么请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
        return false;
    }

    var oWB = oXL.Workbooks.Add();
    var oSheet = oWB.ActiveSheet;
    var sel = document.body.createTextRange();
    sel.moveToElementText(curTbl);
    sel.select();
    sel.execCommand("Copy");
    oSheet.Paste();
    oXL.Visible = true;
}

//此方法为ie导出之后,不保留table格式的方法
/*function getIEnotsink(tableid) {
 var curTbl = document.getElementById(tableid);
 if (curTbl == null || curTbl == "") {
 alert("没有数据");
 return false;
 }
 var oXL;
 try {
 oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
 } catch (e) {
 alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" + "那么请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
 return false;
 }

 var oWB = oXL.Workbooks.Add();
 var oSheet = oWB.ActiveSheet;
 var Lenr = curTbl.rows.length;
 for (i = 0; i < Lenr; i++) {
 var Lenc = curTbl.rows(i).cells.length;
 for (j = 0; j < Lenc; j++) {
 oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
 }
 }
 oXL.Visible = true;
 }
 */
function getImport(tableid) {
    if (getExplorer() == 'ie') {
        getIEnotsink(tableid);
    }
    else {
        tableToExcel(tableid);
    }
}

function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table border="1">{table}</table></body></html>',
        base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g,
                function (m, p) { return c[p]; })
        }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }

})();

//数据转存excel

/*2-时间搓转换*/
function formatDate(now){
    var   year=now.getFullYear();
    var   month=now.getMonth()+1;
    var   date=now.getDate();
    var   hour=now.getHours();
    var   minute=now.getMinutes();
    var   second=now.getSeconds();
    if(month<10){month="0"+month}
    if(date<10){date="0"+date}
    if(hour<10){hour="0"+hour}
    if(minute<10){minute="0"+minute}
    if(second<10){second="0"+second}
    return  year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
}

/*3-//通用的ajax调用*/
$(function(){
    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    jQuery.ax=function(url, data, async, type, dataType, successfn, errorfn) {
        async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
        type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
        dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: type,
            async: async,
            data: data,
            url: url,
            dataType: dataType,
            success: function(d){
                successfn(d);
            },
            error: function(e){
                errorfn(e);
            }
        });
    };

    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * successfn 成功回调函数
     */
    jQuery.axpost=function(url, data, successfn) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: "post",
            data: data,
            url: url,
            dataType: "json",
            success: function(d){
                successfn(d);
            }
        });
    };

    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    jQuery.axspost=function(url, data, successfn, errorfn) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: "post",
            data: data,
            url: url,
            dataType: "json",
            success: function(d){
                successfn(d);
            },
            error: function(e){
                errorfn(e);
            }
        });
    };

});

//时间格式转换
<!-- value 格式为13位unix时间戳 --> <!-- 10位unix时间戳可通过value*1000转换为13位格式 -->
$().ready(function() {
    <!-- 自定义filter名称为'time' -->
    Vue.filter('time', function(value)
    { var date = new Date(value);
        Y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            H = date.getHours(),
            i = date.getMinutes(),
            s = date.getSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        var t = Y + '-' + m + '-' + d;
        return t;
    })});




/*深度克隆*/
function cloneObject(obj) {
    var newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (var key in obj) {
        var val = obj[key];
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
        newObj[key] = typeof val === 'object' ? cloneObj(val): val;
    }
    return newObj;
};

/*ajax跨域*/
function ceshi(){
    $.ajax({
        type: "POST",
        dataType:"jsonp",
        jsonp: "jsonpcallback",
        url: 'https://tapi.jingtum.com/v2/accounts/jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF/payments',
        data:{},
        xhrFields: {
            withCredentials: true
        },
        // 允许跨域
        crossDomain: true,
        success: function (msg) {
            console.log("success:");
            console.log(msg);


        },
        error: function (request) {
            console.log("error:");
            console.log(request);


        }
    });
}



/*4-vue插入
* */
Vue.set(example1.items[index],'username',username);

/*5-微信API*/
var wxlist={"appId":"wx5527fcd602603a18","timestamp":"","nonceStr":"","signature":""};
var wxfxxinfo={"imgUrl":"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/sharicon.png",
    "link" : "https://cdn.toutushare.com/activity_zhongqiu/active.html",
    "desc" : "中秋专属月相",   // 分享描述
    "title" : "解锁月相，发现未知的自己"   // 分享标题*/
};

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
            ////console.log("token:");
            ////console.log(diskJson);
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

/*6-图片转base64*/
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

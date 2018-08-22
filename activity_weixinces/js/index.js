/**
 * Created by zhu on 2018/5/31.
 */


const path="https://api.itoutu.com:8898/";//线上
//const path3="https://dev.api.toutushare.com/";//测试服
const path4="http://192.168.1.111:8091/";//老冯
var result={
    "grade":0,//分数
    "dog":"",//狗名
    "evaluate":"",//结果评论
    "sex":1,//性别
    "dogimg":"",//狗的图片
    "username":"",//用户名
    "mgc":0//是否有敏感词0没有1有
};
/*随机字符串*/
function randomString(len) {
    len = len || 16;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/*手机类型&浏览器类型*/
function phoneType() {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){

        //console.log("微信打开");
        return 1;
    }else if(ua.match(/QQ/i) == "qq"){
        //console.log("qq");
        return "qq";
    }

    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串


    if (userAgent.indexOf("Opera") > -1) {

        return "Opera"

    }; //判断是否Opera浏览器

    if (userAgent.indexOf("Firefox") > -1) {

        return "FF";

    } //判断是否Firefox浏览器

    if (userAgent.indexOf("Chrome") > -1){

        return "Chrome";

    }

    if (userAgent.indexOf("Safari") > -1) {

        return "Safari";

    } //判断是否Safari浏览器

    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {

        return "IE";

    }

}
function phoneType2() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        //console.log("Android");
        return 2;
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        //console.log("苹果手机");
        return 3;
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        //console.log("winphone手机");
        return 4;
    }


}



//Js实现Base64编码、解码
//下面是64个基本的编码

//解码的方法
function base64decode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars = new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while(i < len) {

        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c1 == -1);
        if(c1 == -1)
            break;

        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c2 == -1);
        if(c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if(c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while(i < len && c3 == -1);
        if(c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if(c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while(i < len && c4 == -1);
        if(c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
        c = str.charCodeAt(i++);
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += str.charAt(i-1);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                ((char2 & 0x3F) << 6) |
                ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}

/*js通过两种方法获取url传递参数：*/
function GetRequest(url) {
    /* var url = location.search; //获取url中"?"符后的字串*/
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


/*铭感词*/
function ismgc(checkword){
    var tjdatas={"checkword":checkword};
    tjdatas=JSON.stringify(tjdatas);
    $.ajax({
        url : path+'CTKJSEVER/content/sencheck.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        dataType:"JSON",
        contentType: "application/json",
        async:false,
        data: tjdatas,
        error: function(data){
            //console.log("获取失败：");
            //console.log(data);
        },
        success:function(diskJson){
            //console.log("铭感词:");
            //console.log(diskJson);
            if(diskJson.code =="1000" && diskJson.data == "Y"){
                $(".creatUsernameBox .tips").addClass("show").html("碰到敏感词啦，改一下呗");
                result.mgc=1;
            }else{
                result.mgc=0;
                saveni(checkword);

            }

        }
    });

}

/*保存昵称*/
function saveni(checkword){
    var tjdatas={"name":checkword};
    tjdatas=JSON.stringify(tjdatas);
    $.ajax({
        url : path+'CTKJSEVER/activepage/putothername.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        dataType:"JSON",
        contentType: "application/json",
        async:true,
        data: tjdatas,
        error: function(data){
            console.log("获取失败：");
            console.log(data);
        },
        success:function(diskJson){
            //console.log("保存昵称:");
            //console.log(diskJson);
            if(diskJson.code =="1000" && diskJson.data.nickname){


            }else{

            }

        }
    });

}




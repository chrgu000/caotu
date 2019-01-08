/**
 * Created by zhu on 2018/5/31.
 */
//
// const path="http://192.168.1.114:8860/NHDZSEVER";
// const path2="http://192.168.1.114:8860/NHDZSEVER";


/*线上改*/
const path="https://api.itoutu.com:8899/NHDZSEVER";
const path2="https://api.itoutu.com:8899/NHDZSEVER";

function check(diskJson) {
    // 保存缓存
    // console.log(diskJson);
    localStorage.userdata = diskJson;

}

function getload() {
    // 读取缓存
    if (localStorage.userdata) {
        // console.log(localStorage.userdata);
        var userdata=JSON.parse(localStorage.userdata);
        // console.log(userdata);
        return userdata;
    }
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


/*------自定义的图片左右切换--------*/
/*关闭图片展示*/
function closeimg(){
    $("#faxAllBox").removeClass("show");
    $("#faxAllBox ul").empty();
}
/*禁止浏览器左滑返回*/
document.addEventListener('touchmove',function(e){
    if($("#faxAllBox").hasClass("show")){
        e.preventDefault();
    }

}, false);
/*展示图片的左右滑动*/
var startPoint = null;
document.addEventListener("touchstart",function(e){
    var e = e||window.event;
    startPoint = e.touches[0];
})
document.addEventListener("touchend",function(e){
    var e=e||window.event;
    //e.changedTouches能找到离开手机的手指，返回的是一个数组
    var endPoint = e.changedTouches[0];
    //计算终点与起点的差值
    var x = endPoint.clientX - startPoint.clientX;
    var y = endPoint.clientY - startPoint.clientY;
    //设置滑动距离的参考值
    var d = 10;
    var sn=Number($("#faxAllBox .toptip b.pre").html());//当前图片页
    var an=Number($("#faxAllBox .toptip b.all").html());//所有图片的数量
    var w=$("#faxAllBox ul li").width();
    w=w+"px";
    if(Math.abs(x)>d){
        if(x>0){
            //console.log("向右滑动");
            if(sn>1){
                $("#faxAllBox .toptip b.pre").html(sn-1);
                $("#faxAllBox ul li:nth-child("+(sn-1)+")").css("margin-left","-"+w).addClass("show").animate({
                    marginLeft:0
                },250);
            }
        }else{
            if(sn<an){
                $("#faxAllBox .toptip b.pre").html(sn+1);
                $("#faxAllBox ul li:nth-child("+(sn+1)+")").addClass("show");
                $("#faxAllBox ul li:nth-child("+sn+")").animate({
                    marginLeft:"-"+w
                },250);

                // console.log("向左滑动");
            }

        }
    }
    /*  if(Math.abs(y)>d){
     if(y>0){
     console.log("向下滑动");
     if(sn>1){
     $("#faxAllBox .toptip b.pre").html(sn-1);
     $("#faxAllBox ul li").slideUp();
     $("#faxAllBox ul li:nth-child("+(sn-1)+")").slideDown();

     }
     }else{
     console.log("向上滑动");
     if(sn<an){
     $("#faxAllBox .toptip b.pre").html(sn+1);
     $("#faxAllBox ul li").slideUp();
     $("#faxAllBox ul li:nth-child("+(sn+1)+")").slideDown();
     // console.log("向左滑动");
     }
     }
     }*/

});


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

/*随机数*/
function randomnum(minNum,maxNum){
    var num=parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
    return num;
}
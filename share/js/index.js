/**
 * Created by zhu on 2018/5/31.
 */

/*const path="http://192.168.1.114:8807";
const path2="http://192.168.1.114:8807";*/

/*线上*/
const path="http://118.126.68.108:8808";
const path2="http://118.126.68.108:8808";


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

})
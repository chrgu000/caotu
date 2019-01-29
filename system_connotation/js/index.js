

 // const path="http://192.168.1.111:8080/NHDZBUSINESS";//老冯
 // const path2="http://192.168.1.111:8080/NHDZBUSINESS";//老冯
// const path="http://192.168.1.114:8868/NHDZBUSINESS";//测试服务器
// const path2="http://192.168.1.114:8868/NHDZBUSINESS";//测试服务器


/*线上*/
// const path="http://192.168.1.114:8878/NHDZBUSINESS";
// const path2="http://192.168.1.114:8878/NHDZBUSINESS";
const path="http://101.69.230.98:8878/NHDZBUSINESS";
const path2="http://101.69.230.98:8878/NHDZBUSINESS";


var userdatas=getload();
/*console.log("用户信息userdatas：");
 console.log(userdatas);*/

/*ajax请求成功后判断*/
$(document).ajaxSuccess(function(event,xhr,options){
    //console.log("xhr:");
    //console.log(xhr);
    if(xhr.responseJSON){
        if(xhr.responseJSON.code == "1024"){
            layer.msg("登陆失效请重新登陆！！！");
            setTimeout(function(){
                window.location.href="login.html";
            },1000)
        }
    }
});



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



/*翻页*/
/*下一页*/
function nextpage(callback){
    var page=parseInt($("#addpageinput").val());
    var allpage=parseInt($("#allpage").html());
  /*  console.log(page);
    console.log(allpage);*/
    if(page < allpage){
        if(callback && callback!=""){
            callback(page+1)
        }else{
            getcheck(page+1);
        }

    }
}
/*上一页*/
function prepage(callback){
    var page=parseInt($("#addpageinput").val());
    var allpage=parseInt($("#allpage").html());
  /*  console.log(page);
    console.log(allpage);*/
    if(page >1){
        if(callback && callback!=""){
            callback(page-1)
        }else{
            getcheck(page-1);
        }
    }
}
/*跳转到页面*/
function jumppage(callback){
    var page=parseInt($("#addpageinput").val());
    if(callback && callback!=""){
        callback(page);
    }else{
        getcheck(page);

    }

}

/*页面信息*/
function pageinfo(data,pageno){
    var num=data.TotalCount;
    $("#pagerlist #allconts").html("共"+num+"条");
    $("#pagerlist #addpageinput").val(pageno).attr("max",Math.ceil(num/10));
    $("#pagerlist #allpage").html( Math.ceil(num/10));
}

function pageinfo2(data,pageno){
    var num=data.count;
    var pi=data.pagesize;
    $("#pagerlist #allconts").html("共"+num+"条");
    $("#pagerlist #addpageinput").val(pageno).attr("max",Math.ceil(num/pi));
    $("#pagerlist #allpage").html( Math.ceil(num/pi));
}
/*页面信息自定*/
function pageinfo3(pageno,num,pi){
    $("#pagerlist #allconts").html("共"+num+"条");
    $("#pagerlist #addpageinput").val(pageno).attr("max",Math.ceil(num/pi));
    $("#pagerlist #allpage").html( Math.ceil(num/pi));
}

/*获取随机ID*/
function genID(length){
    var x= Math.random(length).toString(36).substr(3,length);
    var date= Date.now().toString(36);
    return x+date;
}

/*获取指定位数的数字*/
function getNum(length){
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var nums="";
    for(var i=0;i<(length-13);i++){
        var id = parseInt(Math.random()*61);
        nums+=chars[id];
    }
    var d=String(Date.now());
    return nums+d;
}


/*获取当前时间*/
function getmytime(){
    var myDate = new Date();
    var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month=myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    if(month<9){
            month="0"+(month+1)
        }else{month=month+1;}
        var day=myDate.getDate();        //获取当前日(1-31)
        if(day<10){
            day="0"+day
        }
        var h= myDate.getHours();       //获取当前小时数(0-23)
        if(h<10){
            h="0"+h
        }
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        if(m<10){
            m="0"+m
    }
   var s=myDate.getSeconds();     //获取当前秒数(0-59)
    if(s<10){
        s="0"+s
    }
    var ctime=String(year)+String(month)+String(day)+String(h)+String(m)+String(s);
    return ctime;
}

/*获取当前时间到日*/
function getmytime2(){
    var myDate = new Date();
    var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month=myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    if(month<9){
        month="0"+(month+1)
    }else{month=month+1;}
    var day=myDate.getDate();        //获取当前日(1-31)
    if(day<10){
        day="0"+day
    }

    var ctime=String(year)+String(month)+String(day);
    return ctime;
}

/*过滤emoji表情*/
function filteremoji(emojireg){
    var ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]'
    ];
  /*  var emojireg = $("#emoji_input").val();*/
    emojireg = emojireg .replace(new RegExp(ranges.join('|'), 'g'), '');
    //console.log(emojireg);
    return emojireg;
}

//js正则匹配过滤 特殊字符
function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}



//通用的ajax调用
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
    jQuery.ax=function(url, data, async, type, dataType,contentType, successfn, errorfn) {
        async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
        type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
        dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: type,
            async: async,
            contentType:contentType,
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
/*$().ready(function() {
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
    })});*/
$().ready(function() {
 <!-- 自定义filter名称为'time' -->
 Vue.filter('time', function(value)
 {
     if(value && value!=""){
         if(value.length >=8){
             var tt=value.slice(0,4)+"-"+value.slice(4);
             tt=tt.slice(0,7)+"-"+tt.slice(7);
             if(value.length >=12){
                 tt=tt.slice(0,10)+" "+tt.slice(10);
                 tt=tt.slice(0,13)+":"+tt.slice(13);
                 tt=tt.slice(0,16)+":"+tt.slice(16);
             }
             return tt;
         }else{
             return value;
         }


     }

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
}

/*数组去重*/
function unique10(arr){
    //Set数据结构，它类似于数组，其成员的值都是唯一的
    return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
}

/*随机数*/
function randomnum(minNum,maxNum){
    var num=parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
    return num;
}

/*获取不同时间段的时间*/
function gettime(time){
    var date = new Date();
    date.setDate(date.getDate() +time);
    var year=date.getFullYear();    //获取完整的年份(4位,1970-????)
    var month=date.getMonth();       //获取当前月份(0-11,0代表1月)
    var day=date.getDate();        //获取当前日(1-31)

    if(month<9){
        month="0"+(month+1)
    }else{month=month+1;}
    if(day<10){
        day="0"+day
    }
    var timedata=String(year)+String(month)+String(day);
    return timedata;
}

/*下载文档*/
function downloadFile(url) {
    try{
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
    }catch(e){
        layer.msg("下载异常！");
    }
}


/*------自定义的图片左右切换--------*/
/*关闭图片展示*/
function closeimg(){
    $("#faxAllBox").removeClass("show");
    $("#faxAllBox ul").empty();
}
//往左
    function turnleftfun(){
        var sn=Number($("#faxAllBox .toptip b.pre").html());//当前图片页
        var an=Number($("#faxAllBox .toptip b.all").html());//所有图片的数量
        var w=$("#faxAllBox ul li").width();
        w=w+"px";

        if(sn>1){
            $("#faxAllBox .toptip b.pre").html(sn-1);
            $("#faxAllBox ul li:nth-child("+(sn-1)+")").css("margin-left","-"+w).addClass("show").animate({
                marginLeft:0
            },250);
        }

    }

//往右
function turnrightfun(){
    var sn=Number($("#faxAllBox .toptip b.pre").html());//当前图片页
    var an=Number($("#faxAllBox .toptip b.all").html());//所有图片的数量
    var w=$("#faxAllBox ul li").width();
    w=w+"px";

    if(sn<an){
        $("#faxAllBox .toptip b.pre").html(sn+1);
        $("#faxAllBox ul li:nth-child("+(sn+1)+")").addClass("show");
        $("#faxAllBox ul li:nth-child("+sn+")").animate({
            marginLeft:"-"+w
        },250);

        // console.log("向左滑动");
    }
}

/*图片转为base64资源*/
function runbase64asc(imgUrl){
    var p = new Promise(function(resolve, reject){
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        var base64="";
        xhr.open("get", imgUrl, true);
        // 至关重要
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                //得到一个blob对象
                var blob = this.response;
                //   console.log("blob", blob);
                // 至关重要
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    base64 = e.target.result;
                    resolve(base64);
                    // console.log("方式一》》》》》》》》》", base64)
                };
                oFileReader.readAsDataURL(blob);

            }
        };
        xhr.send();
    });
    return p;
}

function runbase64(url) {
    var cav= document.createElement("canvas");
    var ctx=cav.getContext("2d");
    var img = new Image();
    img.src = url;
    img.crossOrigin = '*';//解决跨域问题，需在服务器端运行，也可为 anonymous
    img.onload = function () {
        ctx.drawImage(img, 0, 0);//img转换为canvas
        ctx.fillRect(0, 0, 50, 50);
        var base64 = cav.toDataURL('images/png');//注意是canvas元素才有 toDataURL 方法
        //console.log(base64);
        $('#bas64img')[0].src = base64;//canvas 转换为 img
    }
}

/*v预处理图片缓存*/
function cacheExternalImage(url){
    var img = new Image,
        src = url,
        cvs = document.createElement('canvas'),
        ctx = cvs.getContext('2d');
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        //ctx.drawImage( img, 0, 0 );
    }
    img.src = src;
    if ( img.complete || img.complete === undefined ) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }

    let yimgsrc=img.src;
    runbase64(yimgsrc);
}





 /*
*  监听点击日期时的事件
*/
/*
 $('#pushtime').datetimepicker({
     onSelectDate: function(dateText, inst) {
         let chodat=$('#pushtime').val();
         chodat=Date.parse(new Date(chodat));
         var stime = Date.parse(new Date());
         var usedTime = chodat - stime;  //两个时间戳相差的毫秒数
         var days=Math.floor(usedTime/(24*3600*1000));
         if(days<-1){
             layer.msg("选择的时间不能早于当天！！")
         }else if(days>6){
             layer.msg("选择的时间不能晚于7天！！")
         }
     }
 });*/

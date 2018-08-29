

const path4="http://192.168.1.111:8080";//老冯
const path="http://192.168.1.114:8818";//测试服务器
const path2="http://192.168.1.114:8818";//测试服务器


/*线上*/
//const path="http://192.168.1.114:8828";
//const path2="http://192.168.1.114:8828";

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
                window.location.href="../../login.html";
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
function nextpage(){
    var page=parseInt($("#addpageinput").val());
    var allpage=parseInt($("#allpage").html());
  /*  console.log(page);
    console.log(allpage);*/
    if(page < allpage){
        getcheck(page+1);
    }
}
/*上一页*/
function prepage(){
    var page=parseInt($("#addpageinput").val());
    var allpage=parseInt($("#allpage").html());
  /*  console.log(page);
    console.log(allpage);*/
    if(page >1){
        getcheck(page-1);
    }
}
/*跳转到页面*/
function jumppage(){
    var page=parseInt($("#addpageinput").val());
    getcheck(page);
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

/*获取当前时间*/
function getmytime(){
    var myDate = new Date();
    var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month=myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    if(month<10){
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
    if(month<10){
        month="0"+(month+1)
    }else{month=month+1;}
    if(day<10){
        day="0"+day
    }
    var timedata=year+month+day;
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


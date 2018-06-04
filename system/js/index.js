$(function(){
    //菜单点击
    $(".navupstage").delegate('li a','click',function(){
        var url = $(this).attr('href');
        //console.log(url);
        $("#J_iframe").attr('src','packges/'+url);
        return false;
    });
    $("#homehre").click(function(){
        var url = $(this).attr('href');
       //console.log(url);
        $("#J_iframe").attr('src','packges/'+url);
        return false;
    });
});

/*const path="http://192.168.1.111:8080";*/
/*const path="http://192.168.1.112:8080";
const path2="http://192.168.1.112:8080";*/
const path="http://192.168.1.114:8818";
const path2="http://192.168.1.114:8818";

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
const userdatas=getload();
console.log("用户信息userdatas：");
console.log(userdatas);


/*翻页*/
/*下一页*/
function nextpage(){
    var page=parseInt($("#addpageinput").val());
    var allpage=parseInt($("#allpage").html());

    if(page < allpage){
        //console.log(page)
        getcheck(page+1);
    }
}
/*上一页*/
function prepage(){
    var page=parseInt($("#addpageinput").val());
    var allpage=parseInt($("#allpage").html());

    if(page >1){
       // console.log(page)
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


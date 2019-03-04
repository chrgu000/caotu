var userinfolist={//用户信息
    "appticket":"",
    "userid":"",
    "codec":"isstatus.html",
    "isfull":0,//人数是否已满
    "ishave":0,//审核资格
    "istest":0,//测试资格
    "isapp":0
};
/*跳转的链接统一设置*/
 // var linkurlchoose="https://active.diqyj.cn/appcheckedh5page_nhdz/dfguardian.html";//线上
var linkurlchoose="https://active.diqyj.cn/appcheckedh5page_nhdz2/dfguardian.html";//测试
//设定假的
/*   let appdatta={
       "userid":"71XfPUbYx6SFlz+Opwg7YmJsExxMQraZlI2d16ealeAem4yI+i0+Ag==",//userid加密
       "appticket":"67f570fb8dce4c45ad5e9f858ec002b5"//key
   };
   userinfolist.appticket=appdatta.appticket;
   userinfolist.userid=appdatta.userid;*/

/*获取app的参数*/
$(function(){
    var index = layer.load(0, {
        shade: [0.4,'#333'] //0.1透明度的白色背景
    });
    var ua = navigator.userAgent;
    if(ua.match(/Android/i) != null){
        try {
            let getdata=window.android.callappforkey();
            let getdata2=JSON.parse(getdata);
            userinfolist.appticket=getdata2.key;
            userinfolist.userid=getdata2.userid;
            userinfolist.isapp=1;
            // $("#show").html(getdata2.userid+","+getdata2.key);
            isstatus(getdata2);
        } catch (e) {

            setTimeout(function(){
                if(userinfolist.isapp==0){
                    userstatusvue.checkurl="isshare.html";
                }
            },1500)
        }//android代码
    }
});


function callappforkey(parm){
    //console.log(parm);
    if(parm && parm != null && parm !=undefined && parm !=""){
        let getdata2=JSON.parse(parm);
        userinfolist.appticket=getdata2.key;
        userinfolist.userid=getdata2.userid;
        userinfolist.isapp=1;
        isstatus(getdata2);

    }else{

        localStorage.userinfolist=JSON.stringify(userinfolist) ;//存缓存;
      //  window.webkit.messageHandlers.jumpPageIos.postMessage("https://active.diqyj.cn/appcheckedh5page_nhdz2/dfguardian.html");//调用ios方法
        window.location.href =linkurlchoose;
    }

}

/*let getdata2={"key":"123","userid":"456"};
isstatus(getdata2)*/
function isstatus(getdata2){

    // $("#show3").html("codea："+getdata2.key+"codeb："+getdata2.userid+"codec：isstatus.html");
    var datapost={"codea":getdata2.key,"codeb":getdata2.userid,"codec":"isstatus.html"};
    datapost=JSON.stringify(datapost);
    $.ajax({
        url : path+'/webcheck/webGetApt.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:true,
        data: datapost,
        error: function(data){
            // alert("error");
            localStorage.userinfolist=JSON.stringify(userinfolist) ;//存缓存;
            window.location.href =linkurlchoose;
            // window.webkit.messageHandlers.jumpPageIos.postMessage("https://active.diqyj.cn/appcheckedh5page_nhdz2/dfguardian.html");//调用ios方法
        },
        success:function(diskJson){
            // console.log("获取审核资格：");
            // console.log(diskJson);
            if(diskJson.code=="1000"){
                // alert(1000);
                userinfolist.isfull=diskJson.data.isfull;
                userinfolist.ishave=diskJson.data.ishave;
                userinfolist.istest=diskJson.data.istest;
                localStorage.userinfolist =JSON.stringify(userinfolist) ;//存缓存
                localStorage.istest ="0" ;//存缓存
                if(diskJson.data.ishave ==1){
                    //window.location.href ="https://active.diqyj.cn/appcheckedh5page_nhdz/checkedindex.html";//线上
                    window.location.href ="https://active.diqyj.cn/appcheckedh5page_nhdz2/checkedindex.html";//测试
                    return false;
                }else{
                    window.location.href =linkurlchoose;
                    return false;
                }

            }else{
                localStorage.userinfolist=JSON.stringify(userinfolist) ;//存缓存;
                window.location.href =linkurlchoose;
                return false;
            }


        }
    })
}
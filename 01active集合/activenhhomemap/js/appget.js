// const path = "https://dev.api.toutushare.com/NHDZSEVER"; //测试
// const path="http://192.168.1.114:8860/NHDZSEVER";//测试
/*线上改*/
const path="https://api.itoutu.com:8899/NHDZSEVER";


var userinfolist = { //用户信息
    "key": "",
    "userid": "",
    "codec": "index.html",
    "apppage": 0,
    "apptype": "web",
};

/*获取app的参数*/
$(function () {
    var ua = navigator.userAgent;
    if (ua.match(/Android/i) != null) {
        try {
            let getdata = window.android.callappforkey();
            getdata = JSON.parse(getdata);
            userinfolist.appticket = getdata.key;
            userinfolist.userid = getdata.userid;
            if (getdata.apppage && getdata.apppage != undefined) {
                userinfolist.apppage = getdata.apppage;
            }
            userinfolist.apptype = getdata.apptype;
            localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
            getUserInfo(getdata);
            if (getdata.userid == "") {
                // $('#video').get(0).pause();
                // window.android.weblogin(); //调用登陆页面
            } else {
                getUserInfo(getdata);
            }

        } catch (e) {
            localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
        } //android代码
    }
});

/*IOS调用获取到用户userid和KEY*/
function callappforkey(parm) {
    //console.log(parm);
    if (parm && parm != null && parm != undefined && parm != "") {
        let getdata = JSON.parse(parm);
        userinfolist.appticket = getdata.key;
        userinfolist.userid = getdata.userid;
        userinfolist.apppage = getdata.apppage;
        userinfolist.apptype = getdata.apptype;
        localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
        getUserInfo(getdata);
        if (getdata.userid == "") {
            // $('#video').get(0).pause();
            // window.webkit.messageHandlers.weblogin.postMessage({}); //调用ios方法
        } else {
            getUserInfo(getdata);
        }
    } else {
        localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
    }

}

setTimeout(function () {
    if (userinfolist.apptype == "web") {
        localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
        localStorage.userinfodatas = "";
    }
}, 1500);

function getUserInfo(getdata2) {
    //$("#show").html("codea："+getdata2.key+"codeb："+getdata2.userid);
    var datapost = {
        "codeb": getdata2.userid,
        "activenum": "TLR001",
        "isremark": "YES"
    };
    datapost = JSON.stringify(datapost);
    $.ajax({
        url: path + '/webcheck/webinfo.do',
        cache: false, //false就不会从浏览器缓存中加载请求信息了
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        async: true,
        data: datapost,
        error: function (data) {
            localStorage.userinfodatas = "";
            // alert("error");
            //localStorage.removeItem('userinfodatas');
            // window.webkit.messageHandlers.jumpPageIos.postMessage("https://active.diqyj.cn/appcheckedh5page_nhdz2/dfguardian.html");//调用ios方法
        },
        success: function (diskJson) {
            console.log("获取审核资格：");
            console.log(diskJson);
            // $("#show").html(diskJson.data);
            if (diskJson.code == "1000") {
                // alert(1000);
                localStorage.userinfodatas = JSON.stringify(diskJson.data); //存缓存
                // $('#show').text(JSON.stringify(diskJson.data))
            } else {
                localStorage.userinfodatas = ""
                //localStorage.removeItem('userinfodatas');
            }


        }
    })
}
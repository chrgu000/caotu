/*------------app调用方法------------*/
    /*1-app登录名*/
    window.android.weblogin();
    window.webkit.messageHandlers.weblogin.postMessage(null);//调用ios方法

    /*2-1 主动调用的分享方法名（有弹框的）*/
    let share={
        "webType":"0",//类型0：url,1：图片
        "title":"",//分析的title名
        "url":"",//分享的链接
        "content":"",//描述
        "icon":""
    };
    share=JSON.stringify(share);
    window.android.shareweb(share);
    window.webkit.messageHandlers.shareweb.postMessage(share);//调用ios方法

    //2-2设置app默认分享的信息
    window.android.setShareContent(share);
    window.webkit.messageHandlers.setShareContent.postMessage(share);//调用ios方法


    /*3-获取用户的userid和key*/
        /*{    "key":"",
            "userid":"",
            "apppage":0,//从app哪个页面进入的splash:闪屏/banner:发现页banner/recommend:推荐列表/notice:推送通知/user：我的个人中心/other_user:他人的个人中心/other:其他
            "apptype":0,//Android/iOS
        }*/
    var ua = navigator.userAgent;
    if(ua.match(/Android/i) != null){
        try {
            let getdata=window.android.callappforkey();//安卓的方法
            let getdata2=JSON.parse(getdata);
            // $("#show").html(getdata2.userid+","+getdata2.key);
        } catch (e) {

        }//android代码
    }
    //IOS的获取方法
        function callappforkey(parm){
            //console.log(parm);
            if(parm && parm != null && parm !=undefined && parm !=""){
                let getdata2=JSON.parse(parm);

            }else{

            }

        }


    /*4-关闭APP的方法*/
        if(ua.match(/iPhone|iPod|iPad/i) != null){
            try {
                window.webkit.messageHandlers.closeapp.postMessage(null);//调用ios方法
            } catch (e) {
                console.log(e)
            }//iphone代码
        }
        else if(ua.match(/Android/i) != null){
            try {
                window.android.closeapp();

            } catch (e) {
                console.log(e)
            }//android代码
        } else{
            // alert("不在app");
            //$("#show").html("不在app");
        }


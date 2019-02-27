// const path = "https://dev.api.toutushare.com/NHDZSEVER"; //测试
// const path="https://dev.api.toutushare.com/NHDZSEVER";//测试
// const path = "http://192.168.1.114:8860/NHDZSEVER"; //测试
/*线上改*/
const path="https://api.itoutu.com:8899/NHDZSEVER";


var userinfolist = { //用户信息
    "key": "",
    "userid": "",
    "codec": "",
    "apppage": 0,
    "apptype": "web",
};
var cardlistdata="",userinfodata="";



/*获取app的参数*/
$(function () {
    var ua = navigator.userAgent;
    if (ua.match(/Android/i) != null) {
        try {
            let getdata = window.android.callappforkey();
            getdata = JSON.parse(getdata);
            // $('#show').text(JSON.stringify(getdata))
            $("#wantGet").remove();
            userinfolist.appticket = getdata.key;
            userinfolist.userid = getdata.userid;
            if (getdata.apppage && getdata.apppage != undefined) {
                userinfolist.apppage = getdata.apppage;
            }
            userinfolist.apptype = getdata.apptype;
            getUserInfo(getdata);
            getCardList(getdata);
            webCardApt(getdata);
            appreload();

        } catch (e) {
            // localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
        } //android代码
    }
});

/*IOS调用获取到用户userid和KEY*/
function callappforkey(parm) {
    //console.log(parm);
    if (parm && parm != null && parm != undefined && parm != "") {
        let getdata = JSON.parse(parm);
        $("#wantGet").remove();
        userinfolist.appticket = getdata.key;
        userinfolist.userid = getdata.userid;
        userinfolist.apppage = getdata.apppage;
        userinfolist.apptype = getdata.apptype;

        getUserInfo(getdata);
        // if(getdata.apppage == 'user'){
        getCardList(getdata);
        webCardApt(getdata);
        appreload();

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

// 获取卡片信息
function getCardList(cardlist) {
    var data = {
        "codea": cardlist.key,
        "codeb": cardlist.userid,
        "codec": "gmkindex.html",
    }
    data = JSON.stringify(data);
    $.ajax({
        url: path + '/webcard/webGetCardList.do',
        cache: false, //false就不会从浏览器缓存中加载请求信息了
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        async: true,
        data: data,
        error: function (err) {
            localStorage.userinfodatas = "";
            // alert("error");
            //localStorage.removeItem('userinfodatas');
            // window.webkit.messageHandlers.jumpPageIos.postMessage("https://active.diqyj.cn/appcheckedh5page_nhdz2/dfguardian.html");//调用ios方法
        },
        success: function (res) {
            // console.log("获取审核资格：");
            // console.log(res);

            if (res.code == "1000") {
                // alert(1000);
                // localStorage.cardList = JSON.stringify(res.data); //存缓存
                // var str = '';
                var dataurl = [];
                for (var i = 0; i < res.data.length; i++) {
                    dataurl.push({
                        src: res.data[i].cardurljson.bgurl,
                        cardid: res.data[i].cardid
                    })
                    //     str += '<div class="img">'+
                    //     '<div class="userinfo">'+
                    //         '<img src="images/11.jpg" alt="" class="userphone">'+
                    //         '<p class="name">菜菜菜</p>'+
                    //         '<p>性别<span class="sex">女</span></p>'+
                    //         '<p>段友号<span class="dyh">123456</span></p>'+
                    //         '<p>有效期<span class="indate">2018.01.01-2019.01.01</span></p>'+
                    //         '<img src="images/erweima.png" alt="" class="erweima">'+
                    //         '<img src="images/scancode.png" alt="" class="scancode">'+
                    //     '</div>'+
                    //     '<img src='+res.data[i].cardurljson.bgurl+'/>'+
                    // '</div>'
                }
                cardlistdata=dataurl;
                localStorage.setItem('dataurl', JSON.stringify(dataurl));
                // $('#slide').prepend(str);
                // $('#slide').html(template('cardlist',datalist))

            } else {
                localStorage.cardList = ""
                //localStorage.removeItem('userinfodatas');
            }

        }
    })
}


function getUserInfo(getdata2) {
    //$("#show").html("codea："+getdata2.key+"codeb："+getdata2.userid);

    var datapost = {
        "codeb": getdata2.userid,
        "activenum": "GMK001",
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
            // console.log("获取审核资格：");
            // console.log(diskJson);
            // $("#show").html(JSON.stringify(diskJson));
            if (diskJson.code == "1000") {
                // alert(1000);
                userinfodata=diskJson.data;
                localStorage.carduserinfo = JSON.stringify(diskJson.data); //存缓存

                //获取公民卡个人信息
                var myDate = new Date();
                var month = myDate.getMonth();
                if (month <= 8) {
                    month = '0' + (month + 1);
                } else {
                    month = month + 1;
                }
                $('.name').text(diskJson.data.username);
                if (diskJson.data.usersex == '0') {
                    $('.sex').text('男');
                } else if (diskJson.data.usersex == '1') {
                    $('.sex').text('女');
                } else {
                    $('.sex').text('保密');
                }
                $('.dyh').text(diskJson.data.uno);
                $('.indate').text(myDate.getFullYear() + '.' + month + '.' + myDate.getDate() + '-' + (myDate.getFullYear() +
                    1) + '.' + month + '.' + myDate.getDate());
                $('.userphone').attr('src', diskJson.data.userheadphoto);
                $('#show').text(JSON.stringify(diskJson.data))


            } else {
                localStorage.carduserinfo = "";
                //localStorage.removeItem('userinfodatas');
            }

        }
    })
}

function webCardApt(cardData) {
    var data = {
        "codea": cardData.key,
        "codeb": cardData.userid,
        "codec": "gmkindex.html",
        "coded": ''
    }
    data = JSON.stringify(data);
    $.ajax({
        url: path + '/webcard/webCardApt.do',
        cache: false,
        type: 'post',
        contentType: "application/json",
        dataType: "JSON",
        async: true,
        data: data,
        success: function (res) {
            // $('#show').text(JSON.stringify(res));

            if (res.code == "1000") {
                $("#wantGet").attr("href","mycard.html");
                localStorage.ctcardData = JSON.stringify(res.data); //存缓存
                //判断用户的完成进度
                if (res.data.ATP.indexOf('6')!=-1) {
                    $('.date').text(res.data.logday);
                    $('.hour').text('6').css('color','#000');
                    $('.sixhour').css('color','#000');
                    $('.game').attr('src', 'images/louti_2.png')
                } else if (res.data.ATP == 'ALL') {
                    $('.hour').text('6').css('color','#000');
                    $('.date').text('7').css('color','#000');
                    $('.sevendate').css('color','#000');
                    $('.sixhour').css('color','#000');                    
                    $('.game').attr('src', 'images/louti_3.png');

                } else if(res.data.ATP.indexOf('7')!= -1){
                    $('.date').text('7').css('color','#000');
                    $('.sevendate').css('color','#000');
                    $('.hour').text(Math.floor(res.data.online*15/3600));
                    $('.game').attr('src', 'images/louti_4.png')
                } else {
                    $('.hour').text(Math.floor(res.data.online*15/3600));
                    $('.date').text(res.data.logday);
                }
            } else {
                localStorage.ctcardData = ""
            }
        }
    })
}

//渲染公民卡
function slideimg() {
    // let imgurl = cardlistdata;
    // let userlist=userinfodata;
    let imgurl = [
        {src: "https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/00001752528e4b5b9c0c1f6b55178e8f.jpg", cardid: "001"},
        {src: "https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/00009b9a3c654a1aae2b43c784c5f9b7.jpg", cardid: "002"},
        {src: "https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/0000ca307336492ebcf9bfdab8073a59.jpg", cardid: "003"},
        {src: "https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/0000b2f0837847d296c82cd74c32384c.jpg", cardid: "004"},
    ];
    let userlist={
        "uno":"0111",
        "userheadphoto":"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/00001752528e4b5b9c0c1f6b55178e8f.jpg",
        "username":"111",
        "usersex":"1",
    };
    var str = '';
    let sex="保密";
    if (userlist.usersex == '0') {
        sex='男';
    } else if (userlist.usersex == '1') {
        sex='女';
    } else {
        sex='保密';
    }
    var myDate = new Date();
    var month = myDate.getMonth();
    if (month <= 8) {
        month = '0' + (month + 1);
    } else {
        month = month + 1;
    }
    let timetext=myDate.getFullYear() + '.' + month + '.' + myDate.getDate() + '-' + (myDate.getFullYear() + 1) + '.' + month + '.' + myDate.getDate();
    for (var i = 0; i < imgurl.length; i++) {
        // datalist.list.push({src:res.data[i].cardurljson.styleurl})
        str += '<div class="img" data-cardid="' + imgurl[i].cardid + '">' +
            '<div class="userinfo">' +
            '<img src="'+userlist.userheadphoto+'" alt="" class="userphone">' +
            '<p class="name">'+userlist.username+'</p>' +
            '<p>性别<span class="sex">'+sex+'</span></p>' +
            '<p>段友号<span class="dyh">'+userlist.uno+'</span></p>' +
            '<p>有效期<span class="indate">'+timetext+'</span></p>' +
            '<img src="images/erweima.png" alt="" class="erweima">' +
            '<img src="images/scancode.png" alt="" class="scancode">' +
            '</div>' +
            '<img src="' + imgurl[i].src + '"/>' +
            '</div>'
    }
    $('#slide').prepend(str);

}


    function appreload() {
        setTimeout(function(){
            let isfirst=localStorage.isfirst;
            if(isfirst && isfirst!="" && isfirst!=undefined && isfirst !=null){

            }else{

                localStorage.isfirst="1";
                window.location.reload();
                window.location.href="https://active.oalul.cn/activecitizencard/gmkindex.html";
                window.history.go(0);
                document.execCommand("Refresh");
            }

            if (userinfolist.apptype == 'web') {
                //不在app内
                $("#wantGet").attr("href","isshare.html");
            }
        },1000);
    }
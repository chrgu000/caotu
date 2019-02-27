 // const path = "https://dev.api.toutushare.com/NHDZSEVER"; //测试
 // const path = "http://192.168.1.114:8860/NHDZSEVER"; //测试
 /*线上改*/
 const path="https://api.itoutu.com:8899/NHDZSEVER";


 var userinfolist = { //用户信息
     "apptype": "web",
 };
 /*获取app的参数*/
 $(function () {
     var ua = navigator.userAgent;
     if (ua.match(/Android/i) != null) {
         try {
             let getdata = window.android.callappforkey();
             getdata = JSON.parse(getdata);
             //  $('#show').text(JSON.stringify(getdata));

             userinfolist.appticket = getdata.key;
             userinfolist.userid = getdata.userid;
             if (getdata.apppage && getdata.apppage != undefined) {
                 userinfolist.apppage = getdata.apppage;
             }
             userinfolist.apptype = getdata.apptype;
             localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
             // getUserInfo(getdata);
             // if (getdata.userid == "") {
             // $('#video').get(0).pause();
             // window.android.weblogin(); //调用登陆页面
             // } else {
             // getUserInfo(getdata);

             // getCardList(getdata);
             if (getdata.apppage == 'user') {
                 webCardApt(getdata, 'mycard.html');

             } else if (getdata.apppage == 'other_user') {
                 webCardAptOther(getdata, 'mycard.html');

             } else {
                 goBack();
                 webCardApt(getdata, 'gmkindex.html');
             }
             // }

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

         userinfolist.appticket = getdata.key;
         userinfolist.userid = getdata.userid;
         userinfolist.apppage = getdata.apppage;
         userinfolist.apptype = getdata.apptype;
         localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
         // getUserInfo(getdata);
         // if (getdata.userid == "") {
         // $('#video').get(0).pause();
         // window.webkit.messageHandlers.weblogin.postMessage({}); //调用ios方法
         // } else {
         // getUserInfo(getdata);
         if (getdata.apppage == 'user') {
             webCardApt(getdata, 'mycard.html');

         } else if (getdata.apppage == 'other_user') {
             webCardAptOther(getdata, 'mycard.html');

         } else {
             goBack();
             webCardApt(getdata, 'gmkindex.html');
         }
         // }
     } else {
         localStorage.userinfolist = JSON.stringify(userinfolist); //存缓存;
     }

 }

 function webCardApt(CardData, url) {
     var data = {
         "codea": CardData.key,
         "codeb": CardData.userid,
         "codec": url,
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

             if (res.code == "1000") {
                 getBase64Image(res.data.CardInfo.cardurljson.bgurl, $('#img'));
                 getBase64ImageHead(res.data.UserInfo.userheadphoto, $('.userphone'));
                 localStorage.CardData = JSON.stringify(res.data); //存缓存
                 var gety = res.data.CardInfo.gettime.substr(0, 4);
                 var getm = res.data.CardInfo.gettime.substr(4, 2);
                 var getd = res.data.CardInfo.gettime.substr(6, 2);
                 var overy = res.data.CardInfo.overtime.substr(0, 4);
                 var overm = res.data.CardInfo.overtime.substr(4, 2);
                 var overd = res.data.CardInfo.overtime.substr(6, 2);
                 $('.name').text(res.data.UserInfo.username);
                 if (res.data.UserInfo.usersex == '0') {
                     $('.sex').text('男');
                 } else if (res.data.UserInfo.usersex == '1') {
                     $('.sex').text('女');
                 } else {
                     $('.sex').text('保密')
                 }
                 $('.dyh').text(res.data.UserInfo.uno);
                 $('.indate').text(gety + '.' + getm + '.' + getd + '-' + overy + '.' + overm + '.' + overd);
                 $('.gmk').text(res.data.CardInfo.cardname);
                 wxfxxinfo.title = '我在内含段友APP领取了' + res.data.CardInfo.cardname;
                 sharewxjson.title = '我在内含段友APP领取了' + res.data.CardInfo.cardname;
                 wxfxxinfo.desc = '领取专属公民卡，做个有身份的段友';
                 sharewxjson.content = '领取专属公民卡，做个有身份的段友';
                 wxjsonstring = JSON.stringify(sharewxjson);
                 $('meta[itemprop="name"]').attr('content', '我在内含段友APP领取了' + res.data.CardInfo.cardname);
                 $('meta[property="og:title"]').attr('content', wxfxxinfo.title);
                 wxpz(wxfxxinfo);
                 var ua = navigator.userAgent;
                 if (ua.match(/Android/i) != null) {
                     getShare(wxjsonstring);
                 }

                 setTimeout(function () {
                     getcanvasimg();
                 }, 1000);

                 // $('#show').text(JSON.stringify(res.data));
                 //判断用户的完成进度
                 // if(res.data.ATP == '06'||res.data.ATP == '16'){
                 //     $('.game').attr('src','images/louti_2.png')
                 // } else if(res.data.ATP == 'ALL'){
                 //     $('.game').attr('src','images/louti_3.png')
                 // }
             } else {
                 localStorage.CardInfo = ""
             }
         }
     })
 }

 function webCardAptOther(CardData, url) {
     var data = {
         "codea": CardData.key,
         "codeb": '',
         "codec": url,
         "coded": CardData.userid
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

             if (res.code == "1000") {
                 getBase64Image(res.data.CardInfo.cardurljson.bgurl, $('#img'));
                 getBase64ImageHead(res.data.UserInfo.userheadphoto, $('.userphone'));
                 localStorage.CardData = JSON.stringify(res.data); //存缓存
                 var gety = res.data.CardInfo.gettime.substr(0, 4);
                 var getm = res.data.CardInfo.gettime.substr(4, 2);
                 var getd = res.data.CardInfo.gettime.substr(6, 2);
                 var overy = res.data.CardInfo.overtime.substr(0, 4);
                 var overm = res.data.CardInfo.overtime.substr(4, 2);
                 var overd = res.data.CardInfo.overtime.substr(6, 2);
                 $('.name').text(res.data.UserInfo.username);
                 if (res.data.UserInfo.usersex == '0') {
                     $('.sex').text('男');
                 } else if (res.data.UserInfo.usersex == '1') {
                     $('.sex').text('女');
                 } else {
                     $('.sex').text('保密')
                 }
                 $('.dyh').text(res.data.UserInfo.uno);
                 $('.indate').text(gety + '.' + getm + '.' + getd + '-' + overy + '.' + overm + '.' + overd);
                 $('.gmk').text(res.data.CardInfo.cardname);
                 wxfxxinfo.title = '他在内含段友APP领取了' + res.data.CardInfo.cardname;
                 sharewxjson.title = '他在内含段友APP领取了' + res.data.CardInfo.cardname;
                 wxfxxinfo.desc = '领取专属公民卡，做个有身份的段友';
                 sharewxjson.content = '领取专属公民卡，做个有身份的段友';
                 wxjsonstring = JSON.stringify(sharewxjson);
                 $('meta[itemprop="name"]').attr('content', '他在内含段友APP领取了' + res.data.CardInfo.cardname);
                 $('meta[property="og:title"]').attr('content', wxfxxinfo.title);
                 wxpz(wxfxxinfo);
                 var ua = navigator.userAgent;
                 if (ua.match(/Android/i) != null) {
                     getShare(wxjsonstring);
                 }
                 //截图
                 setTimeout(function () {
                     getcanvasimg();
                 }, 1000);
                 // $('#show').text(JSON.stringify(res.data));
                 //判断用户的完成进度
                 // if(res.data.ATP == '06'||res.data.ATP == '16'){
                 //     $('.game').attr('src','images/louti_2.png')
                 // } else if(res.data.ATP == 'ALL'){
                 //     $('.game').attr('src','images/louti_3.png')
                 // }
             } else {
                 localStorage.CardInfo = ""
             }
         }
     })
 }

 function getcanvasimg() {
     // console.log("截图");
     var cntElem = $('.card_jietu')[0];
     var shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
     var width = shareContent.offsetWidth; //获取dom 宽度
     var height = shareContent.offsetHeight; //获取dom 高度
     var canvas = document.createElement("canvas"); //创建一个canvas节点
     var scale = 4; //定义任意放大倍数 支持小数
     canvas.width = width * scale; //定义canvas 宽度 * 缩放
     canvas.height = height * scale; //定义canvas高度 *缩放
     canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
     var rect = $('.card_jietu').get(0).getBoundingClientRect(); //获取元素相对于视察的偏移量
     canvas.getContext("2d").translate(-rect.left, -rect.top);
     var opts = {
         scale: scale, // 添加的scale 参数
         canvas: canvas, //自定义 canvas
         // logging: true, //日志开关，便于查看html2canvas的内部执行流程
         width: width, //dom 原始宽度
         height: height,
         useCORS: true, // 【重要】开启跨域配置
         allowTaint: false
     };
     html2canvas(shareContent, opts).then(function (canvas) {
         var context = canvas.getContext('2d');
         // 【重要】关闭抗锯齿
         context.mozImageSmoothingEnabled = false;
         context.webkitImageSmoothingEnabled = false;
         context.msImageSmoothingEnabled = false;
         context.imageSmoothingEnabled = false;

         // 【重要】默认转化的格式为png,也可设置为其他格式
         var dataUrl = canvas.toDataURL("image/png");
         $('.card_jietu').hide();
         $('#showimg').attr("src", dataUrl).css({
             "display": "block"
         });
         posttenxun(dataUrl)
     });
 }

 function getBase64Image(imgurl, dom) {
     if (imgurl.split('.')[1] == 'file') {
         var data = 'cos.ap-shanghai';
         imgurl = imgurl.split('.')[0] + '.' + data + '.' + imgurl.split('.')[2] + '.' + imgurl.split('.')[3] + '.' + imgurl.split('.')[4];
     }
     var ish = imgurl.split(":")[0];
     var ish2 = imgurl.split(":")[1];
     if (ish == "http") {
         imgurl = "https:" + ish2;
     }
     let img = new Image();
     img.crossOrigin = "anonymous";
     let timestamp = new Date().getTime();
     // img.setAttribute('crossOrigin', 'anonymous'); + "?" + timestamp
     img.src = imgurl + "?" + timestamp;
     img.onload = function () {
         var canvas = document.createElement("canvas");
         canvas.width = 400; //这个设置不能丢，否者会成为canvas默认的300*150的大小
         canvas.height = 400; //这个设置不能丢，否者会成为canvas默认的300*150的大小
         var ctx = canvas.getContext("2d");
         ctx.drawImage(img, 0, 0, 400, 400);
         var dataURL = canvas.toDataURL("image/png");
         // console.log("dataURL");
         // console.log(dataURL);
         // $("#userInfoHead").attr("src", dataURL);
         // $('#show').text('img'+":"+img+"dataUrl"+":"+dataURL);
         dom.attr('src', dataURL);
         // isimgload = 1;
     }
 }

 function getBase64ImageHead(imgurl, dom) {
     var ish = imgurl.split(":")[0];
     var ish2 = imgurl.split(":")[1];
     if (ish == "http") {
         imgurl = "https:" + ish2;
     }
     let img = new Image();
     img.crossOrigin = "anonymous";
     let timestamp = new Date().getTime();
     // img.setAttribute('crossOrigin', 'anonymous'); + "?" + timestamp
     img.src = imgurl + "?" + timestamp;
     img.onload = function () {
         var canvas = document.createElement("canvas");
         canvas.width = 400; //这个设置不能丢，否者会成为canvas默认的300*150的大小
         canvas.height = 400; //这个设置不能丢，否者会成为canvas默认的300*150的大小
         var ctx = canvas.getContext("2d");
         ctx.drawImage(img, 0, 0, 400, 400);
         var dataURL = canvas.toDataURL("image/png");
         // console.log("dataURL");
         // console.log(dataURL);
         // $("#userInfoHead").attr("src", dataURL);
         // $('#show').text('img'+":"+img+"dataUrl"+":"+dataURL);
         dom.attr('src', dataURL);
         // isimgload = 1;
     }
 }



 function goBack() {
     if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) { // IE
         if (history.length > 0) {
             console.log('正常进入');

             // window.history.go(-1);
         } else {
             console.log('跳首页');

             window.location.href = "tlrindex.html";
         }
     } else { //非IE浏览器
         if (navigator.userAgent.indexOf('Firefox') >= 0 ||
             navigator.userAgent.indexOf('Opera') >= 0 ||
             navigator.userAgent.indexOf('Safari') >= 0 ||
             navigator.userAgent.indexOf('Chrome') >= 0 ||
             navigator.userAgent.indexOf('WebKit') >= 0) {

             if (window.history.length > 1) {
                 console.log('正常进入');

             } else {
                 console.log('跳首页');

                 window.location.href = "tlrindex.html";
             }
         } else { //未知的浏览器
             if (window.history.length > 1) {
                 console.log('正常进入');

             } else {
                 console.log('跳首页');

                 window.location.href = "tlrindex.html";
             }
         }
     }
 }
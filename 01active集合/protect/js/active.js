




getcanvasimg();

    function getcanvasimg() {
        //console.log("截图")
        var cntElem = $('#endShareConBox')[0];
        var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        canvas.getContext("2d").translate(0,-30);
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
            let dataUrl = canvas.toDataURL("image/png");
           $("#shareImg").attr("src",dataUrl).css("display","block");
            posttenxun(dataUrl);

        });



    }




    /*app中长按分享*/
    $("#endShareConBox").on({
        touchstart: function (e) {
            // 长按事件触发
            timeOutEvent = setTimeout(function () {
                timeOutEvent = 0;
                // alert('你长按了');
                if (resultInfoData.apptype != "web") {
                    let share = {
                        "webType": "1", //类型
                        "title": wxfxxinfo.title, //分析的title名
                        "url": postappimgurl, //分享的链接
                        "content": wxfxxinfo.desc, //描述
                        "icon": wxfxxinfo.imgUrl
                    };
                    //let sharestring2 = JSON.stringify(share);
                   // $("#show").html(sharestring2);
                    if(share.url==""){
                        share=sharewxjson;
                    }
                    let sharestring = JSON.stringify(share);
                  // $("#show2").html(sharestring);
                   // console.log(sharestring);
                    if (resultInfoData.apptype == "Android") {
                        // alert("Android::");
                        //window.android.shareweb(sharestring);
                        window.android.getimage(postappimgurl);
                    } else if (resultInfoData.apptype == "IOS") {
                        // alert("ios::");
                        window.webkit.messageHandlers.shareweb.postMessage(sharestring); //调用ios方法
                    }
                }
            }, 400);
            //长按400毫秒
        },
        touchmove: function () {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
            // alert("移动了");
        },
        touchend: function () {
            clearTimeout(timeOutEvent);
            if (timeOutEvent != 0) {
                // 点击事件
                // alert('你点击了');
            }
            return false;
        }
    });




    /*提交图片到腾讯云*/
    var postappimgurl="";

    function posttenxun(dataURL) {
        var file1=convertBase64UrlToBlob(dataURL,"png");
        var x= Math.random(32).toString(36).substr(3,32);
        var date= Date.now().toString(36);
        let fileName = String(x)+String(date)+".png";
        var imgMsg = {
            name : fileName,//获取文件名
            file:file1,//文件流
        };
        //console.log(file1);
        postappimgurl=file1;
       /* runAsync(imgMsg).then(function(data){
            var onetdk=data.Url.substring(0, data.Url.indexOf('?'));
            return onetdk;
        }).then(function(onetdk) {
            console.log("onetdk::");
            console.log(onetdk);
            postappimgurl=onetdk;
            $("#shareImg").attr("src",onetdk);
        });*/
    }

    /*canvas保存图片上传*/
    function convertBase64UrlToBlob(urlData,type){
        var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob( [ab] , {type : 'image/'+type});
    }


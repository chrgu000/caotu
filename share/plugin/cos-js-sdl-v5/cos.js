/**
 * Created by zhu on 2018/5/28.
 */
var config = {
    Bucket: 'ctkj-1256675270',
    Region: 'ap-shanghai'
};

var util = {
    createFile: function (options) {
        var buffer = new ArrayBuffer(options.size || 0);
        var arr = new Uint8Array(buffer);
        [].forEach.call(arr, function (char, i) {
            arr[i] = 0;
        });
        var opt = {};
        options.type && (opt.type = options.type);
        var blob = new Blob([buffer], options);
        return blob;
    }
};

/*
var cos = new COS({
    getAuthorization: function (options, callback) {

      /!*  // 方法一、后端通过获取临时密钥给到前端，前端计算签名
        // var url = 'http://127.0.0.1:3000/sts';
        /!*        var url = '../server/sts.php';
         var xhr = new XMLHttpRequest();
         xhr.open('GET', url, true);
         xhr.onload = function (e) {
         try {
         var data = JSON.parse(e.target.responseText);
         } catch (e) {
         }
         callback({
         TmpSecretId: data.credentials && data.credentials.tmpSecretId,
         TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
         XCosSecurityToken: data.credentials && data.credentials.sessionToken,
         ExpiredTime: data.expiredTime,
         });
         };
         xhr.send();*!/


        // // 方法二、后端通过获取临时密钥，并计算好签名给到前端
        // var method = (options.Method || 'get').toLowerCase();
        // var key = options.Key || '';
        // var query = options.Query || {};
        // var headers = options.Headers || {};
        // var pathname = key.indexOf('/') === 0 ? key : '/' + key;
        // // var url = 'http://127.0.0.1:3000/sts-auth';
        // var url = '../server/sts-auth.php';
        // var xhr = new XMLHttpRequest();
        // var data = {
        //     method: method,
        //     pathname: pathname,
        //     query: query,
        //     headers: headers,
        // };
        // xhr.open('POST', url, true);
        // xhr.setRequestHeader('content-type', 'application/json');
        // xhr.onload = function (e) {
        //     try {
        //         var AuthData = JSON.parse(e.target.responseText);
        //     } catch (e) {
        //     }
        //     callback({
        //         Authorization: AuthData.Authorization,
        //         XCosSecurityToken: AuthData.XCosSecurityToken,
        //     });
        // };
        // xhr.send(JSON.stringify(data));
*!/
        // // 方法三、前端使用固定密钥计算签名（适用于前端调试）
        var authorization = COS.getAuthorization({
            SecretId: 'AKIDhCSSCgutb3FBrHwLyMTLxINCl59xuqvl',
            SecretKey: 'nMglbCYfXAYhcIjutgFbjdKn24tVt31u',
            Method: options.Method,
            Key: options.Key,
            Query: options.Query,
            Headers: options.Headers,
            Expires: 60
        });
        callback(authorization);
    }
});
*/


var cos = new COS({
    SecretId:"AKIDhCSSCgutb3FBrHwLyMTLxINCl59xuqvl",
    SecretKey: "nMglbCYfXAYhcIjutgFbjdKn24tVt31u",
})
var costdk="";
function putObject(file) {
    // 创建测试文件
    var filename = file.name;
    var blob = util.createFile({size: 1024 * 1024 * 1});
    // 调用方法
    cos.putObject({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: filename, /* 必须 */
        Body: file,
        StorageClass: 'STANDARD',
        Origin:"http://101.69.230.98",
        onProgress: function (progressData) {
            //console.log(progressData);
            //console.log(JSON.stringify(progressData));
        }
    }, function (err, data) {
        //console.log(err || data);

    });
    cos.getObjectUrl({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        Key: filename,
        Sign: true,
        Origin:"http://101.69.230.98"
    }, function (err, data) {
        console.log(err || data.Url);
        if(data){
            costdk=data.Url;
            console.log(costdk);
        }

    });
}

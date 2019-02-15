/**
 * Created by zhu on 2018/5/28.
 */
var tenxunconfig = {
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


var cos = new COS({
    SecretId:"AKIDhCSSCgutb3FBrHwLyMTLxINCl59xuqvl",
    SecretKey: "nMglbCYfXAYhcIjutgFbjdKn24tVt31u"
});


//es6Promise
function runAsync(file){
    var p = new Promise(function(resolve, reject){
        // 创建测试文件
        // var filename = file.name;
        var x= Math.random(32).toString(36).substr(3,32);
        var date= Date.now().toString(36);
        var filename=String(x)+String(date)+file.name;
        var blob = util.createFile({size: 1024 * 1024 * 1});
        // 调用方法
      //  console.log(tenxunconfig);
        cos.putObject({
            Bucket: tenxunconfig.Bucket, // Bucket 格式：test-1250000000
            Region: tenxunconfig.Region,
            Key: filename, /* 必须 */
            Body: file.file,
            StorageClass: 'STANDARD',
            Origin:"http://101.69.230.98",
            onProgress: function (progressData) {
                //console.log(progressData);
                //console.log(JSON.stringify(progressData));
            }
        }, function (err, data) {
            // console.log("cos提交：：");
            // console.log(err || data);
            if(err){
                layer.msg("图片上传失败，请重试！！");
                reject(err);//失败时候
              //  $("#show").html("图片上传失败，请重试");

            }else{
                cos.getObjectUrl({
                    Bucket: tenxunconfig.Bucket, // Bucket 格式：test-1250000000
                    Region: tenxunconfig.Region,
                    Key: filename,
                    Sign: true,
                    Origin:"http://101.69.230.98",
                }, function (err, data) {
                    // console.log("cos获取：：");
                    // console.log(err || data);
                    if(data){
                        resolve(data);
                        // var onetdk=data.Url.substring(0, data.Url.indexOf('?'));
                        // cosjurl.push(onetdk);
                    }

                });
            }


        });
    });
    return p;
}




const path="https://dev.api.toutushare.com/NHDZSEVER";//测试
const path2="https://dev.api.toutushare.com/NHDZSEVER";//测试
// const path="http://192.168.1.111:8091/NHDZSEVER";//老冯
// const path2="http://192.168.1.111:8091/NHDZSEVER";//老冯

 /*线上改*/
// const path="https://api.itoutu.com:8899/NHDZSEVER";
// const path2="https://api.itoutu.com:8899/NHDZSEVER";





/*随机字符串*/
function randomString(len) {
    len = len || 16;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/*随机数*/
function randomnum(minNum,maxNum){
    var num=parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
    return num;
}

/*监听物理返回*/
var isfull=0;




$(document).ready(function() {

    if (window.history && window.history.pushState) {

        $(window).on('popstate', function () {
            if(isfull ==1){
                $("#faxAllBox").removeClass("show");
                $("#faxAllBox ul").empty();
                isfull =0;
                window.history.pushState('forward', null, '#');
                window.history.go(1);
            }else{
                // 这里置为null,避免IE下弹出关闭页面确认框
                window.opener = null;
                // JS重写当前页面
                window.open("", "_self", "");
                // 顺理成章的关闭当前被重写的窗口
                window.close();
            }

        });

    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);

});

/*layer提示框*/
function showMessage(msg, domObj) {
    layer.tips("<span>"+msg+"</span>", domObj,{tips:[3],area: ['auto', 'auto']});//弹出框加回调函数
}
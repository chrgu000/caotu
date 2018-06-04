/**
 * Created by zhu on 2018/5/31.
 */
/*const path="http://192.168.1.111:8091";*/
const path="http://192.168.1.114:8807";
const path2="http://192.168.1.114:8807";


function check(diskJson) {
    // 保存缓存
    // console.log(diskJson);
    localStorage.userdata = diskJson;

}

function getload() {
    // 读取缓存
    if (localStorage.userdata) {
        // console.log(localStorage.userdata);
        var userdata=JSON.parse(localStorage.userdata);
        // console.log(userdata);
        return userdata;
    }
}


/*js通过两种方法获取url传递参数：*/
function GetRequest(url) {
   /* var url = location.search; //获取url中"?"符后的字串*/
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

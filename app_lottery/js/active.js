/**
 * Created by zhu on 2018/8/14.
 */

//音乐开关
var musicplay=true;//播放开关
$("#music").click(function () {
    if (musicplay) {
        $("#music .musicimg").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/musicclose.png");
        $("#bgm").get(0).pause();
        musicplay=false;
    }else{
        $("#music .musicimg").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/active/musicopen.png");
        $("#bgm").get(0).play();
        musicplay=true;
    }
});


/*复制*/
function ctrlc(event){
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //ios
        var copyDOM = document.querySelector('#ctru2');  //要复制文字的节点
        var range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(copyDOM);
        // 执行选中元素
        window.getSelection().addRange(range);
        // 执行 copy 操作
        var successful = document.execCommand('copy');
        try {
            var msg = successful ? 'successful' : 'unsuccessful';

            //console.log('copy is' + msg);
        } catch(err) {
            // console.log('Oops, unable to copy');
        }
        // 移除选中的元素
        window.getSelection().removeAllRanges();
    }else{
        var invi=$("#myInvit").html();
        console.log(invi);
        // 动态创建 input 元素
        var aux = document.createElement("input");
        // 获得需要复制的内容
        aux.setAttribute("value", invi);
        // 添加到 DOM 元素中
        document.body.appendChild(aux);
        // 执行选中
        // 注意: 只有 input 和 textarea 可以执行 select() 方法.
        aux.select();
        // 获得选中的内容
        var content = window.getSelection().toString();
        // 执行复制命令
        document.execCommand("copy");
        // 将 input 元素移除
        document.body.removeChild(aux);

    }
    layer.msg("复制成功！",{time:1000});

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
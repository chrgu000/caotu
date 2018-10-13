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


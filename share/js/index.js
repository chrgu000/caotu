/**
 * Created by zhu on 2018/5/31.
 */

/*const path="http://192.168.1.114:8807";
const path2="http://192.168.1.114:8807";*/

/*����*/
const path="http://118.126.68.108:8808";
const path2="http://118.126.68.108:8808";


function check(diskJson) {
    // ���滺��
    // console.log(diskJson);
    localStorage.userdata = diskJson;

}

function getload() {
    // ��ȡ����
    if (localStorage.userdata) {
        // console.log(localStorage.userdata);
        var userdata=JSON.parse(localStorage.userdata);
        // console.log(userdata);
        return userdata;
    }
}


/*jsͨ�����ַ�����ȡurl���ݲ�����*/
function GetRequest(url) {
   /* var url = location.search; //��ȡurl��"?"������ִ�*/
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


/*------�Զ����ͼƬ�����л�--------*/
/*�ر�ͼƬչʾ*/
function closeimg(){
    $("#faxAllBox").removeClass("show");
    $("#faxAllBox ul").empty();
}
/*��ֹ������󻬷���*/
document.addEventListener('touchmove',function(e){
    if($("#faxAllBox").hasClass("show")){
        e.preventDefault();
    }

}, false);
/*չʾͼƬ�����һ���*/
var startPoint = null;
document.addEventListener("touchstart",function(e){
    var e = e||window.event;
    startPoint = e.touches[0];
})
document.addEventListener("touchend",function(e){
    var e=e||window.event;
    //e.changedTouches���ҵ��뿪�ֻ�����ָ�����ص���һ������
    var endPoint = e.changedTouches[0];
    //�����յ������Ĳ�ֵ
    var x = endPoint.clientX - startPoint.clientX;
    var y = endPoint.clientY - startPoint.clientY;
    //���û�������Ĳο�ֵ
    var d = 10;
    var sn=Number($("#faxAllBox .toptip b.pre").html());//��ǰͼƬҳ
    var an=Number($("#faxAllBox .toptip b.all").html());//����ͼƬ������
    var w=$("#faxAllBox ul li").width();
    w=w+"px";
    if(Math.abs(x)>d){
        if(x>0){
            //console.log("���һ���");
            if(sn>1){
                $("#faxAllBox .toptip b.pre").html(sn-1);
                $("#faxAllBox ul li:nth-child("+(sn-1)+")").css("margin-left","-"+w).addClass("show").animate({
                    marginLeft:0
                },250);

            }
        }else{
            if(sn<an){
                $("#faxAllBox .toptip b.pre").html(sn+1);
                $("#faxAllBox ul li:nth-child("+(sn+1)+")").addClass("show");
                $("#faxAllBox ul li:nth-child("+sn+")").animate({
                    marginLeft:"-"+w
                },250);

                // console.log("���󻬶�");
            }

        }
    }
    /*  if(Math.abs(y)>d){
     if(y>0){
     console.log("���»���");
     if(sn>1){
     $("#faxAllBox .toptip b.pre").html(sn-1);
     $("#faxAllBox ul li").slideUp();
     $("#faxAllBox ul li:nth-child("+(sn-1)+")").slideDown();

     }
     }else{
     console.log("���ϻ���");
     if(sn<an){
     $("#faxAllBox .toptip b.pre").html(sn+1);
     $("#faxAllBox ul li").slideUp();
     $("#faxAllBox ul li:nth-child("+(sn+1)+")").slideDown();
     // console.log("���󻬶�");
     }
     }
     }*/

})
/**
 * Created by 2017 helang.love@qq.com on 2017/12/2.
 */

var photoSwipe={
    /*用户信息数组*/
    imgArr:[],
    /*元素位置*/
        _x_start:0,
        _y_start:0,
        _x_move:0,
        _y_move:0,
        _x_end:0,
        _y_end:0,
        top_val:0,
        left_val:0,
    /*当前下标*/
    index:0,
    /*是否允许动画*/
    run:true,
    /*是否加载完成*/
    load:false,
    /*初始化*/
    init:function () {
        getcheckdata();
        document.querySelector("#photo_box>div>div").innerHTML=this.imgHtml;
    },
    /*审核数据*/
    checkeddata:"",
    /*图片HTML*/
    imgHtml:"",
    /*移动动画*/
    animateMove:function (el,val) {
        if(!this.run){
            return;
        }
        this.run=false;

        /*CSS3动画方式*/
        el.css({"transform":"translate3d("+doc_width*val+"px,"+photoSwipe.top_val*2.2+"px,0px)","transition-duration":"0.3s"});
        var moveTime=setTimeout(function () {
            el.remove();
            var ind_el=$("#ind-"+(photoSwipe.index));
            photoSwipe.activeEl(ind_el);
            photoSwipe.index++;
            $("#photo_box>div>div").append(photoSwipe.imgHtml);
            photoSwipe.run=true;

        },300);
    },
    /*复位动画*/
    animateReset:function (el) {
        /*CSS3动画方式*/
        el.css({"transform":"translate3d(0px,0px,0px)","transition-duration":"0.3s"});
        var resetTime=setTimeout(function () {
            el.css("transition-duration","0s");
        },1000);
    },
    /*激活层*/
    activeEl:function (el) {
        el.css("z-index","2");
    },
    /*清除位置*/
    clearLocation:function () {
        this.left_val=0;
    }

};
photoSwipe.init();

var doc_width=$(document).width(),doc_height=$(document).height();

photoSwipe.activeEl($("#ind-0"));
photoSwipe.index++;
$("#photo_box>div>div").append(photoSwipe.imgHtml);

$("#photo_box").on("touchstart",function(e) {
    if(!photoSwipe.load || !photoSwipe.run){
        return;
    }

    var ev = e || window.event;
    photoSwipe._x_start=ev.touches[0].pageX;
    photoSwipe._y_start=ev.touches[0].pageY;
    var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
    photoSwipe._x_move=0;
    photoSwipe._y_move=0;
});
$("#photo_box").on("touchmove",function(e) {
    if(!photoSwipe.load || !photoSwipe.run){
        return;
    }
    var ev = e || window.event;
    photoSwipe._x_move=ev.touches[0].pageX;
    photoSwipe._y_move=ev.touches[0].pageY;

    var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
    photoSwipe.top_val=parseFloat(photoSwipe._y_move)-parseFloat(photoSwipe._y_start);
    photoSwipe.left_val=parseFloat(photoSwipe._x_move)-parseFloat(photoSwipe._x_start);

    act_el.css({"transform":"translate3d("+photoSwipe.left_val+"px,"+photoSwipe.top_val+"px,0px)","transition-duration":"0s"});





    // console.log("touchmove:");
    // console.log(photoSwipe.left_val)
});
$("#photo_box").on("touchend",function(e) {
    if(!photoSwipe.load || !photoSwipe.run){
        return false;
    }
    var ev = e || window.event;
    photoSwipe._x_end=ev.changedTouches[0].pageX;
    photoSwipe._y_end=ev.changedTouches[0].pageY;

    // console.log("touchend:");
    // console.log(photoSwipe._x_end);
    var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
    if(photoSwipe._x_move!=0){
        if(photoSwipe.left_val>0 && photoSwipe.left_val>doc_width/2-doc_width/4.5){
            photoSwipe.animateMove(act_el,1);
            postcheckdata("YES") ;
            /*  console.log(1);
              $("#photo_box .ispassimg img").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/checkedpass.png");
              $("#photo_box .ispassimg").removeClass("unpass");
              $("#photo_box .ispassimg").addClass("pass").animate({"opacity":1},700);*/
            getcheckdata();
        }else if(photoSwipe.left_val<0 && photoSwipe.left_val<-doc_width/2+doc_width/4.5){
            photoSwipe.animateMove(act_el,-1);
            postcheckdata("NO") ;
            /*   console.log(2);
               $("#photo_box .ispassimg").removeClass("pass");
               $("#photo_box .ispassimg img").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/checkednotpass.png");
               $("#photo_box .ispassimg").addClass("unpass").animate({"opacity":1},700);*/
            getcheckdata();
        }else {
            //console.log("不变");

            photoSwipe.animateReset(act_el);
        }
    }

});



$(function () {
    photoSwipe.load=true;
});


    /*假设数据*/
/*    function getcheckdata() {
        let c=["https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/7ad2e418-5e20-48aa-8529-bfe4c95b956c.jpg","http://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/3BDF30D7-7925-453A-A59E-C284836C59AC.mp4"];
        c=JSON.stringify(c);
        diskJson={code:"1000",data:{
                mes:50,
                userheadphoto:"https://ctkj-1256675270.cos.ap-shanghai.myqclou d.com/7ad2e418-5e20-48aa-8529-bfe4c95b956c.jpg",
                username:"123",
                content:{
                    "contentid":"1235566414",
                    "contenttitle":"sdfsdlfjslfjsldfjsdlfjslgjlsdglgnlgnlglgnml受到广泛南斯拉夫说服力可使大脑放空是南非",
                    "contenttype":"2",
                    "contenturllist":c,
                },
                resulthonor:{
                    levelinfo:{
                        checknum:1,
                        dvalue:50,
                        picup:"",
                        word:"",
                    }

                }
            }}

        if(diskJson.code=="1000" && diskJson.data!=""){
            if(diskJson.data.content && diskJson.data.content!=""&&diskJson.data.content!=undefined){
                let chkdata=diskJson.data.content;
                if(chkdata.contenturllist && chkdata.contenturllist!="" ){
                    chkdata.contenturllist=JSON.parse(chkdata.contenturllist);
                }
                editcheckeddata(chkdata);
                $(".btnlistBox").css("display","block");
                console.log(1);
            }else{
                console.log(2);
                photoSwipe.imgHtml="";
                photoSwipe.checkeddata=diskJson.data;
                $(".btnlistBox").css("display","none");
                $("#photo_box .title").html("");
                $("#noContShowBox").css("display","block");
                $("#noContShowBox").empty();
                $("#noContShowBox").append('<div class="" style="text-align: center;width:100%;padding:20% 0;background:#fff;"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div>');
                //  $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox" ><div class="contsBox"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');

            }

            photoSwipe.checkeddata=diskJson.data;
            checkeduserinfo.username=diskJson.data.username;
            checkeduserinfo.userhead=diskJson.data.userheadphoto;
            checkeduserinfo.dvalue=diskJson.data.resulthonor.levelinfo.dvalue;
            checkeduserinfo.word=diskJson.data.resulthonor.levelinfo.word;
            if(diskJson.data.mes && diskJson.data.mes!=""){
                checkeduserinfo.mes=diskJson.data.mes;
                if(diskJson.data.mes==300 || diskJson.data.mes==200){
                    $("#userLevelUpTipBox").addClass("active");
                    $("#userLevelUpTipBox .tipFullImg").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/levelup/level100.png");
                    $("#levelUpMusic").get(0).play();
                }
            }else{
                checkeduserinfo.mes=0;
            }
            checkeduserinfo.checknum=checkeduserinfo.mes-diskJson.data.resulthonor.levelinfo.checknum;
            if(checkeduserinfo.level!="" && checkeduserinfo.level!=diskJson.data.resulthonor.level){
                // console.log(checkeduserinfo.picup);
                $("#userLevelUpTipBox").addClass("active");
                $("#userLevelUpTipBox .tipFullImg").attr("src",checkeduserinfo.picup);
                $("#levelUpMusic").get(0).play();
            }else if(checkeduserinfo.level =="v9"){
                checkeduserinfo.checknum=(checkeduserinfo.mes-diskJson.data.resulthonor.levelinfo.checknum)%50;
                if(checkeduserinfo.checknum %50==0){
                    $("#userLevelUpTipBox").addClass("active");
                    $("#userLevelUpTipBox .tipFullImg").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/levelup/level50.png");
                    $("#levelUpMusic").get(0).play();
                }
            }
            checkeduserinfo.level=diskJson.data.resulthonor.level;//级别
            checkeduserinfo.picup=diskJson.data.resulthonor.levelinfo.picup;




        }else if(diskJson.code=="2222"){
            photoSwipe.imgHtml="";
            photoSwipe.checkeddata=diskJson.data;
            $("#photo_box .title").html("");
            $("#photo_box>div>div").empty();
            $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox"><div class="" style="text-align: center;width:100%;padding-top:14%;"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');
            //  $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox" ><div class="contsBox"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');

            if(ua.match(/iPhone|iPod|iPad/i) != null){
                try {
                    window.webkit.messageHandlers.closeapp.postMessage(null);
                } catch (e) {
                    console.log(e)
                }//iphone代码
            }
            else if(ua.match(/Android/i) != null){
                try {
                    window.android.closeapp();

                } catch (e) {
                    console.log(e)
                }//android代码
            } else{
                // alert("不在app");
                //$("#show").html("不在app");
            }


        }else{
            photoSwipe.imgHtml="";
            photoSwipe.checkeddata=diskJson.data;
            $("#photo_box .title").html("");
            $("#photo_box>div>div").empty();
            $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox"><div class="" style="text-align: center;width:100%;padding-top:14%;"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');
            //  $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox" ><div class="contsBox"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');

        }

    }*/

    /*获取审核数据*/
    function getcheckdata(){
        var myvideo=document.getElementById("video");
        if(myvideo!="" && myvideo !=null && myvideo!=undefined){
            myvideo.pause();
        }

        let userinfolist=JSON.parse(localStorage.userinfolist);
        checkeduserinfo.userid=userinfolist.userid;
        let codea=userinfolist.appticket;
        let codeb=userinfolist.userid;
        let codec=userinfolist.codec;
        let datapost={"codea":codea,"codeb":codeb,"codec":codec};
        datapost=JSON.stringify(datapost);
        $.ajax({
            url : path+'/webcheck/webGetAContentToCheck.do',
            cache:false,//false就不会从浏览器缓存中加载请求信息了
            type:"POST",
            contentType: "application/json",
            dataType:"JSON",
            async:false,
            data: datapost,
            error: function(data){
                photoSwipe.imgHtml="";
                photoSwipe.checkeddata="";
                $("#photo_box .title").html("");
                $("#photo_box .contsBox").empty();
                $("#photo_box .contsBox").append('<div style="text-align: center;width:100%;"><img style="width:75%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div>')
    //                //console.log("标签列表获取失败：");
    //                //console.log(data);
            },
            success:function(diskJson){
               console.log("审核数据：");
               console.log(diskJson);


                if(diskJson.code=="1000" && diskJson.data!=""){
                    if(diskJson.data.content && diskJson.data.content!=""&&diskJson.data.content!=undefined){
                        let chkdata=diskJson.data.content;
                        if(chkdata.contenturllist && chkdata.contenturllist!="" ){
                            chkdata.contenturllist=JSON.parse(chkdata.contenturllist);
                        }
                        editcheckeddata(chkdata);
                         $(".btnlistBox").css("display","block");
                    }else{
                     $(".btnlistBox").css("display","none");
                        photoSwipe.imgHtml="";
                        photoSwipe.checkeddata=diskJson.data;

                        $("#photo_box .title").html("");
                        $("#noContShowBox").css("display","block");
                        $("#noContShowBox").empty();
                        $("#noContShowBox").append('<div class="" style="text-align: center;width:100%;padding:20% 0;background:#fff;"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div>');
                        //  $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox" ><div class="contsBox"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');

                    }

                    photoSwipe.checkeddata=diskJson.data;
                    checkeduserinfo.username=diskJson.data.username;
                    checkeduserinfo.userhead=diskJson.data.userheadphoto;
                    checkeduserinfo.dvalue=diskJson.data.resulthonor.levelinfo.dvalue;
                    checkeduserinfo.word=diskJson.data.resulthonor.levelinfo.word;
                    if(diskJson.data.mes && diskJson.data.mes!=""){
                        checkeduserinfo.mes=diskJson.data.mes;
                        if(diskJson.data.mes==300 || diskJson.data.mes==200){
                            $("#userLevelUpTipBox").addClass("active");
                            $("#userLevelUpTipBox .tipFullImg").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/levelup/level100.png");
                            $("#levelUpMusic").get(0).play();
                        }
                    }else{
                        checkeduserinfo.mes=0;
                    }
                    checkeduserinfo.checknum=checkeduserinfo.mes-diskJson.data.resulthonor.levelinfo.checknum;
                    if(checkeduserinfo.level!="" && checkeduserinfo.level!=diskJson.data.resulthonor.level){
                       // console.log(checkeduserinfo.picup);
                        $("#userLevelUpTipBox").addClass("active");
                        $("#userLevelUpTipBox .tipFullImg").attr("src",checkeduserinfo.picup);
                        $("#levelUpMusic").get(0).play();
                    }else if(checkeduserinfo.level =="v9"){
                        checkeduserinfo.checknum=(checkeduserinfo.mes-diskJson.data.resulthonor.levelinfo.checknum)%50;
                       if(checkeduserinfo.checknum %50==0){
                           $("#userLevelUpTipBox").addClass("active");
                            $("#userLevelUpTipBox .tipFullImg").attr("src","https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/levelup/level50.png");
                            $("#levelUpMusic").get(0).play();
                         }
                    }
                    checkeduserinfo.level=diskJson.data.resulthonor.level;//级别
                    checkeduserinfo.picup=diskJson.data.resulthonor.levelinfo.picup;




                }else if(diskJson.code=="2222"){
                    photoSwipe.imgHtml="";
                    photoSwipe.checkeddata=diskJson.data;
                    $("#photo_box .title").html("");
                    $("#photo_box>div>div").empty();
                    $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox"><div class="" style="text-align: center;width:100%;padding-top:14%;"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');
                    //  $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox" ><div class="contsBox"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');

                    if(ua.match(/iPhone|iPod|iPad/i) != null){
                        try {
                            window.webkit.messageHandlers.closeapp();
                        } catch (e) {
                            console.log(e)
                        }//iphone代码
                    }
                    else if(ua.match(/Android/i) != null){
                        try {
                           window.android.closeapp();

                        } catch (e) {
                            console.log(e)
                        }//android代码
                    } else{
                        // alert("不在app");
                        //$("#show").html("不在app");
                    }


                }else{
                    photoSwipe.imgHtml="";
                    photoSwipe.checkeddata=diskJson.data;
                    $("#photo_box .title").html("");
                    $("#photo_box>div>div").empty();
                    $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox"><div class="" style="text-align: center;width:100%;padding-top:14%;"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');
                  //  $("#photo_box>div>div").append('<div id="ind-0" class="contsDetailBox" ><div class="contsBox"><img style="width:55%;height:auto;" src="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/lackbanner.png" alt=""><p>去刷刷段子放松下吧</p></div></div>');

                }


            }
        })
    }



    /*审核数据编辑*/
    function editcheckeddata(checklist){

        let  contenttitle="";
        if(checklist.contenttitle && checklist.contenttitle!=null){
            contenttitle=checklist.contenttitle;
        }
        if(contenttitle.length >35){
            contenttitle=contenttitle.substring(0,35);
            contenttitle=contenttitle+"...<span class='moreTitle'>全文</span>";
        }
        let titlehtml=' <h4 class="title">'+contenttitle+'</h4>';
        let conts="";
        if(checklist.contenttype ==1 || checklist.contenttype ==2){

            conts=' <div class="videoBox"><video id="video" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint"  controlslist="nodownload" autoplay controls="controls" height="100%" width="100%" poster="'+checklist.contenturllist[0]+'"><source src="'+checklist.contenturllist[1]+'">Your browser does not support the video tag</video></div>';
        }else if(checklist.contenttype ==3){
            let ulhtml='';
            if(checklist.contenturllist.length==1){
                ulhtml='<li class="along"><img src="'+checklist.contenturllist[0]+'" alt=""></li>';
            }else if(checklist.contenturllist.length<=5){
                $.each(checklist.contenturllist,function(i,n){
                    let lihtml='<li><img src="'+n+'" alt=""></li>';
                    ulhtml=ulhtml+lihtml;
                });

            }else{
                for(let i=0;i<5;i++){
                    let lihtml='<li><img src="'+checklist.contenturllist[i]+'" alt=""></li>';
                    ulhtml=ulhtml+lihtml;
                }
                ulhtml=ulhtml+"<li><div class='moreImg'>更多</div></li>"
            }

          //  console.log(ulhtml);
            conts='<ul class="consImgList">'+ulhtml+'</ul>';
        }
        //console.log(conts);
        let div='<div id="ind-'+photoSwipe.index+'" class="contsDetailBox">'+titlehtml+'<div class="contsBox">'+conts+'</div></div>';
            /*<span class="ispassimg"><img src="" alt=""></span>*/
        photoSwipe.imgHtml=div;

    }

    /*提交内容*/
function postcheckdata(ispass){
    let userinfolist=JSON.parse(localStorage.userinfolist);
    let codea=userinfolist.appticket;
    let codeb=userinfolist.userid;
    let codec=userinfolist.codec;
    let contentid=photoSwipe.checkeddata.content.contentid;
    let vinfo=checkeduserinfo.level;
    console.log(photoSwipe.checkeddata);
    let datapost={"codea":codea,"codeb":codeb,"codec":codec,"ispass":ispass,"contentid":contentid,"vinfo":vinfo};
    datapost=JSON.stringify(datapost);
    $.ajax({
        url : path+'/webcheck/webCommitContent.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:false,
        data: datapost,
        error: function(data){
            layer.msg("服务器未响应,请稍后再试!");
            //                //console.log("标签列表获取失败：");
            //                //console.log(data);
        },
        success:function(diskJson){
            console.log("提交内容：");
            console.log(diskJson);
            if(diskJson.code=="1000"){


            }else{
                layer.msg("网络有误请重试！！")
            }


        }
    })
}

    var iscanclick=0;
    /*跳过*/
    $("#nextcheckedBtn").click(function(){
        if(iscanclick==0){
            var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
            photoSwipe.animateMove(act_el,-1);
            postcheckdata("UN");
            getcheckdata();
            iscanclick=1;
        }
        setTimeout(function(){
            iscanclick=0;
        },1000)

    });
    /*不通过按钮*/
    $("#tipnotpassBtn").click(function(){
        if(iscanclick==0){
            var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
            photoSwipe.animateMove(act_el,-1);
            postcheckdata("NO");
            getcheckdata();
            iscanclick=1;
        }
        setTimeout(function(){
            iscanclick=0;
        },1000)

    });
    /*通过按钮*/
    $("#tippassBtn").click(function(){
        if(iscanclick==0){
            var act_el=$("#ind-"+(photoSwipe.index-1).toString(10));
            photoSwipe.animateMove(act_el,1);
            postcheckdata("YES");
            getcheckdata();
            iscanclick=1;
        }
        setTimeout(function(){
            iscanclick=0;
        },1000)

    });

    /*全文展开*/
        $("#photo_box").delegate(".moreTitle","click",function(){
            let allTitle= photoSwipe.checkeddata.content.contenttitle;
           $("#titleShowAllBox .title").html(allTitle);
            layer.open({
                type: 1,
                title: '内容',
                shadeClose: true,
                shade: 0.7,
                area: ['90%', '90%'],
                content: $("#titleShowAllBox") //iframe的url
            });
        });

       /* $("#titleShowAllBox").delegate(".lessTitle","click",function(){
           /!* let title= photoSwipe.checkeddata.content.contenttitle;
            title=title.substring(0,35);
            $(this).parent(".title").html(title+"...<span class='moreTitle'>全文</span>")*!/
           layer.closeAll();
        });*/

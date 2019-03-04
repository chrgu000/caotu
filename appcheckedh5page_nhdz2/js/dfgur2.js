


var userstatusvue = new Vue({
    el: '#dfguardian',
    data: {
        timestatus:"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardianunfined.png",
        testtatus:"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardiantestentbtn2.png",
        checkedstatus:"https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardiancheck2.png",
        testurl:"javascript:void(0);",
        checkurl:"javascript:void(0);",
    },
    // 在 `methods` 对象中定义方法
    methods: {
        choose:function(event){

        }

    }
});


var userinfolist={//用户信息
    "appticket":"",
    "userid":"",
    "codec":"dfguardian2.html",
    "isfull":0,//人数是否已满
    "ishave":0,//审核资格
    "istest":0,//测试资格
    "isapp":0
};

  function callappforkey(parm){
      // $("#userfill").html(parm);
      //  $("#userfill2").html(userinfolist.appticket+","+userinfolist.userid);
      let getdata2=JSON.parse(parm);
      userinfolist.appticket=getdata2.key;
      userinfolist.userid=getdata2.userid;
      userinfolist.isapp=1;
      isstatus(getdata2);
  }

/*获取app的参数*/
$(function(){
    var ua = navigator.userAgent;
    if(ua.match(/Android/i) != null){
        try {
            let getdata=window.android.callappforkey();
            // alert(getdata);
            let getdata2=JSON.parse(getdata);
            userinfolist.appticket=getdata2.key;
            userinfolist.userid=getdata2.userid;
            //   $("#userfill").html( '<p>'+userinfolist.appticket+'</p><p>'+userinfolist.userid+'</p>');
            isstatus(getdata2);
        } catch (e) {
            console.log(e);
            userstatusvue.checkurl="isshare.html";
        }//android代码
    } else if(ua.match(/iPhone/i) != null){
        setTimeout(function(){
            if(userinfolist.isapp==0){
                userstatusvue.checkurl="isshare.html";
            }
        },1500)
        // alert("不在app");
        //$("#show").html("不在app");
    }

});

function isstatus(getdata2){
    var datapost={"codea":getdata2.key,"codeb":getdata2.userid,"codec":"dfguardian2.html"};
    datapost=JSON.stringify(datapost);
    $.ajax({
        url : path+'/webcheck/webGetApt.do',
        cache:false,//false就不会从浏览器缓存中加载请求信息了
        type:"POST",
        contentType: "application/json",
        dataType:"JSON",
        async:false,
        data: datapost,
        error: function(data){
            //                //console.log("标签列表获取失败：");
            //                //console.log(data);
        },
        success:function(diskJson){
            // console.log("获取审核资格：");
            // console.log(diskJson);
            if(diskJson.code=="1000"){
                userinfolist.isfull=diskJson.data.isfull;
                userinfolist.ishave=diskJson.data.ishave;
                userinfolist.istest=diskJson.data.istest;

                // $("#userfill2").html(userinfolist.isfull+"/"+userinfolist.ishave+"/"+userinfolist.istest);
                localStorage.userinfolist =JSON.stringify(userinfolist) ;//存缓存
                dealstatus();

            }else{
                // alert(2);
            }


        }
    })
}


function dealstatus(){
    /*没有key和userid跳转下载*/
    if(localStorage.userinfolist=="" || localStorage.userinfolist ==undefined || localStorage.userinfolist == null){
        userstatusvue.checkurl="isshare.html";
    }else{
        var userinfolist=JSON.parse(localStorage.userinfolist);

        //  console.log(userinfolist);
        if(userinfolist.ishave ==1){
            userstatusvue.checkedstatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardiancheck.png";
            userstatusvue.timestatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardianfined.png";
            userstatusvue.testtatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardiantestentbtn2.png";
            userstatusvue.checkurl="checkedindex.html";
            userstatusvue.testurl="javascript:void(0);";
        }else{
            userstatusvue.checkurl="javascript:void(0);";
            userstatusvue.checkedstatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardiancheck2.png";
            if(userinfolist.isfull ==1){
                $("#userFullTipBox").addClass("active");
            }

            if(userinfolist.istest ==1){
                userstatusvue.testurl="dftest.html";
                userstatusvue.testtatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardiantestentbtn.png";
                userstatusvue.timestatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardianfined.png";

            }else{
                userstatusvue.testurl="javascript:void(0);";
                userstatusvue.testtatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardiantestentbtn2.png";
                if(userinfolist.istest ==3){
                    userstatusvue.timestatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardianunfined.png";
                }else if(userinfolist.istest ==2){
                    userstatusvue.timestatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardianfined.png";
                }
            }
        }
    }

    if( localStorage.istest ==1){
        //console.log(22);
        userstatusvue.testurl="javascript:void(0);";
        userstatusvue.testtatus="https://ctkj-1256675270.cos.ap-shanghai.myqcloud.com/appcheckedh5page_nhdz/guardian/guardiantestentbtn2.png";
    }


}

$("#userFullBtn").click(function(){
    $("#userFullTipBox").removeClass("active");
})
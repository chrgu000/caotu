
var postdatas=[];//批量提交的数据

/*----------上传多张图片-------------*/
var input = document.getElementById("commentimgFile");//选择图片的input
var oAdd = document.getElementById("choosePictureBtn");//选择图片的按钮
var oInput = document.getElementById("commentimgFile");//选择图片的input

var typefile=1;//评论类型
var result;//存放图片或者视频的标签
var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
var fd;  //FormData方式发送请求
var commentlibtext="";//评论内容
// var oSelect = document.getElementById("select");

var moviefilecover="";//视频封面
var picfilecover=[];//图片封面
var commentimgisize=[];//图片宽高

if(typeof FileReader==='undefined'){
    layer.msg("抱歉，你的浏览器不支持 FileReader");
    input.setAttribute('disabled','disabled');
}else{
    input.addEventListener('change',readFile,false);
}　　　　　//handler


function readFile(){
    typefile=3;
    moviefilecover="";

    fd = new FormData();
    var iLen = this.files.length;
    var index = 0;
    $("#upfileJd .length").html(commentlistvue.items.length+iLen);//进度显示总数
    for(var i=0;i<iLen;i++){
        if (!input['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)){　　//判断上传文件格式
            return alert("上传的图片格式不正确，请重新选择");
        }
        picfilecover.push({"typefile":3,"cover":""});
        var reader = new FileReader();
        // console.log("this.files::");
        // console.log(this.files);
        reader.index = i;
        reader.file = this.files[i];
        fd.append(i,this.files[i]);
        reader.readAsDataURL(this.files[i]);  //转成base64
        reader.fileName = this.files[i].name;
        // console.log("reader.file:");
        // console.log(reader.file);
        reader.onload = function(e){
            let imgname=stripscript(this.fileName);
           // console.log(imgname);
            var imgMsg = {
                name :imgname ,//获取文件名
                file:this.file,//文件流
                base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
            };
            dataArr.push(imgMsg);


            /*获取宽高*/
            var imageinfo = new Image();
            imageinfo.onload=function(){
                let width = imageinfo.width;
                let height = imageinfo.height;
                commentimgisize.push(width+","+height);
                // console.log(commentimgisize);
            };
            imageinfo.src= this.result;
            //console.log("dataArr::");
            //console.log(dataArr);

            result = '<div class="delete">delete</div><div class="result"><img src="'+this.result+'" alt=""/></div>';
            var div = document.createElement('div');
            div.innerHTML = result;
            div['className'] = 'inputFileShow';
            div['index'] = index;
            $("#commentUrlShowBox").append(div);  　　//插入dom树
            var img = div.getElementsByTagName('img')[0];
            img.onload = function(){
                var nowHeight = ReSizePic(this); //设置图片大小
                this.parentNode.style.display = 'block';
                var oParent = this.parentNode;

                if(nowHeight){
                    oParent.style.paddingTop = (oParent.offsetHeight - nowHeight)/2 + 'px';
                }
                //GIF
                if (reader.fileName.match(/.gif/i)){　　//判断上传文件格式
                    typefile=4;
                    gifCoverimg(this)
                }
            };
            if(dataArr.length>0){
                $("#chooseMovieBtn").attr('disabled','disabled').css("color","#eee");
                $("#choosetextBtn").attr('disabled','disabled').css("color","#eee");
            }
            //console.log("picfilecover::");
            //console.log(picfilecover);
            send1(index);

            div.onclick = function(){
                var ind=$(this).index();
                deletemovie(ind);
              /*  dataArr.splice(ind,1);// 删除dataArr对应的数据
                picfilecover.splice(ind,1);// 删除dataArr对应的数据
                commentimgisize.splice(ind,1);// 删除commentimgisize对应的数据
                postdatas.splice(ind,1);// 删除commentimgisize对应的数据
                if(dataArr.length<=0){
                    $("#chooseMovieBtn").removeAttr("disabled").css("color","#333");
                    $("#choosetextBtn").removeAttr("disabled").css("color","#333");
                }
                this.remove();                  // 在页面中删除该图片元素
                $("#commentUrlShowBox2 .inputFileShow:nth-child("+(ind+1)+")").remove();*/
            };

            index++;

        }

    }
}

/*截取GIF图片封面*/
function gifCoverimg(gift) {
    var canvas = document.createElement("canvas");
    canvas.width = gift.width ;
    canvas.height = gift.height;
    canvas.getContext('2d').drawImage(gift, 0, 0, canvas.width, canvas.height);
    let urlData = canvas.toDataURL("image/png");
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    var fbloblist={
        "file": new Blob( [ab] , {type : 'image/png'},{"name":"giffengmian.png"}),
        "name":"giffengmian.png"
    };
    // //console.log("fbloblist::");
    // //console.log(fbloblist);
    runAsync(fbloblist).then(function(data){
        let onetdk=data.Url.substring(0, data.Url.indexOf('?'));
        //console.log("onetdk::");
        //console.log(onetdk);
        var ind=$("#commentUrlShowBox .inputFileShow:last-child").index();
        //console.log(ind);
        picfilecover[ind]={"typefile":4,"cover":onetdk};


    }).then(function(onetdk) {

    });

}

/*添加图片*/
oAdd.onclick=function(){
    oInput.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
    commentlistvue.commenttype="t2";

    //清空已选图片
    imgmovurl=[];
    moviefilecover="";//视频封面
    picfilecover=[];//图片封面
    dataArr = [];
    commentimgisize = [];


    if(dataArr.length >=9){
        layer.msg("你已上传9张图片！！");
    }else{
        oInput.click();
    }


};

/*
       用ajax发送fd参数时要告诉jQuery不要去处理发送的数据，
       不要去设置Content-Type请求头才可以发送成功，否则会报“Illegal invocation”的错误，
       也就是非法调用，所以要加上“processData: false,contentType: false,”
       * */
function ReSizePic(ThisPic) {
    var RePicWidth = 200; //这里修改为您想显示的宽度值

    var TrueWidth = ThisPic.width; //图片实际宽度
    var TrueHeight = ThisPic.height; //图片实际高度

    if(TrueWidth>TrueHeight){
        //宽大于高
        var reWidth = RePicWidth;
        ThisPic.width = reWidth;
        //垂直居中
        var nowHeight = TrueHeight * (reWidth/TrueWidth);
        return nowHeight;  //将图片修改后的高度返回，供垂直居中用
    }else{
        //宽小于高
        var reHeight = RePicWidth;
        ThisPic.height = reHeight;
    }
}



/*----------上传视频-------------*/
var input2 = document.getElementById("commentmovieFile");
let videofile="";
var fd2;  //FormData方式发送请求
var oAdd2 = document.getElementById("chooseMovieBtn");
var oInput2 = document.getElementById("commentmovieFile");

if(typeof FileReader==='undefined'){
    layer.msg("抱歉，你的浏览器不支持 FileReader");
    input2.setAttribute('disabled','disabled');
}else{
    input2.addEventListener('change',readFile2,false);
}　　　　　//handler


function readFile2(){
    typefile=1;
    moviefilecover="";
    picfilecover=[];
    fd2 = new FormData();
    var iLen = this.files.length;
    var index = 0;
    $("#upfileJd .length").html(commentlistvue.items.length+iLen);//进度显示总数
    for(var i=0;i<iLen;i++){
        if (!input2['value'].match(/.mp4|.mpeg|.mpg|.mpp|.ogg/i)){　　//判断上传文件格式
            return alert("上传的视频格式不正确，请重新选择");
        }

       // console.log(this.files[0]);
        var reader2 = new FileReader();
        reader2.index = i;
        reader2.file = this.files[i];//把当前的 files[0] 传进去
        reader2.file2 = getFileURL(this.files[i]);//把当前的 files[0] 传进去
        reader2.fileName = this.files[i].name;
        fd2.append(i,this.files[i]);
        reader2.readAsDataURL(this.files[i]);  //转成base64
        reader2.onload = function(e){
           // let imgname=stripscript(this.fileName);
            let date= Date.now().toString(36);
            let imgname=date+".mp4";
           // console.log(imgname);
            var moveMsg = {
                name : imgname,//获取文件名
                file:this.file,//文件流
            };
            dataArr.push(moveMsg);
            let videofilesid="videofiles"+index;
            var resultdiv = '<div class="delete2">X</div><div class="result"><video id="'+videofilesid+'" controls="controls" src="'+this.file2+'">您的浏览器不支持</video></div>';
            var div = document.createElement('div');
            div.innerHTML = resultdiv;
            div['className'] = 'inputFileShow2';
            div['index'] = index;
           // $("#commentUrlShowBox").empty();                  // 在页面中删除该图片元素
            $("#commentUrlShowBox").append(div);  　　//插入dom树
         /*   $("#commentUrlShowBox .result video")[0].addEventListener('play',function () {
                let videoH =  $("#commentUrlShowBox .result video")[0].offsetHeight;
                let videoW =  $("#commentUrlShowBox .result video")[0].offsetWidth;
                commentimgisize.push(videoW+","+videoH);
               // console.log(commentimgisize);
            });*/
            videofile=document.getElementById(videofilesid);
            captureImage(videofile);
            if(dataArr.length>0){
                $("#choosePictureBtn").attr('disabled','disabled').css("color","#eee");
                $("#choosetextBtn").attr('disabled','disabled').css("color","#eee");
            }

            send1(index);
            index++;
        }

    }
}


/*截取视频图片*/
function captureImage(videofile) {
    var canvas = document.createElement("canvas");
    canvas.width = videofile.videoWidth * 0.8;
    canvas.height = videofile.videoHeight * 0.8;
    commentimgisize.push(canvas.width+","+canvas.height);
    let movirtype=1;
    if(canvas.width >= canvas.height){
        movirtype=1;
    }else{
        movirtype=2;
    }
    if(videofile.videoWidth >=videofile.videoHeight+30 ){
        typefile=1;
    }else{
        typefile=2;
    }
    canvas.getContext('2d').drawImage(videofile, 0, 0, canvas.width, canvas.height);
    let urlData = canvas.toDataURL("image/png");
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    var fbloblist={
        "file": new Blob( [ab] , {type : 'image/png'},{"name":"fengmian.png"}),
        "name":"fengmian.png"
    };
    // console.log("fbloblist::");
    // console.log(fbloblist);
    runAsync(fbloblist).then(function(data){
        let onetdk=data.Url.substring(0, data.Url.indexOf('?'));
        moviefilecover=onetdk;
        picfilecover.push({"typefile":movirtype,"cover":onetdk});
    }).then(function(onetdk) {

    });

}



/*删除视频*/
$("#commentUrlShowBox").delegate(".delete2","click",function(){
    var ind=$(this).parents(".inputFileShow2").index();
    deletemovie(ind);
});

/*删除文字*/
$("#commentUrlShowBox").delegate(".inputFileShow3 .delete","click",function(){
    var ind=$(this).parents(".inputFileShow3").index();
    deletemovie(ind);
});
function deletemovie(ind){
    dataArr.splice(ind,1);// 删除dataArr对应的数据
    picfilecover.splice(ind,1);// 删除dataArr对应的数据
    commentimgisize.splice(ind,1);// 删除commentimgisize对应的数据
    postdatas.splice(ind,1);// 删除commentimgisize对应的数据
    commentlistvue.items.splice(ind,1);// 删除commentimgisize对应的数据
    $("#upfileJd .jd").html(commentlistvue.items.length);//进度显示
    $("#upfileJd .length").html(commentlistvue.items.length);//进度显示
    if(commentlistvue.commenttype=="t2"){
        if(dataArr.length<=0){
            $("#chooseMovieBtn").removeAttr("disabled").css("color","#333");
            $("#choosetextBtn").removeAttr("disabled").css("color","#333");
        }
        $("#commentUrlShowBox .inputFileShow:nth-child("+(ind+1)+")").remove();                // 在页面中删除该图片元素
    }else if(commentlistvue.commenttype=="m1"){
        if(dataArr.length<=0){
            $("#choosePictureBtn").removeAttr("disabled").css("color","#333");
            $("#choosetextBtn").removeAttr("disabled").css("color","#333");
        }
        $("#commentUrlShowBox .inputFileShow2:nth-child("+(ind+1)+")").remove();                // 在页面中删除该图片元素
    }else if(commentlistvue.commenttype=="w3"){
        if(commentlistvue.items.length<=0){
            $("#choosePictureBtn").removeAttr("disabled").css("color","#333");
            $("#chooseMovieBtn").removeAttr("disabled").css("color","#333");
        }
        $("#commentUrlShowBox .inputFileShow3:nth-child("+(ind+1)+")").remove();                // 在页面中删除该图片元素
    }



   // $("#commentUrlShowBox2 .inputFileShow2:nth-child("+(ind+1)+")").remove();
}
/*获取视频路径*/
function getFileURL(file) {

    var getUrl = null;

    if (window.createObjectURL != undefined) { // basic

        getUrl = window.createObjectURL(file);

    } else if (window.URL != undefined) { // mozilla(firefox)

        getUrl = window.URL.createObjectURL(file);

    } else if (window.webkitURL != undefined) { // webkit or chrome

        getUrl = window.webkitURL.createObjectURL(file);

    }

    return getUrl;

}

/*添加视频*/
oAdd2.onclick=function(){
    oInput2.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
    oInput2.click();
    commentlistvue.commenttype="m1";

    //清空已选图片
    imgmovurl=[];
    moviefilecover="";//视频封面
    picfilecover=[];//图片封面
    dataArr = [];
    commentimgisize = [];


};




/*发送*/
function send1(index){
    runAsync(dataArr[index]).then(function(data){
            let onetdk=data.Url.substring(0, data.Url.indexOf('?'));
            //console.log("onetdk::");
            //console.log(onetdk);
            let commentliburl=[];
            let commentlibtext="";
             commentliburl.push({"type":picfilecover[index].typefile,"cover":picfilecover[index].cover,"info":onetdk,"size":commentimgisize[index]});

            let createuser=userdatas.data.userid;
            let commentlibtagid=$("#tagSelectAll").val();
            commentlistvue.items.push({"createuser":createuser,
                "commentlibtagid":commentlibtagid,
                "commentlibtext":commentlibtext,
                "commentliburl":commentliburl}
            );
            $("#upfileJd .jd").html(commentlistvue.items.length);//进度显示
            // console.log("commentlistvue.items::");
            // console.log(commentlistvue.items);

        })

}


/*----------上传文字text-------------*/
var input3 = document.getElementById("commenttextFile");
var fd3;  //FormData方式发送请求
var oAdd3 = document.getElementById("choosetextBtn");
var oInput3 = document.getElementById("commenttextFile");

if(typeof FileReader==='undefined'){
    layer.msg("抱歉，你的浏览器不支持 FileReader");
    input3.setAttribute('disabled','disabled');
}else{
    input3.addEventListener('change',readFile3,false);
}　　　　　//handler

function readFile3(){
    typefile=4;
    moviefilecover="";
    fd3 = new FormData();
    var iLen = this.files.length;
    var index = 0;
    for(var i=0;i<iLen;i++){
        if (!input3['value'].match(/.txt/i)){　　//判断上传文件格式
            return alert("上传的文件格式不正确，请重新选择");
        }
        picfilecover.push({"typefile":4,"cover":""});
        var reader = new FileReader();
        reader.index = i;
        reader.file = this.files[i];
        fd3.append(i,this.files[i]);
        reader.fileName = this.files[i].name;
        //console.log("reader.file:");
        //console.log(reader.file);
        reader.readAsText(this.files[i],'gbk');
        reader.onload = function(e){
           let geutextfile=this.result;
           let textfilelist=geutextfile.split("nr;;");
            //console.log("textfilelist::");
            //console.log(textfilelist);
            if(textfilelist.length >0){
                $("#upfileJd .length").html(commentlistvue.items.length+textfilelist.length);//进度显示总数
                $.each(textfilelist,function(i,n){
                    let textdiv = '<div class="delete">X</div><div class="result"><p>.'+n+'</p></div>';
                    var div = document.createElement('div');
                    div.innerHTML = textdiv;
                    div['className'] = 'inputFileShow3';
                    div['index'] = index;
                    $("#commentUrlShowBox").append(div);  　　//插入dom树

                    let createuser=userdatas.data.userid;
                    let commentlibtagid=$("#tagSelectAll").val();
                    let commentliburl=[];
                    commentlistvue.items.push({"createuser":createuser,
                        "commentlibtagid":commentlibtagid,
                        "commentlibtext":n,
                        "commentliburl":commentliburl}
                    );
                    $("#upfileJd .jd").html(commentlistvue.items.length);//进度显示
                });
                $("#chooseMovieBtn").attr('disabled','disabled').css("color","#eee");
                $("#choosePictureBtn").attr('disabled','disabled').css("color","#eee");
            }
            index++;

        }

    }
}

/*添加文字*/
oAdd3.onclick=function(){
    oInput3.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
    oInput3.click();
    commentlistvue.commenttype="w3";

};
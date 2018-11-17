/*-----------------内容传图和视频-------------------------*/


/*----------上传多张图片-------------*/
var coninput = document.getElementById("chooseConImgInput");//图片上传input
var conresult;
var condataArr = []; // 储存所选图片的结果(文件名和base64数据)
var confd;  //FormData方式发送请求
var conoAdd = document.getElementById("chooseConImgBtn");//图片点击按钮
var conoInput = document.getElementById("chooseConImgInput");//图片上传input



if(typeof FileReader==='undefined'){
    layer.msg("抱歉，你的浏览器不支持 FileReader");
    coninput.setAttribute('disabled','disabled');
}else{
    coninput.addEventListener('change',conreadFile,false);
}　　　　　//handler


function conreadFile(){
    confd = new FormData();
    var iLen = this.files.length;
    //console.log(iLen);
    var index = 0;
    for(var i=0;i<iLen;i++){
        if (!coninput['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)){　　//判断上传文件格式
            return alert("上传的图片格式不正确，请重新选择");
        }
        var reader = new FileReader();
        reader.index = i;
        reader.file = this.files[0];
        confd.append(i,this.files[i]);
        reader.readAsDataURL(this.files[i]);  //转成base64
        reader.fileName = this.files[i].name;
        reader.onload = function(e){
            var imgMsg = {
                name : this.fileName,//获取文件名
                file:this.file,//文件流
                base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
            };
            condataArr.push(imgMsg);
          /*  console.log("condataArr::");
            console.log(condataArr);
            conresult = '<div class="delete">delete</div><div class="result"><img src="'+this.result+'" alt=""/></div>';
            var div = document.createElement('div');
            div.innerHTML = conresult;
            div['className'] = 'inputFileShow';
            div['index'] = index;
            $("#mainContain").append(div);  　　//插入dom树
            var img = div.getElementsByTagName('img')[0];
            img.onload = function(){
                var nowHeight = ReSizePic(this); //设置图片大小
                this.parentNode.style.display = 'block';
                var oParent = this.parentNode;
                if(nowHeight){
                    oParent.style.paddingTop = (oParent.offsetHeight - nowHeight)/2 + 'px';
                }
            };*/
            /*提交到腾讯云*/
            sendpicture(imgMsg);
           /* div.onclick = function(){
                var ind=$(this).index();
                condataArr.splice(ind,1);// 删除dataArr对应的数据
                this.remove();                  // 在页面中删除该图片元 素
            };*/
            index++;
        }
    }
}


/*添加图片*/
conoAdd.onclick=function(){
    conoInput.value = "";   // 先将conoInput值清空，否则选择图片与上次相同时change事件不会触发
    if(contentDatasurllist.length >=9){
        layer.msg("你已上传9张图片！！");
    }else{
        conoInput.click();
    }
};

/*-------------发送------------------*/
function sendpicture(filedata){
    runAsync(filedata).then(function(data){
        let onetdk=data.Url.substring(0, data.Url.indexOf('?'));
        return onetdk;
    }).then(function(onetdk) {
        let contype=$("#movieStyle").attr("data-val");
        if(contype ==5){
            contentDatasurllist=[];
        }
        contentDatasurllist.push(onetdk);
        //console.log("contentDatasurllist::");
        //console.log(contentDatasurllist);
        $("#mainContain").load("picturecheck.html",function(){
            geturl(contentDatasurllist);
        })
    });
}

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
var conmovieinput2 = document.getElementById("chooseConMovieInput");
var conmoviefd2;  //FormData方式发送请求
var conmovieoAdd2 = document.getElementById("chooseConMovieBtn");//选择视频按钮
var conmovieoInput2 = document.getElementById("chooseConMovieInput");
var moviedatalist=[];//展示的视频链接

if(typeof FileReader==='undefined'){
    layer.msg("抱歉，你的浏览器不支持 FileReader");
    conmovieinput2.setAttribute('disabled','disabled');
}else{
    conmovieinput2.addEventListener('change',conreadFile2,false);
}　　　　　//handler


function conreadFile2(){
    contentDatasurllist=["",""];
    moviedatalist=["",""];
    conmoviefd2 = new FormData();
    var iLen = this.files.length;
    var index = 0;
    for(var i=0;i<iLen;i++){
        if (!conmovieinput2['value'].match(/.mp4|.mpeg|.mpg|.mpp|.ogg/i)){　　//判断上传文件格式
            return alert("上传的视频格式不正确，请重新选择");
        }
       // console.log(this.files[0]);
        var reader2 = new FileReader();
        reader2.index = i;
        reader2.file = this.files[0];//把当前的 files[0] 传进去
        reader2.file2 = getconFileURL(this.files[0]);//把当前的 files[0] 传进去
        reader2.fileName = this.files[i].name;
        conmoviefd2.append(i,this.files[i]);
        reader2.readAsDataURL(this.files[i]);  //转成base64
        reader2.onload = function(e){
            var moveMsg = {
                name : this.fileName,//获取文件名
                file:this.file,//文件流
            };
            moviedatalist[1]=this.result;
            sendmovie(moveMsg);


        }
    }
}


/*截取视频图片*/
function concaptureImage(videofile) {
    var canvas = document.createElement("canvas");
    canvas.width = videofile.videoWidth * 0.8;
    canvas.height = videofile.videoHeight * 0.8;
    if(videofile.videoWidth >=videofile.videoHeight+30 ){
       $("#movieStyle").attr("data-val","1").html("横视频");
    }else{
        $("#movieStyle").attr("data-val","2").html("竖视频");
    }
    canvas.getContext('2d').drawImage(videofile, 0, 0, canvas.width, canvas.height);
    $("#movieImgBox .movieshowimg img").attr("data-width",videofile.videoWidth);
    $("#movieImgBox .movieshowimg img").attr("data-height",videofile.videoHeight);
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
        contentDatasurllist[0]=onetdk;
        $("#movieImgBox .movieshowimg img").attr("src",onetdk);
       // console.log(contentDatasurllist);
    }).then(function(onetdk) {

    });

}

/*获取视频路径*/
function getconFileURL(file) {

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

/*-------------发送视频------------------*/
function sendmovie(filedata){
    runAsync(filedata).then(function(data){
        let onetdk=data.Url.substring(0, data.Url.indexOf('?'));
        contentDatasurllist[1]=onetdk;
        $("#movieImgBox .movieCoverBox").css("display","block");
        $("#mainContain").load("moveicheck.html",function(){
            geturl(moviedatalist);

        })
    }).then(function() {


    });
}

/*添加视频*/
conmovieoAdd2.onclick=function(){
    conmovieoInput2.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
    conmovieoInput2.click();
};






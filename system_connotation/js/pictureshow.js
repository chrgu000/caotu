/**
 * Created by zhu on 2018/7/31.
 */

/*���չ��*/
    $("#imgconbox").delegate("a","click",function(e){
        e && e.preventDefault?e.preventDefault(): window.event.returnValue = false;
        $("#blueimp-gallery").css({"display":"block","opacity":1});
        var imglist=$("#imgconbox a");
        var gallywidth= $("#blueimp-gallery").width();
        $("#blueimp-gallery .slides").css({"width":gallywidth*imglist.length+"px"});
        $.each(imglist,function(i,n){
            var hre=$(n).attr("href");
            $("#blueimp-gallery .slides").append('<div class="slide" data-index="'+i+'" style="width:'+gallywidth+'px"><img draggable="false" title="ͼƬ" src="'+hre+'" class="slide-content"></div>');
            $("#blueimp-gallery .indicator").append('<li title="ͼƬ" data-index="'+i+'" style="background-image: url(&quot;'+hre+'&quot;);"></li>');
        });
        console.log(imglist);
    });
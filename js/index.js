window.onload=function(){
    //页面元素的获取   注意一下queryselector的坑
    var head = document.querySelector("#head");
    var liNodes = document.querySelectorAll("#head .headMain .nav .list li");
    var upNodes = document.querySelectorAll("#head .headMain .nav .list li .up");
    var firstUp = upNodes[0];
    var arrow = document.querySelector("#head .headMain .arrow");

    var content = document.querySelector("#content");
    var cList = document.querySelector("#content .list");
    var cLiNodes = document.querySelectorAll("#content .list > li");

    var home1Lis=document.querySelectorAll("#content .list .home .home1 > li");
    var home2Lis=document.querySelectorAll("#content .list .home .home2 > li");
    var home = document.querySelector("#content .list .home");

    var aboutUL = document.querySelectorAll("#content .list .about .about3 > .item ul");

    var team3 = document.querySelector("#content .list .team .team3")
    var teamLis = document.querySelectorAll("#content .list .team .team3 > ul > li");

    var menuLis = document.querySelectorAll("#content .menuBar li");

    var music = document.querySelector("#head .music");
    var audio = music.querySelector("audio");

    var spanNode = document.querySelector("#mask span");
    var maskDiv = document.querySelectorAll("#mask div");
    var mask = document.querySelector("#mask");

    //同步导航的当前下标到全局作用域
    //在页面缩小时,使当前布局不会错乱
    //为滚轮逻辑提供信息  滚轮初次滚动时，停在的是哪一屏
    var now = 0;
    var timer =0;
    //默认值一定要给0
    var oldIndex =0;
    var autoIndex =0;
    var timer3d = 0;
    var preIndex =0;

    //在页面缩小时,同步内容区的高度，同步列表的位置（top），小箭头的位置
    //但凡和视口尺寸有关的逻辑在onresize中都需要进行同步
    window.onresize=function(){
        contentBind();
        arrow.style.left = liNodes[now].getBoundingClientRect().left+ liNodes[now].offsetWidth/2 - arrow.offsetWidth/2+"px";
        cList.style.top = -now *(document.documentElement.clientHeight - head.offsetHeight) +"px";
    }
    //开机动画
    loading();
    function loading(){
        var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
        var flag =0;
        for(var i=0;i<arr.length;i++){
            var img = new Image();
            img.src = "img/"+arr[i];
            img.onload=function(){
                flag++;
                spanNode.style.width = flag/arr.length*100+"%";
            }
        }

        spanNode.addEventListener("transitionend",function(){
            if(flag/arr.length == 1){
                maskDiv[0].style.height=0;
                maskDiv[1].style.height=0;
                this.style.display="none";
            }
        })

        maskDiv[0].addEventListener("transitionend",function(){
            mask.remove();
            animationAttr[0]["inAn"]();
            music.onclick();
            home3D();
        })
    }


    //音频
    music.onclick=function(){
        if(audio.paused){
            audio.play();
            this.style.background = "url(img/musicon.gif) no-repeat";
        }else{
            audio.pause();
            this.style.background = "url(img/musicoff.gif) no-repeat";
        }
    }


    //出入场动画
    var animationAttr=[
        {
            inAn:function(){
                var home1 = document.querySelector("#content .list .home .home1");
                var home2 = document.querySelector("#content .list .home .home2");

                home1.style.opacity=1;
                home2.style.opacity=1;

                home1.style.transform = "translateY(0px)";
                home2.style.transform = "translateY(0px)";
            },
            outAn:function(){
                var home1 = document.querySelector("#content .list .home .home1");
                var home2 = document.querySelector("#content .list .home .home2");

                home1.style.opacity=0;
                home2.style.opacity=0;

                home1.style.transform = "translateY(-200px)";
                home2.style.transform = "translateY(200px)";
            }
        },
        {
            inAn:function(){
                var  plane1   = document.querySelector("#content .list .course .plane1");
                var  plane2   = document.querySelector("#content .list .course .plane2");
                var  plane3   = document.querySelector("#content .list .course .plane3");

                plane1.style.transform="translate(0px,0px)";
                plane2.style.transform="translate(0px,0px)";
                plane3.style.transform="translate(0px,0px)";
            },
            outAn:function(){
                var  plane1   = document.querySelector("#content .list .course .plane1");
                var  plane2   = document.querySelector("#content .list .course .plane2");
                var  plane3   = document.querySelector("#content .list .course .plane3");

                plane1.style.transform="translate(-200px,-200px)";
                plane2.style.transform="translate(-200px,200px)";
                plane3.style.transform="translate(200px,-200px)";
            }
        },
        {
            inAn:function(){
                var  pencel1   = document.querySelector("#content .works  .pencel1");
                var  pencel2   = document.querySelector("#content .works  .pencel2");
                var  pencel3   = document.querySelector("#content .works  .pencel3");

                pencel1.style.transform="translateY(0px)";
                pencel2.style.transform="translateY(0px)";
                pencel3.style.transform="translateY(0px)";
            },
            outAn:function(){
                var  pencel1   = document.querySelector("#content .works  .pencel1");
                var  pencel2   = document.querySelector("#content .works  .pencel2");
                var  pencel3   = document.querySelector("#content .works  .pencel3");

                pencel1.style.transform="translateY(-200px)";
                pencel2.style.transform="translateY(200px)";
                pencel3.style.transform="translateY(200px)";
            }
        },
        {
            inAn:function(){
                var  about3Img1   = document.querySelector("#content .list .about .about3 > .item:nth-child(1)");
                var  about3Img2   = document.querySelector("#content .list .about .about3 > .item:nth-child(2)");

                about3Img1.style.transform="rotate(0deg)";
                about3Img2.style.transform="rotate(0deg)";
            },
            outAn:function(){
                var  about3Img1   = document.querySelector("#content .list .about .about3 > .item:nth-child(1)");
                var  about3Img2   = document.querySelector("#content .list .about .about3 > .item:nth-child(2)");

                about3Img1.style.transform="rotate(45deg)";
                about3Img2.style.transform="rotate(-45deg)";
            }
        },
        {
            inAn:function(){
                var  team1   = document.querySelector("#content .list .team .team1");
                var  team2   = document.querySelector("#content .list .team .team2");

                team1.style.transform="translateX(0px)";
                team2.style.transform="translateX(0px)";
            },
            outAn:function(){
                var  team1   = document.querySelector("#content .list .team .team1");
                var  team2   = document.querySelector("#content .list .team .team2");

                team1.style.transform="translateX(-200px)";
                team2.style.transform="translateX(200px)";
            }
        }
    ]

    for(var i=0;i<animationAttr.length;i++){
        animationAttr[i]["outAn"]();
    }

//			setTimeout(function(){
//				animationAttr[0]["inAn"]();
//			},1000);

    //canvas动画
    canvasAn();
    function canvasAn(){

        var oc =null;
        var timer1=0;
        var timer2=0;

        team3.onmouseleave=function(){
            for(var i=0;i<teamLis.length;i++){
                teamLis[i].style.opacity=1;
            }

            removeCanvas();
        }

        for(var i=0;i<teamLis.length;i++){
            teamLis[i].onmouseenter=function(){
                for(var i=0;i<teamLis.length;i++){
                    teamLis[i].style.opacity=.5;
                }
                this.style.opacity=1;
                //在team3底下添加一个canvas元素
                addCanvas();
                oc.style.position ="absolute";
                oc.style.left = this.offsetLeft+"px";
                oc.style.top = 0+"px";
//						oc.style.background = "pink";
            }
        }

        function removeCanvas(){
            clearInterval(timer1);
            clearInterval(timer2);
            oc.remove();
            oc =null;
        }

        function addCanvas(){
            if(!oc){
                oc = document.createElement("canvas");
                oc.width = teamLis[0].offsetWidth;
                oc.height=338;
                team3.appendChild(oc);
                QiPao();
            }
        }

        function QiPao(){
            if(oc.getContext){
                var ctx = oc.getContext("2d");

                //存放圆的所有信息
                var  arr=[];

                //实现动画
                timer1=	setInterval(function(){
                    console.log(arr)
                    ctx.clearRect(0,0,oc.width,oc.height);

                    //平滑的修改
                    for(var i=0;i<arr.length;i++){
                        arr[i].deg+=5;
                        arr[i].x =arr[i].startX + (Math.sin(arr[i].deg*Math.PI/180))*arr[i].num;
                        arr[i].y = arr[i].startY - 0.5*(arr[i].deg*Math.PI/180)*arr[i].num*1.5;
                        if(arr[i].y<50){
                            arr.splice(i,1);
                        }
                    }


                    for(var i=0;i<arr.length;i++){
                        ctx.fillStyle="rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].a+")";
                        ctx.beginPath();
                        ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
                        ctx.fill();
                    }
                },1000/60)


                //维护数据
                timer2=	setInterval(function(){
                    var r = Math.round(Math.random()*6+2);
                    var x = Math.round(Math.random()*oc.width);
                    var y = oc.height - r-2;

                    var red = Math.round(Math.random()*255);
                    var green = Math.round(Math.random()*255);
                    var blue = Math.round(Math.random()*255);
                    var a = 1;

                    var startX = x;
                    var startY = y;
                    var deg = 0;
                    var num = Math.round(Math.random()*30)+30;

                    arr.push({
                        x:x,
                        y:y,
                        r:r,
                        red:red,
                        green:green,
                        blue:blue,
                        a:a,
                        startX:startX,
                        startY:startY,
                        deg:deg,
                        num:num
                    })

                },50);
            }
        }
    }

    //图片炸裂
    picBoom();
    function picBoom(){
        for(var i=0;i<aboutUL.length;i++){
            change(aboutUL[i]);
        }


        function change(ul){
            var src = ul.dataset.src;
            var w = ul.offsetWidth/2;
            var h = ul.offsetHeight/2;

            for(var i=0;i<4;i++){
                var liNode = document.createElement("li");
                var imgNode = document.createElement("img");
                liNode.style.width = w+"px";
                liNode.style.height = h+"px";
                imgNode.src=src;
                //	left:0     top:0
                //	left:-w   top:0
                //	left:0		 top:-h
                //	left:-w	 top:-h
                imgNode.style.left=-(i%2)*w+"px"	;
                imgNode.style.top=-Math.floor((i/2))*h+"px";

                liNode.appendChild(imgNode);
                ul.appendChild(liNode)
            }

//					var aboutImgs= document.querySelectorAll("#content .list .about .about3 > .item ul img");  错误 querySelectorAll的坑
            var aboutImgs= ul.querySelectorAll("img");
            ul.onmouseenter=function(){
                //	left:0  top:h
                //	left:-2w  top:0
                //	left:w  top:-h
                //	left:-w  top:-2h
                aboutImgs[0].style.top=h+"px";
                aboutImgs[1].style.left=-2*w+"px";
                aboutImgs[2].style.left= w+"px";
                aboutImgs[3].style.top= -2*h+"px";

            }
            ul.onmouseleave=function(){
                aboutImgs[0].style.top=0+"px";
                aboutImgs[1].style.left=-w+"px";
                aboutImgs[2].style.left= 0+"px";
                aboutImgs[3].style.top= -h+"px";

            }

        }
    }


    //3d轮播
//			home3D();
    function home3D(){
        for(var i=0;i<home2Lis.length;i++){
            home2Lis[i].index = i;
            home2Lis[i].onclick=function(){
                clearInterval(timer3d);

                for(var i=0;i<home2Lis.length;i++){
                    home2Lis[i].className="";
                }
                this.className="active";

                if(this.index<oldIndex){
                    //点左边  左边显示（leftShow）  右边隐藏（rightHide）
                    home1Lis[this.index].className="leftShow";
                    home1Lis[oldIndex].className="rightHide";
                }else if(this.index>oldIndex){
                    //点右边 右边显示（rightShow）  左边隐藏（leftHide）
                    home1Lis[this.index].className="rightShow";
                    home1Lis[oldIndex].className="leftHide";
                }

                oldIndex = this.index;
                autoIndex = this.index;

//						move();
            }
        }

        //自动轮播
        move();
        function move(){
            clearInterval(timer3d);
            timer3d = setInterval(function(){
                autoIndex++;
                if(autoIndex == home2Lis.length){
                    autoIndex=0;
                }

                for(var i=0;i<home2Lis.length;i++){
                    home2Lis[i].className="";
                }
                home2Lis[autoIndex].className="active";

                home1Lis[autoIndex].className="rightShow";
                home1Lis[oldIndex].className="leftHide";

                oldIndex = autoIndex;
            },3000)
        }

        home.onmouseenter = function(){
            clearInterval(timer3d);
        }
//				home.onmouseleave = function(){
//					move();
//				}
    }



    //滚动逻辑
    //滚轮事件的一般写法
    if(content.addEventListener){
        content.addEventListener("DOMMouseScroll",function(ev){
            clearTimeout(timer);
            timer=setTimeout(function(){
                fn(ev);
            },200)
        });
    }
    content.onmousewheel=function(ev){
        clearTimeout(timer);
        timer=setTimeout(function(){
            fn(ev);
        },200)
    };
    function fn(ev){
        ev = ev||event;
        var flag ="";
        if(ev.detail){
            flag = ev.detail>0?"down":"up";
        }else if(ev.wheelDelta){
            flag = ev.wheelDelta<0?"down":"up";
        }

        preIndex =now;
        if((now==0&&flag=="up")||(now==cLiNodes.length-1&&flag=="down")){
            return;
        }

        switch (flag){
            case "up":
                if(now>0){
                    now--;
                }
                move(now);
                break;
            case "down":
                if(now<cLiNodes.length-1){
                    now++;
                }
                move(now);
                break;
        }

        if(ev.preventDefault){
            ev.preventDefault();
        }

        return false;
    }



    //内容区
    //内容区的高度  每个列表的高度  永远要等于视口的高度 - 头部的高度
    contentBind();
    function contentBind(){
        content.style.height = document.documentElement.clientHeight - head.offsetHeight +"px";
        for(var i=0;i<cLiNodes.length;i++){
            cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight +"px";
        }
    }


    //头部
    headBind()
    function headBind(){
        firstUp.style.width = "100%";
        arrow.style.left = liNodes[0].getBoundingClientRect().left+ liNodes[0].offsetWidth/2 - arrow.offsetWidth/2+"px";

        for(var i=0;i<liNodes.length;i++){
            liNodes[i].index = i;
            liNodes[i].onclick=function(){
                preIndex = now;
                move(this.index);
                now = this.index;
            }
        }

        for(var i=0;i<menuLis.length;i++){
            menuLis[i].index = i;
            menuLis[i].onclick=function(){
                preIndex=now;
                move(this.index);
                now = this.index;
            }
        }
    }
    //移动效果   函数的抽象   函数化！！！
//			move(4);
    function move(index){
        //同步主导航的位置
        for(var i=0;i<upNodes.length;i++){
            //一定要置为空
            upNodes[i].style.width="";
        }
        upNodes[index].style.width="100%";

        //同步侧边导航的选中状态
        for(var i=0;i<menuLis.length;i++){
            menuLis[i].className="";
        }
        menuLis[index].className="active";

        //同步小箭头的位置
        arrow.style.left = liNodes[index].getBoundingClientRect().left+ liNodes[index].offsetWidth/2 - arrow.offsetWidth/2+"px";
        //同步主体列表的位置
        cList.style.top = -index *(document.documentElement.clientHeight - head.offsetHeight) +"px";

        //出入场逻辑
        if(animationAttr[index]&&animationAttr[index]["inAn"]){
            animationAttr[index]["inAn"]();
        }
        if(animationAttr[preIndex]&&animationAttr[preIndex]["outAn"]){
            animationAttr[preIndex]["outAn"]();
        }
    }


}
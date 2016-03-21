window.onload = function(){
	$(".header-box>div").click(function(){
		$index = $(this).index()
		$(this).css({color:"white",background:"#79c1df"}).siblings().css({color:"#b1e4f8",background:"#57b2d7"})
		Iscroll2()
	})
	$(".tab>li").click(function(){
		$index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".container").eq($index).show().siblings().hide()
		myscroll.scrollTo(0,0,0)
		myscroll.refresh();
	})
	//iscroll
	var myscroll;
	var Height=$(window).height();
	var topHeight=$("header").height();
	var tabHeight=$(".tab").height();
	var footerHeight=$(".footer").height();
	$("#wrapper").height(Height-topHeight-tabHeight-footerHeight-10)
	myscroll=new iScroll("wrapper",{hScrollbar:false,vScrollbar:false});
	myscroll.refresh();
	
	//加载
	var $index;
	var flag=1;
	$(".tab li").on("tap",function(e){
		var e = e||event;
		$index  = $(this).index();
		e.preventDefault();
		tweet($index,flag)
	})
	function tweet($index,flag){
		console.log(flag)
		$.ajax({
			url:"http://localhost:8080/Proxy/FootBall/tweet/json/query/hotspot.do",
			data:{"category":$index+1 },
			success:function(d){
				var data = JSON.parse(d);
//				console.log(data)
				if(flag==1){
					for(var i=0;i<data.data.tweetlist.length;i++){
						var Li = $("<li></li>");
						var Img = $("<img src='http://101.200.173.217:8080/FootBall"+data.data.tweetlist[i].defaultFilePath+data.data.tweetlist[i].thumbnailname+"' />");
						var P = $("<p>"+data.data.tweetlist[i].content+"</p>");
						var Height1 = $(".container").eq($index).find("ul").eq(0).height();
						var Height2 = $(".container").eq($index).find("ul").eq(1).height();
						if(Height1>=Height2){
							$(".container").eq($index).find("ul").eq(1).append(Li);
						}else{
							$(".container").eq($index).find("ul").eq(0).append(Li);
						}
						Li.append(Img);
						Li.append(P);
						
						//$(".container").eq($index).find("ul").eq(0).append("<li><img src='http://101.200.173.217:8080/FootBall"+data.data.tweetlist[i].defaultFilePath+data.data.tweetlist[i].thumbnailname+"' /><p>"+data.data.tweetlist[i].content+"</p></li>")
						Img.load(function(){
							myscroll.refresh();
						})
					}
					return flag=0;
				}
			}
		})
	}
	tweet(0,1)
}

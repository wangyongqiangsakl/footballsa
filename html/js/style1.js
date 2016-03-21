window.onload=function(){
	var myscroll;
	$(".header-box>div").click(function(){
		$index = $(this).index()
		$(this).css({color:"white",background:"#79c1df"}).siblings().css({color:"#b1e4f8",background:"#57b2d7"})
		Iscroll2()
	})
	function Iscroll2(){
		var Height=$(window).height();
		var topHeight=$("header").height();
		var footerHeight=$(".footer").height();
		$("#wrapper").height(Height-topHeight-footerHeight-10)
		myscroll=new iScroll("wrapper",{hScrollbar:false,vScrollbar:false,topOffset:0});
		myscroll.refresh();
	}
	Iscroll2()
	
	$(".attenP img").on("tap",function(){
		//点亮图标
		$(this).toggleClass("attenPimg")
		$(this).attr("src","img/p11.png")
		$(".attenPimg").attr("src","img/p13.png")
		//用户ID
		var userInfo = window.localStorage;
		var userid = userInfo.getItem("loginsuserid")
		var tweetid = $("#tweetid ").text() 
		if($(this).hasClass("attenPimg")){
				$(this).parent().find("span").text(parseInt($(this).parent().find("span").text())+1)
			$.ajax({
				url:"http://localhost:8080/Proxy/FootBall/like/json/add.do",
				data:{"userid ":userid,"tweetid ":13200000000},
				success:function(d){
					var data = JSON.parse(d);
					console.log(data)
				}
			})
		}else{
					$(this).parent().find("span").text(parseInt($(this).parent().find("span").text())-1)
			$.ajax({
				url:"http://localhost:8080/Proxy/FootBall/like/json/cancel.do",
				data:{"userid ":13200000000,"tweetid ":tweetid},
				success:function(d){
					var data = JSON.parse(d);
				}
			})
		}
	})
}

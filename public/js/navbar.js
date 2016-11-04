'use strict';

$(".navigation ul li").hover(function() {
	$(this).css("background-color", "#555555");
},
function(){
	$(this).css("background-color", "#cccccc");
})

$("#backlink").click(function(){
	window.location = "./";
})

$("#profilelink").click(function(){
	window.location = "/profile";
})

$("#matcheslink").click(function(){
	window.location = "/matches";
})

$("#mbtilink").click(function(){
	window.location = "/mbti";
})

$("#chatlink").click(function(){
	window.location = "/chat";
})

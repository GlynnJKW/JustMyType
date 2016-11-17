'use strict';

$(document).ready(function(){
/*
	$("#navbar1").html("
	<ul>
		<li id="matcheslink">
			<span class="fa fa-heart-o" aria-hidden="true"></span>
			<p>MATCHES</p>
		</li>
		<li id="mbtilink">
			<span class="fa fa-bar-chart" aria-hidden="true"></span>
			<p>MBTI</p>
		</li>
		<li id="chatlink">
			<span class="fa fa-inbox" aria-hidden="true"></span>
			<p>CHAT</p>
		</li>
		<li id="profilelink">
			<span class="fa fa-user-circle" aria-hidden="true"></span>
			<p>PROFILE</p>
		</li>
	</ul>
	");


	$("#navbar").html(
		"<ul>" +
			"<li id='settingsbutton'>" +
				"<span class='fa fa-cogs' aria-hidden='true'></span>" +
				"<p>SETTINGS</p>" +
			"</li>" +
			"<div id='nonsettings'>" +
				"<li id='matcheslink'>" +
					"<span class='fa fa-heart-o' aria-hidden='true'></span>" +
					"<p>MATCHES</p>" +
				"</li>" +
				"<li id='mbtilink'>" +
					"<span class='fa fa-bar-chart' aria-hidden='true'></span>" +
					"<p>MBTI</p>" +
				"</li>" +
				"<li id='chatlink'>" +
					"<span class='fa fa-inbox' aria-hidden='true'></span>" +
					"<p>CHAT</p>" +
				"</li>" +
			"</div>" +
			"<div id='settings' style='display:none'>" +
				"<li id='editlink'>" +
					"<span class='fa fa-pencil-square-o' aria-hidden='true'></span>" +
					"<p>EDIT</p>" +
				"</li>" +
				"<li id='preflink'>" +
					"<span class='fa fa-search' aria-hidden='true'></span>" +
					"<p>PREFERENCES</p>" +
				"</li>" +
				"<li id='logoutlink'>" +
					"<span class='fa fa-sign-out' aria-hidden='true'></span>" +
					"<p>LOGOUT</p>" +
				"</li>" +
			"</div>" +
		"</ul>"
	);
*/
});


$(".navigation ul li").hover(function() {
	$(this).css("background-color", "#555555");
},
function(){
	$(this).css("background-color", "#cccccc");
})

$("#backlink").click(function(){
	window.location = "./";
})


$("#settingsbutton").click(function(){
	if($("#nonsettings").is(":visible")){
		$("#nonsettings").fadeOut(400, function(){
			$("#settings").fadeIn(400);
		});
	}
	else{
		$("#settings").fadeOut(400, function(){
			$("#nonsettings").fadeIn(400);
		});
	}

})

$("#logoutlink").click(function(){
	console.log("logged out");
  setCookie("typsy_cur_user", " ", -1);
  window.location = "/";
})

$("#preflink").click(function(){
	window.location = "/profile/preferences";
})

$("#editlink").click(function(){
	window.location = "/profile/editprofile";
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

$("#profilelink").click(function(){
	window.location = "/profile";
})

'use strict';

function login(){
  console.log("login request sent");
  if($("#username").val() != ""){
    $.post("/login", {"username": $("#username").val(), "password": $("#password").val()}, function(result){
      console.log(result);
      //console.log(result.wrong);
      if(result["wrong"] === 0){
        setCookie("typsy_cur_user", $("#username").val(), 1);
        window.location = "/profile";
      }
      else if(result["wrong"] === 2){
        alert("Password is incorrect");
      }
      else if(result["wrong"] === 1){
        alert("Account with username does not exist");
      }
    });
  }
}

function goTo(location){
  window.location = location;
}

function logout(){
  console.log("logged out");
  setCookie("typsy_cur_user", " ", -1);
  window.location = "/";
}

function register(){

}

function sendMessage(){
  var curUser = getCookie("typsy_cur_user");
  var recipient = $("#talkingTo").val();


  var time = new Date().getTime();
  var text = $("#messageData").val();
  if(text !== ""){

    var chatData = {
      "time": time,
      "message": text,
      "from": curUser,
      "to": recipient
    };
    $("#sendText").text("SENDING");
    $("#send").css("background-color", "grey");
    $("#send").attr("onclick","");
    $.post("/sendMessage", chatData, sendMessageCallback);
  }
}

function sendMessageCallback(result){
  //$("#messageData").val("");
  //$("#sendText").text("SEND");
  //$("#send").css("background-color", "darkcyan");
  //$("#send").attr("onclick","sendMessage()");
  window.location.reload(true);
}

function chatClick(username){
  window.location = "/chat/" + username;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    console.log(cname + "=" + cvalue + ";" + expires + ";path=/");
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
  }

$(document).ready(function () {
  console.log("dude.");
  //Taking the form submission and storing it in the JSON file
  $("#profileForm").submit(function(event){
    console.log("profileform triggered");
    event.preventDefault();
    var profileData = {
      'firstname': $('input[name=firstname]').val(),
      'lastname': $('input[name=lastname]').val(),
      'age': $('input[name=age]').val(),
      'location': $('input[name=location]').val(),
      'gender': $('input[name=gender]').val(),
      'mbti': $('select[name=mbti] option:selected').text(),
    };
    console.log(profileData);
    $.post("/changeProfile", profileData, function(result){
      window.location = "/profile";
    });
  });

  $('#preferencesForm').submit(function(event){
    var preferencesData = {
      'gender': $('input[name=gender]').val(),
      'minage': $('input[name=minage]').val(),
      'maxage': $('input[name=maxage]').val(),
      'location': $('input[name=location]').val(),
      'mbti': $('select[name=mbti] option:selected').text(),
    };
    console.log(preferencesData);

    $.post("/changePreferences", preferencesData, function(result){
      window.location = "/profile";
    });
    event.preventDefault();
  });

  $('#registerButton').click(function(){
    $('#registerDiv').slideToggle();
  });

  $('#registerForm').submit(function(event){
    event.preventDefault();
    var registerData = {
      'firstname': $('input[name=firstname]').val(),
      'lastname': $('input[name=lastname]').val(),
      'age': $('input[name=age]').val(),
      'location': $('input[name=location]').val(),
      'gender': $('input[name=gender]').val(),
      'mbti': $('select[name=mbti] option:selected').text(),
      "username": $("#username").val(),
      "password": $("#password").val()
    };

    if(username !== "" && password !== ""){
      $.post("/register", registerData, function(result){
        console.log(result);
        //console.log(result.wrong);
        if(result["wrong"] === 0){
          setCookie("typsy_cur_user", $("#username").val(), 1);
          window.location = "/profile";
        }
        else if(result["wrong"] === 1){
          alert("Account with username already exists");
        }
      });
    }
  });
});

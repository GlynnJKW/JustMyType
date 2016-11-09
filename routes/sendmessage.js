exports.view = function(req, res){
  var users = require("../users.json");
  var chats = require("../chats.json");
  var fs = require('fs');

  var user1 = req.body.from;
  console.log(user1);
  var user2 = req.body.to;
  var time = req.body.time;
  var text = req.body.message;
  console.log(text);

  var part1 = chats["users"][user1];
  var part2 = chats["users"][user2];

  var chatData = 0;
  for(var key in part1){
    console.log(part1[key]["username"]);
    if(part1[key]["username"] == user2){
      chatData = part1[key]["data"];
    }
  }
  if(chatData === 0){
    part1.push({"username": user2, "data": [{"time": time, "message": text, "from": user1}]});
  }
  else{
    chatData.push({"time": time, "message": text, "from": user1});
  }

  chatData = 0;
  for(var key in part2){
    console.log(part2[key]["username"]);
    if(part2[key]["username"] == user1){
      chatData = part2[key]["data"];
    }
  }
  if(chatData === 0){
    part2.push({"username": user1, "data": [{"time": time, "message": text, "from": user1}]});
  }
  else{
    chatData.push({"time": time, "message": text, "from": user1});
  }

  fs.writeFile("../chats.json", JSON.stringify(chats), function (err) {
      if (err) next(err);
      else res.send(200);
    });
  res.send("POST request for message");
};

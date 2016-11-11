

exports.view = function(req, res){
  var fs = require('fs');
  //var users = require("../users.json");
  //var chats = require("../chats.json");
  var users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  var chats = JSON.parse(fs.readFileSync('./chats.json', 'utf8'));

  var curUser = req.cookies.typsy_cur_user;
  console.log(curUser);
  //var chatPerson = req.params.name;

  var chatPeople = chats["users"][curUser];
  console.log(chatPeople);

  res.render('chat', {"people": chatPeople});
};

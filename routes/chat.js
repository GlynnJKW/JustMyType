

exports.view = function(req, res){
  var users = require("../users.json");
  var chats = require("../chats.json");

  var curUser = req.cookies.typsy_cur_user;
  console.log(curUser);
  //var chatPerson = req.params.name;

  var chatPeople = chats["users"][curUser];
  console.log(chatPeople);

  res.render('chat', {"people": chatPeople});
};

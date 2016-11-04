
/*
 * GET home page.
 */

exports.view = function(req, res){
  var users = require("../users.json");
  var chats = require("../chats.json");

  var curUser = req.cookies.typsy_cur_user;
  var chatPerson = req.params.name;

  var chatPeople = chats.curUser;

  res.render('chat', {"people": chatData});
};

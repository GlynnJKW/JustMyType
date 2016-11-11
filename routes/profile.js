exports.view = function(req, res){
  var fs = require('fs');

  //var chats = JSON.parse(fs.readFileSync('./chats.json', 'utf8'));
  console.log("parsing users");
  var file = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  var users = file["users"];
  var user = req.cookies.typsy_cur_user;

  var found = 0;
  for(var key in users){
    //console.log(part1[key]["username"]);
    if(users[key]["username"] == user){
      found = users[key];
    }
  }
  var img = "http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-hi.png";
  var name = "Profile";
  if(found !== 0){
    img = found["image"];
    name = found["name"];
  }

  res.render('profile', {"profileImage": img, "name": name});
};

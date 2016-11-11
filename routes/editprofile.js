exports.view=function(req,res){
    res.render('editprofile');
};

exports.changeProfile = function(req,res){
  var fs = require('fs');

  //var chats = JSON.parse(fs.readFileSync('./chats.json', 'utf8'));
  console.log("parsing users");
  var file = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  var users = file["users"];
  var user = req.cookies.typsy_cur_user;

  console.log("searching users");
  var found = 0;
  for(var key in users){
    //console.log(part1[key]["username"]);
    if(users[key]["username"] == user){
      found = users[key];
    }
  }
  if(found !== 0){
    console.log("changing user data");
    //found = found["preferences"];
    found["name"] = req.body.firstname + " " + req.body.lastname;
    found["location"] = req.body.location;
    found["age"] = req.body.age;
    found["mbti"] = req.body.mbti;
    found["gender"] = req.body.gender;
    console.log("writing file");
    fs.writeFile("./users.json", JSON.stringify(file, null, '  '), function (err) {
        console.log("wrote");
        if (err) next(err);
        else res.send(200);
      });
    console.log("done");
  }
  else{
    console.log("user not found");
  }
};

exports.changePreferences = function(req,res){
  var fs = require('fs');

  //var chats = JSON.parse(fs.readFileSync('./chats.json', 'utf8'));
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
  if(found !== 0){
    found = found["preferences"]
    //found = found["preferences"];
    found["gender"] = req.body.gender;
    found["location"] = req.body.location;
    found["minage"] = req.body.minage;
    found["maxage"] = req.body.maxage;
    found["mbti"] = req.body.mbti;
    fs.writeFile("./users.json", JSON.stringify(file, null, '  '), function (err) {
        console.log("wrote");
        if (err) next(err);
        else res.send(200);
      });
  }
};

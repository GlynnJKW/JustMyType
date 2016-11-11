exports.login	=	function(req,	res)	{
		//	controller	code	goes	here
    //var	name	=	req.params.name;
    //res.render('login');

    var fs = require('fs');

    //var chats = JSON.parse(fs.readFileSync('./chats.json', 'utf8'));
    var users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    users = users["users"];
    console.log(users);

    var user = req.body.username;
    var pass = req.body.password;

    var found = 0;
    for(var key in users){
      //console.log(part1[key]["username"]);
      if(users[key]["username"] == user){
        found = users[key];
      }
    }
    var wrong = 0;
    if(found === 0){
      wrong = 1;
    }
    else if(found["password"] != pass){
      wrong = 2;
    }
    //res.locals.wrong = wrong;
    //res.locals.user = found;
    res.json({"wrong": wrong, "user": found});
};

exports.register = function(req, res){
  var fs = require('fs');

  //var chats = JSON.parse(fs.readFileSync('./chats.json', 'utf8'));
  var file = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  var users = file["users"];
  console.log(users);

  var user = req.body.username;
  var pass = req.body.password;
  var name = req.body.firstname + " " + req.body.lastname;
  var location = req.body.location;
  var age = req.body.age;
  var mbti = req.body.mbti;
  var gender = req.body.gender;

  var sex = "boy"
  if(gender === "Female"){
    sex = "girl";
  }

  var found = 0;
  for(var key in users){
    //console.log(part1[key]["username"]);
    if(users[key]["username"] == user){
      found = users[key];
    }
  }
  if(found === 0){

    users.push({
        "name": name,
        "username": user,
        "password": pass,
        "gender": gender,
        "age": age,
        "mbti": mbti,
        "location": location,
        "image": "/images/"+ sex + (Math.floor(Math.random() * 5) + 1) + ".jpg",
        "preferences": {
          "gender": "Male",
          "minage": "19",
          "maxage": "26",
          "mbti": "ESFP",
          "location": location
        }
      });
      fs.writeFile("./users.json", JSON.stringify(file, null, '  '), function (err) {
          console.log("wrote");
          if (err) next(err);
          else res.send(200);
        });
      res.json({"wrong": 0});
    }
    else{
      res.json({"wrong": 1});
    }
};

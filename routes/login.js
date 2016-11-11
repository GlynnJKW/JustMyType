exports.login	=	function(req,	res)	{
		//	controller	code	goes	here
    //var	name	=	req.params.name;
    //res.render('login');

    var fs = require('fs');

    //var chats = JSON.parse(fs.readFileSync('./chats.json', 'utf8'));
    var users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
    users = users["users"];
    //console.log(users);

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

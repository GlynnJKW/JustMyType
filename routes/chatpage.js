exports.view = function(req, res){
  var users = require("../users.json");
  var chats = require("../chats.json");

  var curUser = req.cookies.typsy_cur_user;
  var chatPerson = req.params.name;

  var chatPeople = chats["users"][curUser];

  var chatData = 0;
  for(var key in chatPeople){
    console.log(chatPeople[key]["username"]);
    if(chatPeople[key]["username"] == chatPerson){
      chatData = chatPeople[key]["data"];
    }
  }

  console.log(chatData);



  sortJsonArrayByProperty(chatData, "time");
  for(var key in chatData){
    var time = parseInt(chatData[key]["time"]);
    var date = new Date(time).toLocaleString();
    chatData[key]["date"] = date;
  }

  res.render('chatpage', {"messages": chatData, "me": curUser, "them": chatPerson});
};

function sortJsonArrayByProperty(objArray, prop, direction){
    if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
    var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

    if (objArray && objArray.constructor===Array){
        var propPath = (prop.constructor===Array) ? prop : prop.split(".");
        objArray.sort(function(a,b){
            for (var p in propPath){
                if (a[propPath[p]] && b[propPath[p]]){
                    a = a[propPath[p]];
                    b = b[propPath[p]];
                }
            }
            // convert numeric strings to integers
            a = a.match(/^\d+$/) ? +a : a;
            b = b.match(/^\d+$/) ? +b : b;
            return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
        });
    }
    //console.log(objArray);
}


/*
 * GET home page.
 */



exports.view = function(req, res){
  var users = require("../users.json");
  console.log(users);
  var matches = JSON.parse(JSON.stringify(users)).users;
  //var curUser = getCookie("typsy_cur_user");
  var curUser = req.cookies.typsy_cur_user;
  console.log(curUser);
  var user = getUserByName(matches, curUser);
  removeProperties(matches, "username", curUser);
  console.log(user);
  if(user !== 0){
    removeNonProperties(matches, "mbti", user["search"]);
  }
  sortJsonArrayByProperty(matches, "age", -1);
  console.log(matches);
  res.render('matches', {"users": matches});
};

function getUserByName(objArray, user){
  if (arguments.length<2) throw new Error("getUserByName requires 2 arguments");
  for(var key in objArray){
    if(objArray[key]["username"] === user){
      console.log(key)
      return objArray[key];
    }
  }
  console.log("not found");
  return 0;
}

function removeNonProperties(objArray, prop, value){
  if (arguments.length<3) throw new Error("removeNonProperties requires 3 arguments");
  var done = false;
  while(!done){
    done = true;
    for(var key in objArray){
      //console.log(key + ", " + objArray[key] + ", " + objArray[key][prop]);
      if(objArray[key][prop] !== value){
        //console.log("deleted");
        objArray.splice(key, 1);
        done = false;
        break;
      }
    }
  }
  //console.log(objArray);
}

function removeProperties(objArray, prop, value){
  if (arguments.length<3) throw new Error("removeNonProperties requires 2 arguments");
  for(var key in objArray){
    //console.log(key + ", " + objArray[key] + ", " + objArray[key][prop]);
    if(objArray[key][prop] === value){
      //console.log("deleted");
      objArray.splice(key, 1);
    }
  }
  //console.log(objArray);
}

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
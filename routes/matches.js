
/*
 * GET home page.
 */



exports.view = function(req, res){
  var fs = require('fs');
  //var users = require("../users.json");
  var users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

  //console.log(users);
  var matches = JSON.parse(JSON.stringify(users)).users;
  //var curUser = getCookie("typsy_cur_user");
  var curUser = req.cookies.typsy_cur_user;
  console.log(curUser);
  var user = getUserByName(matches, curUser);
  removeProperties(matches, "username", curUser);
  console.log(user);
  if(user !== 0){
    console.log(user["preferences"]["mbti"]);
    removeNonProperties(matches, "mbti", user["preferences"]["mbti"]);
    removeNonProperties(matches, "location", user["preferences"]["location"]);
    removeNonProperties(matches, "gender", user["preferences"]["gender"]);
    removeCompareProperties(matches, "age", user["preferences"]["minage"], -1);
    removeCompareProperties(matches, "age", user["preferences"]["maxage"], 1);
  }
  sortJsonArrayByProperty(matches, "name", 1);
  console.log(matches);
  res.render('matches', {"users": matches, "prefs": user["preferences"]});
};

function getUserByName(objArray, user){
  if (arguments.length<2) throw new Error("getUserByName requires 2 arguments");
  for(var key in objArray){
    if(objArray[key]["username"] === user){
      //console.log(key)
      return objArray[key];
    }
  }
  //console.log("not found");
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
        console.log("deleted" + objArray[key]);
        objArray.splice(key, 1);
        done = false;
        break;
      }
    }
  }
  //console.log(objArray);
}

function removeCompareProperties(objArray, prop, value, direction){
  if (arguments.length<3) throw new Error("removeNonProperties requires 3 arguments");
  var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending
  var done = false;
  while(!done){
    done = true;
    for(var key in objArray){
      //console.log(key + ", " + objArray[key] + ", " + objArray[key][prop]);
      if(direct == 1){
        if(objArray[key][prop] < value){
          //console.log("deleted");
          console.log("deleted" + objArray[key]);
          objArray.splice(key, 1);
          done = false;
          break;
        }
      }
      else if(direct == -1){
        if(objArray[key][prop] > value){
          //console.log("deleted");
          console.log("deleted" + objArray[key]);
          objArray.splice(key, 1);
          done = false;
          break;
        }
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

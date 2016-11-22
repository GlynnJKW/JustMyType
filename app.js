
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var hbs = handlebars.create({
  helpers: {
    isNth: function(index_count, mod, block){
      if(parseInt(index_count)%(mod)=== 0){
    		return block.fn(this);
      }
    }
  }
});

var bodyParser = require('body-parser');


var index = require('./routes/index');
var	project	=	require('./routes/project');
var login = require('./routes/login');
var profile = require('./routes/profile');
var mbti = require('./routes/mbti');
var istj = require('./routes/istj');
var mbtiname = require('./routes/mbtiname');
var profileOption = require('./routes/profileOption');
var chat = require('./routes/chat');
var matches = require('./routes/matches');
var preferences = require('./routes/preferences');
var editprofile = require('./routes/editprofile');
var personalitytest = require('./routes/personalitytest');
var chatpage = require('./routes/chatpage');
var sendmessage = require('./routes/sendmessage');
/*The 16 personalities
var istj = require('./routes/istj');
var isfj = require('./routes/isfj');
var infj = require('./routes/infj');
var intj = require('./routes/intj');
var istp = require('./routes/istp');
var isfp = require('./routes/isfp');
var infp = require('./routes/intp');
var intp = require('./routes/intp');
var estp = require('./routes/estp');
var esfp = require('./routes/enfp');
var enfp = require('./routes/enfp');
var entp = require('./routes/entp');
var estj = require('./routes/estj');
var esfj = require('./routes/esfj');
var enfj = require('./routes/enfj');
var entj = require('./routes/entj');*/
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
//app.get('/project/:name', project.viewProject)
app.post('/login', login.login);
app.get('/profile', profile.view);
app.get('/mbti', mbti.view);
app.get('/mbti/:name', mbtiname.view);
//app.get('/profile/:name', profileOption.view);
app.get('/profile/preferences', preferences.view);
app.get('/profile/edit', editprofile.view);
app.get('/chat', chat.view);
app.get('/matches', matches.view);
app.get('/matches2', matches.view2);
app.get('/profile/personalitytest', personalitytest.view);
app.get('/chat/:name', chatpage.view);
app.post('/sendmessage', sendmessage.view);
app.post('/changeProfile', editprofile.changeProfile);
app.post('/changePreferences', editprofile.changePreferences);
app.post('/register', login.register);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

exports.view	=	function(req,	res)	{
		//	controller	code	goes	here
    var	name	=	req.params.name;
    var mbtidata = require('../mbtidata.json');
    res.render('mbtiname', mbtidata[name]);
};
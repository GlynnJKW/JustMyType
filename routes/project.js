exports.viewProject	=	function(req,	res)	{
		//	controller	code	goes	here
    var	name	=	req.params.name;
    res.render('project', {
      'projectName': name
    });
};

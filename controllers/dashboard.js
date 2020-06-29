exports.dashboard= (req, res, next) => {
	res.render("./dashboard", {
		title: 'DSL-Comet::Dashboard'
	});
}

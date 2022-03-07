module.exports = {
	signupPost: require('./users').signup,
	signoutDelete: require('./users').signout,
	loginPost: require('./users').login,
	passwordPatch: require('./users').passwordEdit,
	nicknamePatch: require('./users').nicknameEdit,
	picturePatch: require('./users').pictureEdit,
	boardWritingPost: require('./board').writing,
	boardDetailGet: require('./board').detail,
	boardEditPatch: require('./board').edit,
	boardDeleteDelete: require('./board').delete,
	commentWritingPost: require('./comment').writing,
	commentDetailGet: require('./comment').detail,
	commentEditPatch: require('./comment').edit,
	commentDeleteDelete: require('./comment').delete
};
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name : {
		type  :String,
		maxlength : 50
	},
	email:{
		type : String,
		trim : true, //사용자 입력값에서 공백을 알아서 없애줌
		unique  : 1
	},
	password: {
		type : String,
		minlength : 5
	},
	lastname: {
		type : String,
		maxlength : 50
	},
	role: {
		type: Number, //ex) 1이면 관리자 2면 유저
		default : 0
	},
	image: String,
	token:{
		type: String
	},
	tokenExp: {
		type: Number
	}
	
})


const User = mongoose.model('User', userSchema)

module.exports = { User } // 모듈을 다른곳에서 사용할수 있게.
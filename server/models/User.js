const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
	name : {
		type  : String,
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
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
	
})


userSchema.pre('save', function( next ){
	var user = this;
	
	if(user.isModified('password')){
		//비밀번호 암호화.
		bcrypt.genSalt(saltRounds,function(err, salt){
		if(err) return next(err)
		
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err)
			user.password = hash
			next()
			})
		})
	} else {
		next()
	}

})

userSchema.methods.comparePassword = function(plainPassword, cb) {
	//plainPassword 1234567     암호화된 비밀번호 $2b$10$PI3m31hrhF1Papcuj/zS/./zIFDZLqk6nBB236DQAO8ctmrwzw0D6
	bcrypt.compare(plainPassword, this.password, function(err, isMatch){
		if(err) return cb(err)
		cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function(cb){
	
	var user = this;
	//jsonwebtoken을 이용해서 token을 생성하기
	
	
	
	
	var token = jwt.sign(user._id.toHexString(), 'secretToken')
	// user._id + 'secretToken' = token
	// ->
	// 'secretToekn' -> user._id
	
	user.token = token
	user.save(function(err, user){
		if(err) return cb(err)
		cb(null, user)
	})
}


userSchema.statics.findByToken = function(token, cb) {
	var user = this;
	
	// user._id + '' = token
	//토큰을 decode 한다.
	jwt.verify(token, 'secretToken', function(err, decoded) {
		//유저 아이디를 이용해서 유저를 찾은 다음에
		//클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
		
		
		user.findOne({"_id": decoded, "token": token}, function(err, user){
			if(err) return cb(err);
			cb(null, user)
		})
	})
	
	
	
	
}

const User = mongoose.model('User', userSchema)

module.exports = { User } // 모듈을 다른곳에서 사용할 수 있게.
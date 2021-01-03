const express = require('express')
const app = express()
const port = 5000

const { User } = require("./models/Users");
const bodyParser = require('body-parser');

const config = require('./config/key')

//application/x--www-from-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('config.mongoURI', {
	useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MongoDB Connect!!!'))
.catch(err => console.log(err))


app.get('/', (req, res) => {res.send('서버 상태 : 양호  안녕하세요 저는 Lee 입니다.')})

app.post('/register', (req, res) => {
	
	//회원가입 할 때 필요한 정보들을 client에서 가져오면
	//그것들을 datebase에 넣어준다.
	
	const user = new User(req.body)
	
	user.save((err, userInfo) => {
		if(err) return res.json({ success: false, err})
		return res.status(200).json({
			success: true
		})
	})
	
	
})



app.listen(port, () => {
  console.log(`Example app listening at https://nodereact-lee.run.goorm.io in port: ${port}`)
})
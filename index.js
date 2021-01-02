const express = require('express')
const app = express()
const port = 5000




const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://unib35:whdalsdl0178@nodereact.sddit.mongodb.net/<dbname>?retryWrites=true&w=majority', {
	useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MongoDB Connect!!!'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('서버 상태 : 양호')
})

app.listen(port, () => {
  console.log(`Example app listening at https://nodereact-lee.run.goorm.io in port: ${port}`)
})
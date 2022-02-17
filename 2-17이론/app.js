const express = require("express")
const path = require('path')
const app = express()


const indexRoute = require('./routes/index.js') // 라우터로 별도의 폴더로 만들자 -> 관리를 편하기 위해

app.use('/', indexRoute)
// app.get('/', (req, res) => {
//     // res.send(`<h1>나의 첫 express<h1>`)
//     res.sendFile(path.join(__dirname, '/index.html'))
// })
// req : request(요청), 사용자의 브라우저 정보, 질문(쿼리), 로그인정보
// response(응답) : 사이트 내용 html
app.get('/webtoon', (req, res) => {
    res.send(`<h2>현재 준비중입니다. 조금만 기다려주세요.<h2>`)
})

app.get('/profile', (req, res) => {
    res.send(`<h2>별명: 멋쟁이, 취미: 인스타그램</h2>`)
})



app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message)
})

app.listen(3000, () => {
    console.log('3000번 포트에서 웹서버를 실행중입니다...')
})


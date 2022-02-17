const path = require('path')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    // res.send(`서비스 첫 페이지 입니다.`)
    res.sendFile(path.join(__dirname, '../index.html'))
})

module.exports = router
import express from 'express'
import cors from 'cors'
import { nextTick } from 'process' //1을 수행한 후에 2를 수행하게
import { randomBytes, sign } from 'crypto'
import * as fs from 'fs'
import { readFileSync } from 'fs'
//express는 사용자가 업로드한 파일을 받아서 저장하는 기본 기능을 제공하지 않는다.
//따라서 모듈을 설치해서 (ex. multer) 사용자가 전송한 파일을 처리하는 작업을 해야한다.
import 'multer'
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express() //app은 express의 인스턴스
const PORT = 3714

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    const data = fs.readFileSync('data/todo.json').toString('utf-8')
    res.send(data)
})

app.post('/create', upload.single('avatar'), (req, res) => {
    const data = JSON.parse(fs.readFileSync('data/todo.json').toString('utf-8'))
    console.log('data : ', data)
    data.sort((a: any, b: any) => {
        //인덱스에 대한 정렬
        return a.index - b.index
    })
    console.log('sorted data : ', data)
    req.body.index = data[data.length - 1].index + 1 // length가 10이면 index는 9일테니까 index 10으로 하면 없는거라고 에러난다.
    data.push(req.body)
    fs.writeFileSync('data/todo.json', JSON.stringify(data))
    res.send({ success: true, index: req.body.index }) //이전 index보다 하나 더한 index
})

app.post('/update', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data/todo.json').toString('utf-8'))
    const content = req.body //저번 시간에 배운 내용. postman에서 body에 넣은 내용물을 content 변수에 넣는다.
    const index = content.index //content에서 인덱스 키로 값 넣기
    const doit = content.doit
    console.log(index)
    //이미 있는 인덱스를 입력 받으면 그 내용은 덮어쓰기??? 수정하기 된다.
    const target = data.find((o: any) => o.index == index) //콘솔 찍어보기
    target.doit = doit

    fs.writeFileSync('data/todo.json', JSON.stringify(data))
    res.send({ success: true, index: req.body.index }) //이전 index보다 하나 더한 index
})

app.delete('/delete', (req, res) => {
    let success = false
    let errorMsg
    const data = JSON.parse(fs.readFileSync('data/todo.json').toString('utf-8'))
    const index = req.body.index //삭세할 인덱스 입력 받기
    console.log(index)
    //입력된 인덱스랑 기존 json에서 일치하는 인덱스 찾기
    const target = data.find((o: any) => o.index == index)
    if (target) {
        data.splice(data.indexOf(target), 1) //indexOf() 메서드는 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환합니다.
        success = true
    } else {
        errorMsg = 'Fail'
    }
    fs.writeFileSync('data/todo.json', JSON.stringify(data))
    res.send({ success, errorMsg })
})

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
)

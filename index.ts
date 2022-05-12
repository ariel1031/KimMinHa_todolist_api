import express from 'express'
import cors from 'cors'
import { randomBytes, sign } from 'crypto'
import { nextTick } from 'process'

const app = express() //app은 express의 인스턴스이다.
const PORT = 3714

// app.use는 미들웨어를 쓰는 부분
// express.static은 정적 파일들이 있는
app.use(express.static('public')) //정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static
app.use(express.urlencoded({ extended: true })) //폼데이터일 경우 가공해준다. .urlencoded()은 x-www-form-urlencoded형태의 데이터를 해석해줌
app.use(express.json()) //json일 떄 가공
app.use(cors())

//라우팅은 애플리케이션 엔드 포인트(URI)의 정의, 그리고 URI가 클라이언트 요청에 응답하는 방식을 말합
app.get('/', (req, res) => {
    res.send('GET request to the homepage') //res.send() 다양한 유형의 응답을 전송한다.
})

app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})

app.get('/about', (req, res) => {
    res.send('about')
})

app.get('/ran', (req, res) => {
    res.send('출력될 문자열')
})

app.get('/', (req, res, next) => {
    res.json({
        data: true,
    })
})

app.get('/test', (req, res) => {
    res.json({
        data: 'test true',
    })
})
//post 메서드,  get메서드 이런거 했잖아

app.post('/signup', (req, res) => {
    res.json({
        data: '가입',
    })
})

app.post('/logout/:a', (req, res) => {
    res.json({
        data: '로그아웃',
    })
})

app.post('/login/:fruit', (req, res) => {
    console.log(req.body)
    res.json({
        pathParameter: req.params,
        bodyParameter: req.body,
        queryParameter: req.query,
    })
})

app.post('/ttemp', (req, res) => {
    res.json({
        data: '되나?',
    })
})

app.post('/plus', (req, res) => {
    const answer = Number(req.query.num1) + Number(req.query.num2)
    res.json({
        answer,
    })
})

app.post('/minus/:num1/:num2', (req, res) => {
    const answer = Number(req.params.num1) - Number(req.params.num2)
    res.json({
        answer,
    })
})

app.post('/multiply', (req, res) => {
    const answer = Number(req.body.num1) - Number(req.body.num2)
    res.json({
        answer,
    })
})

app.post('/divide/:num1/:num2', (req, res) => {
    const answer = Number(req.params.num1) / Number(req.params.num2)
    res.json({
        answer,
    })
})

app.get('/test2', (req, res) => {
    res.json({
        data: true,
    })
})
app.use((err: any, req: any, res: any, next: any) => {
    res.json({
        data: false,
    })
})

// app.get('/cal:plus', (req, res) => {
//     res.json({
//         data:    '더하기',
//     })
// })

app.listen(PORT, () =>
    console.log('Example app listening at http://localhost:3714')
)

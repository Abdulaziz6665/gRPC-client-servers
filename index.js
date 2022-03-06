const express =require('express')
const {renderFile} = require('ejs')

const authorClient = require('./clients/author')
const bookClient = require('./clients/book')

const app = express()

app.use(express.json())
app.set('view engine', 'html')
app.engine('html', renderFile)

app.use(express.static('view'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/author', (req, res) => {
  authorClient.Get(null, (err, data) => {
    if (err) throw new Error
    res.json(data)
  })
})

app.get('/book', (req, res) => {
  bookClient.GetOne({id: '1'}, (err, data) => {
    if (err) throw new Error
    res.json(data)
  })
})

app.get('/all', (req, res) => {
  authorClient.Get(null, (err, data) => {
    if (err) throw new Error
    console.log(data)
  })
})


app.listen(3000, () => console.log(3000))
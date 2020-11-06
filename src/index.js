import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import { port, url } from './utils/config'
// routes
import apiRouter from './routes'

console.log(port)
const app = express()

mongoose.connect(url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })

const db = mongoose.connection
db.on('error', console.log)
db.once('open', () => console.log('DB connection successful'))

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Anonymous Api is live')
})
app.use('/api/v1', apiRouter)

app.get('/anon', (req, res) => {
  res.send('we are live')
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
const port = 3030

app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Anonymous Api is live')
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

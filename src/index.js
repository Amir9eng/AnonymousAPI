import express from 'express'
const app = express()
const port = 3030

app.get('/', (req, res) => {
  res.send('Anonymous Api')
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

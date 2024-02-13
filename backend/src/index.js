import express from 'express'

const PORT = 5005

const app = express()

app.use('/init', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
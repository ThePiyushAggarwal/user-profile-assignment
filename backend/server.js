const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000

app.get('/', (_, response) => {
  response.json({ message: 'Welcome to the User Profile API' })
})

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))

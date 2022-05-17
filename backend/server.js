const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler')
const path = require('path')

// Connect to the database
connectDB()

// Logging using Morgan Package
app.use(morgan('tiny'))

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// API FOR USERS
app.use('/api/users', require('./routes/userRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  // API HOME
  app.get('/', (_, response) => {
    response.json({ message: 'Welcome to the User Profile API' })
  })
}

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!`))

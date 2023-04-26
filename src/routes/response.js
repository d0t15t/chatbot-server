const express = require("express")
const app = express()

// Set up body parsing middleware
app.use(express.json())

// Define the response route
app.post("/response", (req, res) => {
  const message = req.body.message

  // Here you can generate a response based on the user's message
  const response = `Thanks for your message: ${message}`

  // Send the response back to the client
  res.json({ response })
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

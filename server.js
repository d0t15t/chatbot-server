const express = require("express")
const cors = require("cors")
const openai = require("openai")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
)
const { Configuration, OpenAIApi } = openai
// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "build")))
// Use body-parser middleware to parse incoming requests as JSON
app.use(bodyParser.json())
// Define the route for the response endpoint
app.post("/response", async (req, res) => {
  const { systemMessage, conversation } = req.body
  const configuration = new Configuration({
    // @todo - this must move to .env
    // apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
    apiKey: "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",
  })
  const openai = new OpenAIApi(configuration)
  const chatModel = "gpt-3.5-turbo"
  const messages = [systemMessage, ...conversation]
  const response = await openai.createChatCompletion({
    model: chatModel,
    messages,
  })
  const { status, data } = response
  const { choices, usage, created } = data
  const { message } = choices[choices.length - 1]

  res.json({ status, message, usage, created })
})

// Define the route for the logger endpoint
app.post("/logger", (req, res) => {
  const message = req.body.message

  // Here you can log the message to a database or file
  console.log(`New message received: ${message}`)

  // Send a success response back to the client
  res.json({ success: true })
})

// Define the route for your chatbot
app.post("/chatbot", (req, res) => {
  // Handle your chatbot logic here
  res.json({ response: "Your chatbot response here" })
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

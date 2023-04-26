import { useState, useEffect, useCallback } from "preact/hooks"
import { Configuration, OpenAIApi, ChatCompletion } from "openai"
import Spinner from "./Spinner/Spinner"
import NameForm from "./NameForm/NameForm"
import cls from "classnames"
import instructions from "../assets/instructions.md"
import "../style/chatbot.css"
import { config } from "../manifest.json"

// @todo - these must be loaded from .env
let dev = false
let serverUrl = "http://0.0.0.0:3000"

const App = () => {
  const systemMessage = { role: "system", content: instructions }
  const startMessage = {
    role: "assistant",
    content: config.cb.greeting,
  }

  // const [userName, setUserName] = useState()
  const [conversation, setConversation] = useState([startMessage])
  const [status, setStatus] = useState(200) // done, waiting, error

  // useEffect(() => {
  //   const message = { role: "user", content: `Hi, my name is ${userName}` }
  //   const newConversation = userName ? [...conversation, message] : conversation
  //   setConversation(newConversation)
  //   getResponse(newConversation)
  // }, [userName])

  async function getResponse(systemMessage, conversation) {
    try {
      setStatus("waiting")
      fetch(`${serverUrl}/response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemMessage, conversation }),
      })
        .then((res) => res.json())
        .then((data) => {
          //@todo: log usage & created.
          const { status, message, usage, created } = data
          setStatus(status)
          const newConversation = [...conversation, message]
          console.log(newConversation)
          setConversation(newConversation)
        })
        .catch((err) => console.error(err))
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userInput = event.target.userInput.value
    const message = { role: "user", content: userInput }
    const newConversation = [...conversation, message]
    setConversation(newConversation)
    getResponse(systemMessage, newConversation)
    event.target.userInput.value = ""
  }

  return (
    <div id="app">
      <main>
        <p>{config.cb.intro}</p>
        {/* <NameForm userName={userName} setUserName={setUserName} /> */}
        <ul id="chatHistory">
          <li className={cls("waiting")}>
            <Spinner status={status} />
          </li>
          {/* {conversation.map((message, index) => ( */}
          {[...conversation].reverse().map((message, index) => (
            <li key={index} className={cls(message.role, "userMsg")}>
              {dev ? <b>{conversation.length - index} </b> : null}
              {message.content}
            </li>
          ))}
        </ul>

        <form id="chatForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="userInput"
            className="textInput"
            placeholder="Frag BotSaarow"
          />

          <button type="submit" className="sendButton">
            Senden
          </button>
        </form>
      </main>
    </div>
  )
}

export default App

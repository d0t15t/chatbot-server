import style from "./NameForm.css"

const Greeting = ({ userName }) => {
  return <span>{`Hi ${userName}!`}</span>
}

const NameForm = ({ userName, setUserName }) => {
  console.log("🚀 ~ file: NameForm.jsx:10 ~ NameForm ~ userName:", userName)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userInput = event.target.userName.value
    setUserName(userInput)
  }

  return (
    <form id="nameForm" class={style.nameForm} onSubmit={handleSubmit}>
      {userName ? (
        <Greeting userName={userName} />
      ) : (
        <input
          type="text"
          id="userName"
          className="textInput"
          placeholder="Ihr Name"
        />
      )}
      <button type="submit" className="sendButton">
        {userName ? "✖" : "✔"}
      </button>
    </form>
  )
}

export default NameForm

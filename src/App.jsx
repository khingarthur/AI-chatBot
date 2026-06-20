import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import { ChatInput } from '../components/ChatInput';
import { ChatMessage } from '../components/ChatMessage';
import myFileContent from './assets/file.txt?raw';

const chatMessages = [
  
  {
    message: "Hello! How can I help you",
    sender: "robot",
    id: 2
  },
  {
    message: "Can you get me todays date ?",     
    sender: "user",
    id: 3
  },
  {
    message: "Today is june 20",
    sender: "robot",
    id: 4
  },
  {
    message: "How about flip a coin",
    sender: "user",
    id: 5
  },
  {
    message: "sure, you got tails",
    sender: "robot",
    id: 6
  }
] 

function App() {
  
  const [messages, setMessage] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState (false);


  const response = async () =>{
    const allLines = myFileContent.split("\n");
    const randomNumber = Math.floor(Math.random() * 4);
    console.log(allLines[randomNumber]);
    return allLines[randomNumber];
  }  

  async function handleClick(event){

    if (input === "") return

    setDisabled(true)

    const UserMessage = {
      message: input,
      sender: "user",
      id: crypto.randomUUID()
    }

    const newChatMessages = [
      ...messages,
      UserMessage,
      
    ]

    setMessage(newChatMessages);
    console.log(newChatMessages);
    setInput("")

    const botResponse = response();
    const botMessage = {
      message: botResponse,
      sender: "robot",
      id: crypto.randomUUID()
    }

    const newerChatMessages = [
      ...newChatMessages,
      botMessage
    ]

    setTimeout(() => {
      
      setMessage(newerChatMessages);
      setDisabled(false)
    }, 5000);

    console.log(newChatMessages);

  }



  function handleKeyDown (event){
    if (event.key == "Enter") handleClick();
    if (event.key == "Escape") setInput("");
  }

  function saveInputText(event){
    setInput(event.target.value);
  }
  
  return (
    <div className="container mt-4" >
      <div className="row"> 
        <div className="col-md-8 mx-auto">

          {
            messages.map((chatMessage) =>(
              <div key={chatMessage.id}>
                <br />
                <ChatMessage {...chatMessage} />
              </div>
            ))
          }

          <br />

        <ChatInput 
          onClick={handleClick} 
          onChange={saveInputText}
          onKeyDown={handleKeyDown}
          value={disabled ? "Please wait, response loading..." : input }
          disabled={disabled}
        />


        </div>
      </div>
      
    </div>
    
  )

  
}

export default App

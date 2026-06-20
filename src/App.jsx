import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { ChatInput } from '../components/ChatInput'
import { ChatMessage } from '../components/ChatMessage'

const chatMessages = [
  {
    message: "Hello Chatbot",
    sender: "user",
    id: 1
  },
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
    message: "Today is september 27",
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

  async function handleClick(){

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

    const response = await fetch("");
    const data = await response.json();
    const res = data.message;
    const robotMessage = {
      message: res,
      sender: "robot",
      id: crypto.randomUUID()
    }
    

    setMessage([
      ...newChatMessages,
      robotMessage
    ]);

    ;
  }

  function saveInputText(event){
    setInput(event.target.value);
  }
  
  return (
    <>
      <ChatInput onClick={handleClick} onChange={saveInputText} value={input}/>

      {
        messages.map((chatMessage) =>(
          <div key={chatMessage.id}>
            <br />
            <ChatMessage {...chatMessage} />
          </div>
        ))
      }
    </>
    
  )

  
}

export default App

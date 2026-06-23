import { useState, useEffect, useRef, useEffectEvent } from "react";

import { ChatInput } from "../components/ChatInput";
import { ChatMessage } from "../components/ChatMessage";
import { Header } from "../components/Header";

const chatMessages = [
  {
    message:
      "Hello! I'm Kobby, your AI assistant. \n You can press 'Enter' to send your message and 'Escape' to clear your input. \n How can I help you today?",
    sender: "robot",
    id: 2,
  },
];

function App() {
  // contains Chat messages stored in the array
  const [messages, setMessage] = useState(chatMessages);
  // Contains texts in the input box
  const [input, setInput] = useState("");
  // Contains boolean for enabling and dissabling input field
  const [disabled, setDisabled] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  const chatmessageRef = useRef(null);

  useEffect(() => {
    chatmessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleClick(event) {
    // validate input
    if (!input || input.trim() === "") return;

    // Dissable input field
    setDisabled(true);
    setIsTyping(true);
    setIsloading(true);

    // prepare users message object
    const UserMessage = {
      message: input,
      sender: "user",
      id: crypto.randomUUID(),
    };

    const newChatMessages = [...messages, UserMessage];
    // Update UI with users message and clear input box
    setMessage(newChatMessages);
    setInput("");

    let botMessage;

    // make api request to the backend
    try {
      const response = await fetch(
        "https://ai-chatbot-uetw.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-frontend-secret": import.meta.env.FRONTEND_SECRET
          },
          body: JSON.stringify({ message: input }),
        },
      );

      const data = await response.json();
      const { error } = data;

      if (error) {
        botMessage = {
          message: error,
          sender: "robot",
          id: crypto.randomUUID(),
        };
      } else {
        botMessage = {
          message: data.text,
          sender: "robot",
          id: crypto.randomUUID(),
        };
      }
    } catch (error) {
      console.error("Failed to connect to backend:", error);

      botMessage = {
        message: "Sorry, I couldn't reach the server right now.",
        sender: "robot",
        id: crypto.randomUUID(),
      };
    } finally {
      // conpile final message object
      const newerChatMessages = [...newChatMessages, botMessage];

      // Update the messages state
      setMessage(newerChatMessages);

      // Enable the input box
      setIsloading(false);
      setIsTyping(false);
      setDisabled(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key == "Enter") handleClick();
    if (event.key == "Escape") setInput("");
  }

  function saveInputText(event) {
    setInput(event.target.value);
  }

  return (
    // Lock the main container to 90% of the screen height
    <div className="container mt-3" style={{ height: "90vh" }}>
      {/* Create the flex column setup */}
      <div className="col-12 col-md-12 col-lg-8 mx-auto d-flex flex-column h-100">
        <div className="col-md-10 mx-auto d-flex flex-column h-100">
          <Header />
          {/* flex-grow-1 expands this box, pushing the input to the bottom */}
          {/* overflow-auto makes it scrollable */}
          <div className="flex-grow-1 overflow-auto mb-3  p-3 bg-white rounded-bottom-3 shadow-lg border hide-scrollbar">
            {messages.map((chatMessage) => (
              <div key={chatMessage.id}>
                <ChatMessage {...chatMessage} ref={chatmessageRef} />
              </div>
            ))}

            {isLoading && (
              <div>
                <span className="spinner-grow spinner-grow-sm text-primary"></span>
                <span className="text-muted">Kobby is typing...</span>
              </div>
            )}

          </div>

          <div>
            <ChatInput
              onClick={handleClick}
              onChange={saveInputText}
              onKeyDown={handleKeyDown}
              value={input}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

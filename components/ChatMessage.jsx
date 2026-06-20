export const ChatMessage = ({message, sender}) =>{
    
    // const imagePath = sender === "user"? "/shirt.png" : "/person.svg" ;
    
        return (
            <div>
                { sender === "user" && (
                    <img src="/person.png" 
                    alt="" 
                    className="img-fluid chat-avatar" />)
                }
                <span>{message}</span>
                { sender === "robot" && (
                    <img src="/shirt.png" 
                    alt="" 
                    className="img-fluid chat-avatar" />)
                }
            </div>
        )
}
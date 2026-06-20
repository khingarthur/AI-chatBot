export const ChatMessage = ({message, sender}) =>{
    
    // const imagePath = sender === "user"? "/shirt.png" : "/person.svg" ;
    const isUser = sender === 'user';

    return (
        <div className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>

        {sender === "robot" && (
            <img 
            src="shirt.png" 
            alt="robot"
            className="rounded-circle me-2 align-self-end"
            width="40" 
            height="40"
            />
        )}

        <div 
            className={`p-3 shadow-sm ${isUser ? 'bg-primary text-white' : 'bg-light text-dark'}`}
            style={{
            maxWidth: '75%',
            borderRadius: '15px'
            }}
        >
            {message}
        </div>

        {sender === "user" && (
            <img 
            src="/person.png" 
            alt="user"
            className="img-fluid chat-avatar rounded-circle ms-2 align-self-end" 
            width="40" 
            height="40"
            />
        )}

        </div>
    );
}


export const ChatInput = ({onClick, onChange, value}) =>{
    return (
        <div>
            <input type="text" placeholder="Enter your message" onChange={onChange} value={value} />
            <button className="btn btn-primary" onClick={onClick} >Send</button>
        </div>
    )
}


export const ChatInput = ({onClick, onChange, value, onKeyDown, disabled}) =>{
    return (
        <div className="input-group">
            <input 
                type="text" 
                placeholder="Enter your message" 
                onChange={onChange} 
                value={value}
                onKeyDown={onKeyDown}
                disabled ={disabled}
                className="form-control form-control-lg shadow-sm border-0"
            />

            <button 
                className="btn btn-primary px-4 ms-3 shadow-sm" 
                onClick={onClick} 
            >
                Send
            </button>
        </div>
    )
}
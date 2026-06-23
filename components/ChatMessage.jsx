import ReactMarkdown from "react-markdown";

export const ChatMessage = ({ message, sender, ref }) => {
  const isUser = sender === "user";

  return (
    <div
      ref={ref}
      className={`d-flex mb-3 ${isUser ? "justify-content-end" : "justify-content-start"}`}
    >
      {sender === "robot" && (
        
        <img
          src="/robot.png"
          alt="robot"
          className="rounded-circle me-2 align-self-end"
          width="55"
          height="55"
        />
      )}

      <div
        className={`px-3 py-1 shadow-sm  ${isUser ? "bg-primary text-white" : "bg-light text-dark"}`}
        style={{
          maxWidth: "75%",
          borderRadius: "15px",
        }}
      >
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <p style={{ marginBottom: 0 }} {...props} />
            ),
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
};

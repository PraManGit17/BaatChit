import { useState } from "react";
import { getSocket } from "../socket";

export default function MessageInput({ socket, to, onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleTyping = (isTyping) => {
    socket.emit("typing", { to, isTyping });
  };

  return (
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        className="flex-1 border rounded px-2 py-1"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => handleTyping(true)}
        onBlur={() => handleTyping(false)}
      />
      <button
        className="bg-blue-500 text-white px-3 rounded"
        onClick={send}
      >
        Send
      </button>
    </div>
  );
}

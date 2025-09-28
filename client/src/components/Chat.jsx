// import { useEffect, useState } from "react";
// import { initSocket, getSocket } from "../socket";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";

// export default function Chat({ user, token }) {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [withUserId, setWithUserId] = useState(""); 
//   const [typingUser, setTypingUser] = useState(null);

//   useEffect(() => {
//     const s = initSocket(token);
//     setSocket(s);

//     s.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     s.on("typing", ({ from, isTyping }) => {
//       setTypingUser(isTyping ? from : null);
//     });

//     return () => s.disconnect();
//   }, [token]);

//   // Fetch old messages
//   const loadMessages = () => {
//     socket.emit("fetch-message", { withUserId, limit: 50 }, (res) => {
//       if (res.ok) setMessages(res.message);
//     });
//   };

//   const sendMessage = (text) => {
//     const tempId = Date.now();
//     socket.emit(
//       "send-message",
//       { to: withUserId, text, tempId },
//       (res) => {
//         if (res.ok) {
//           setMessages((prev) => [...prev, res.message]);
//         }
//       }
//     );
//   };

//   return (
//     <div className="w-[600px] bg-white rounded-lg shadow p-4 flex flex-col">
//       <h2 className="text-lg font-bold border-b pb-2">
//         Chatting as {user.name}
//       </h2>

//       {/* Choose chat partner */}
//       <div className="my-2 flex gap-2">
//         <input
//           type="text"
//           placeholder="Enter User ID to chat"
//           className="border px-2 py-1 flex-1"
//           value={withUserId}
//           onChange={(e) => setWithUserId(e.target.value)}
//         />
//         <button
//           className="bg-green-500 text-white px-3 py-1 rounded"
//           onClick={loadMessages}
//         >
//           Load
//         </button>
//       </div>

//       {/* Messages */}
//       <MessageList messages={messages} selfId={user._id} />

//       {/* Typing Indicator */}
//       {typingUser && (
//         <div className="text-sm text-gray-500">{typingUser} is typing...</div>
//       )}

//       {/* Input */}
//       {withUserId && (
//         <MessageInput socket={socket} to={withUserId} onSend={sendMessage} />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { initSocket } from "../socket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Chat({ user, token }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null); // Selected user
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    const s = initSocket(token);
    setSocket(s);

    s.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("typing", ({ from, isTyping }) => {
      setTypingUser(isTyping ? from : null);
    });

    return () => s.disconnect();
  }, [token]);

  // Load all users
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  const loadMessages = (userId) => {
    setChatUser(users.find(u => u._id === userId));
    socket.emit("fetch-message", { withUserId: userId, limit: 50 }, (res) => {
      if (res.ok) setMessages(res.message);
    });
  };

  const sendMessage = (text) => {
    if (!chatUser) return;
    const tempId = Date.now();
    socket.emit(
      "send-message",
      { to: chatUser._id, text, tempId },
      (res) => {
        if (res.ok) setMessages((prev) => [...prev, res.message]);
      }
    );
  };

  return (
    <div className="flex w-full h-full gap-4">
      {/* User List */}
      <div className="w-1/4 bg-gray-100 p-2 rounded">
        <h3 className="font-bold mb-2">Users</h3>
        {users.map((u) => (
          <div
            key={u._id}
            className="p-2 rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => loadMessages(u._id)}
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className="flex-1 bg-white rounded-lg shadow p-4 flex flex-col">
        {chatUser ? (
          <>
            <h2 className="text-lg font-bold border-b pb-2">
              Chatting with {chatUser.name}
            </h2>

            <MessageList messages={messages} selfId={user._id} />

            {typingUser && (
              <div className="text-sm text-gray-500">{typingUser} is typing...</div>
            )}

            <MessageInput socket={socket} to={chatUser._id} onSend={sendMessage} />
          </>
        ) : (
          <div className="text-gray-500">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}

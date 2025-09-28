export default function MessageList({ messages, selfId }) {
  return (
    <div className="flex-1 overflow-y-auto border p-2 space-y-2">
      {messages.map((m) => (
        <div
          key={m._id || m.tempId}
          className={`p-2 rounded max-w-[70%] ${
            m.sender._id === selfId
              ? "bg-blue-500 text-white ml-auto"
              : "bg-gray-200"
          }`}
        >
          <div className="text-sm">{m.text}</div>
        </div>
      ))}
    </div>
  );
}

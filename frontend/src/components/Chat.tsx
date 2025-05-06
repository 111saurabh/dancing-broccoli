import { useState, useEffect } from "react";
import { useAuth } from "../firebase/AuthContext";

type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
};

export default function Chat({ matchId }: { matchId: string }) {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // TODO: Connect to Socket.io
  useEffect(() => {
    // Mock initial messages
    setMessages([
      {
        id: "1",
        text: "Hey there! Want to practice React together?",
        senderId: "mockUser1",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // TODO: Implement actual message sending
    const mockMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: currentUser?.uid || "anonymous",
      timestamp: new Date(),
    };

    setMessages([...messages, mockMessage]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.senderId === currentUser?.uid ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.senderId === currentUser?.uid
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

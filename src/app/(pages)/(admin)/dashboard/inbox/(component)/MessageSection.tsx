import React from "react";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";

const MessageSection: React.FC = () => {
  const messages = Array(15).fill("harvin-tech");

  const handleSendMessage = (recipient: string, message: string) => {
    console.log(`Message sent to ${recipient}: ${message}`);
    alert(`Message sent to ${recipient}: ${message}`);
  };

  return (
    <div className="flex flex-col p-6 ">
      <h1 className="text-2xl font-bold mb-6">Private Messages</h1>
      <div className="flex gap-4">
        <MessageList messages={messages} />
        <MessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default MessageSection;

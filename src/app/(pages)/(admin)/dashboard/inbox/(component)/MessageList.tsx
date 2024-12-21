import React from "react";

interface MessageListProps {
  messages: string[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className=" h-[500px] overflow-y-auto bg-gray-100 rounded-md p-2">
      <h3 className="text-sm font-medium mb-2">New Messages</h3>
      {messages.map((message, index) => (
        <div
          key={index}
          className="bg-purple-200 text-center rounded-md py-2 mb-1 text-xs "
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessageList;

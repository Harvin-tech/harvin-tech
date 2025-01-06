import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

const MessageSection: React.FC = () => {
  const messages = Array(15).fill('harvin-tech');

  const handleSendMessage = (recipient: string, message: string) => {
    console.log(`Message sent to ${recipient}: ${message}`);
    alert(`Message sent to ${recipient}: ${message}`);
  };

  return (
    <div className="flex flex-col px-3 pt-2">
      <h1 className="font-semibold mb-2 text-base md:text-lg">
        Private Messages
      </h1>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="order-2 md:-order-none w-full md:max-w-[30%] ">
          <MessageList messages={messages} />
        </div>
        <div className="order-1 md:-order-none w-full md:max-w-[70%] ">
          <MessageForm onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default MessageSection;

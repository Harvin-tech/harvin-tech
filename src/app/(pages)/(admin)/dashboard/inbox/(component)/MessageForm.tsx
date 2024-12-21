import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface MessageFormProps {
  onSendMessage: (recipient: string, message: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
  const [recipient, setRecipient] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipient && message) {
      onSendMessage(recipient, message);
      setMessage("");
    }
  };

  return (
    <div className=" bg-card p-4 rounded-md">
      <h3 className="text-base md:text-lg font-medium mb-1 tracking-tight">Write new messages</h3>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm mb-1">Recipient</label>
        <Select value={recipient} onValueChange={setRecipient}>
          <SelectTrigger className="w-full mb-3">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="User 1">User 1</SelectItem>
            <SelectItem value="User 2">User 2</SelectItem>
            <SelectItem value="User 3">User 3</SelectItem>
          </SelectContent>
        </Select>

        <label className="block text-sm mb-1">Message</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-3"
          placeholder="Type your message..."
          rows={5}
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-xs md:text-sm"
        >
          Send message
        </button>
      </form>
    </div>
  );
};

export default MessageForm;

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "./FileUpload";
import AttachmentPreview from "./AttachmentPreview";

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: Array<{ url: string; fileName: string }>) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<Array<{ url: string; fileName: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || attachments.length > 0) && !disabled) {
      onSendMessage(message.trim(), attachments);
      setMessage("");
      setAttachments([]);
    }
  };

  const handleFileUploaded = (url: string, fileName: string) => {
    setAttachments(prev => [...prev, { url, fileName }]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-border bg-background p-3">
      {attachments.length > 0 && (
        <div className="mb-2 flex flex-wrap">
          {attachments.map((attachment, index) => (
            <AttachmentPreview
              key={index}
              url={attachment.url}
              fileName={attachment.fileName}
              onRemove={() => removeAttachment(index)}
            />
          ))}
        </div>
      )}
      <div className="flex items-end space-x-2">
        <FileUpload onFileUploaded={handleFileUploaded} />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-white text-gray-800 rounded-lg px-3 py-2.5 text-[12px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d5803f] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed max-h-32 min-h-[40px]"
          style={{ fieldSizing: "content" } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={(!message.trim() && attachments.length === 0) || disabled}
          className="text-white rounded-lg h-10 w-10 flex-shrink-0 disabled:opacity-50 flex items-center justify-center"
          style={{ 
            hover: 'none', 
            backgroundColor: '#D5803F',
            border: 'none',
            outline: 'none'
          }}
          onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#D5803F'; }}
          onMouseLeave={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#D5803F'; }}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;

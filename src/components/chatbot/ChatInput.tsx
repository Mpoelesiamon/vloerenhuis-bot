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
    <form onSubmit={handleSubmit} className="border-t border-border bg-background p-4">
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap">
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
          placeholder="Stel een vraag of upload een bestand..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-secondary text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed max-h-32 min-h-[44px]"
          style={{ fieldSizing: "content" } as React.CSSProperties}
        />
        <Button
          type="submit"
          size="icon"
          disabled={(!message.trim() && attachments.length === 0) || disabled}
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl h-11 w-11 flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;

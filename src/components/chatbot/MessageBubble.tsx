import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  attachments?: Array<{ url: string; fileName: string }>;
}

const MessageBubble = ({ message, isUser, timestamp, attachments }: MessageBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`max-w-[75%] ${isUser ? "order-2" : "order-1"}`}>
        {attachments && attachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((attachment, index) => {
              const isImage = attachment.fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i);
              return isImage ? (
                <img
                  key={index}
                  src={attachment.url}
                  alt={attachment.fileName}
                  className="max-w-[200px] rounded-lg border border-border"
                />
              ) : null;
            })}
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-chat-user-bg text-chat-user-fg rounded-br-sm"
              : "bg-chat-bot-bg text-chat-bot-fg rounded-bl-sm"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
        {timestamp && (
          <p className={`text-xs text-muted-foreground mt-1 px-2 ${isUser ? "text-right" : "text-left"}`}>
            {timestamp}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;

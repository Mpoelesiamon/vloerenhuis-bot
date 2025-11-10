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
          className={`px-3 py-2 rounded-2xl ${
            isUser
              ? "bg-[#d5803f] text-white rounded-br-sm"
              : "bg-[#e2e8f0] text-gray-800 rounded-bl-sm"
          }`}
        >
          <p className="text-[12px] leading-relaxed whitespace-pre-wrap break-words font-sans">
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

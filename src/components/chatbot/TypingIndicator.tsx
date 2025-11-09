import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 px-4 py-3 bg-chat-bot-bg text-chat-bot-fg rounded-2xl rounded-bl-sm max-w-[80px]">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-muted-foreground rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default TypingIndicator;

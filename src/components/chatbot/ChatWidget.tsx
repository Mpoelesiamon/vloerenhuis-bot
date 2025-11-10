import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ChatWindow from "./ChatWindow";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={toggleChat} isOpen={isOpen} />}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#d5803f] hover:bg-[#d5803f] text-white rounded-full shadow-2xl flex items-center justify-center z-[10000] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <MessageCircle className="w-7 h-7" />
        </motion.button>
      )}
    </>
  );
};

export default ChatWidget;

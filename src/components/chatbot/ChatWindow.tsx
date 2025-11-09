import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  attachments?: Array<{ url: string; fileName: string }>;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hallo! Ik ben VloerBot, jouw AI-assistent voor vloeren. Hoe kan ik je helpen?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string, attachments?: Array<{ url: string; fileName: string }>) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachments,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Prepare messages for AI
      const apiMessages = messages.map(msg => {
        const content: any[] = [{ type: "text", text: msg.text }];
        
        // Add images to the message content
        if (msg.attachments) {
          msg.attachments.forEach(attachment => {
            if (attachment.fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              content.push({
                type: "image_url",
                image_url: { url: attachment.url }
              });
            }
          });
        }
        
        return {
          role: msg.isUser ? "user" : "assistant",
          content: content.length === 1 ? content[0].text : content
        };
      });

      // Add current message
      const currentContent: any[] = [{ type: "text", text }];
      if (attachments) {
        attachments.forEach(attachment => {
          if (attachment.fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            currentContent.push({
              type: "image_url",
              image_url: { url: attachment.url }
            });
          }
        });
      }
      
      apiMessages.push({
        role: "user",
        content: currentContent.length === 1 ? currentContent[0].text : currentContent
      });

      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-stream`;
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to get AI response');
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let botMessageText = "";

      // Create initial bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "",
        isUser: false,
        timestamp: new Date().toLocaleTimeString("nl-NL", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, botMessage]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              botMessageText += content;
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && !lastMessage.isUser) {
                  lastMessage.text = botMessageText;
                }
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, er is een fout opgetreden. Probeer het opnieuw.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString("nl-NL", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-full md:w-[380px] bg-background shadow-2xl flex flex-col z-[9999]"
    >
      <ChatHeader onClose={onClose} />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
            attachments={message.attachments}
          />
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </motion.div>
  );
};

export default ChatWindow;

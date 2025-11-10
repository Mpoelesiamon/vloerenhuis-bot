
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
  profileImage?: string;
}

const ChatHeader = ({ onClose, profileImage }: ChatHeaderProps) => {
  return (
    <div className="bg-[#d5803f] text-white px-4 py-3 flex items-center justify-between">
      {profileImage ? (
        <img 
          src={profileImage} 
          alt="VloerBot" 
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
          🤖
        </div>
      )}
      <div>
        <h3 className="font-semibold text-sm">VloerBot</h3>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-white hover:bg-white/10 rounded-full h-8 w-8 ml-auto"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ChatHeader;


import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
  profileImage?: string;
}

const ChatHeader = ({ onClose, profileImage }: ChatHeaderProps) => {
  return (
    <div className="bg-[#d5803f] text-white px-4 py-3 flex items-center justify-between">
      <h3 className="font-bold text-base" style={{ fontFamily: 'Crimson Pro, serif', fontWeight: 700 }}>VloerBot</h3>
      
      <button
        onClick={onClose}
        className="text-white rounded-full h-8 w-8 flex items-center justify-center"
        style={{ 
          fontFamily: 'Crimson Pro, serif', 
          fontWeight: 700, 
          background: 'transparent',
          backgroundColor: 'transparent',
          hover: 'none',
          border: 'none',
          outline: 'none'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <span className="text-xl leading-none">×</span>
      </button>
    </div>
  );
};

export default ChatHeader;

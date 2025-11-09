import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between border-b border-border/10">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">
          VB
        </div>
        <div>
          <h3 className="font-semibold text-base">VloerBot</h3>
          <p className="text-xs text-primary-foreground/70">AI Assistent</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ChatHeader;

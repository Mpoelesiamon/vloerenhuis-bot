import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Rocket, HelpCircle } from "lucide-react";

interface ActionButtonsProps {
  onActionClick: (action: string) => void;
}

const ActionButtons = ({ onActionClick }: ActionButtonsProps) => {
  const actions = [
    {
      id: "sales",
      label: "Chat with sales",
      icon: MessageCircle,
    },
    {
      id: "demo",
      label: "Book a demo",
      icon: Calendar,
    },
  ];

  return (
    <div className="px-4 py-3 space-y-2 bg-[#f9fafb]">
      {actions.map((action) => (
        <Button
          key={action.id}
          onClick={() => onActionClick(action.label)}
          variant="outline"
          className="w-full justify-start text-left h-auto py-2.5 px-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-[12px] rounded-lg font-normal"
        >
          <action.icon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-600" />
          <span>{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;

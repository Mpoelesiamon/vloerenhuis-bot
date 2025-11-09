import { X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttachmentPreviewProps {
  url: string;
  fileName: string;
  onRemove: () => void;
}

const AttachmentPreview = ({ url, fileName, onRemove }: AttachmentPreviewProps) => {
  const isImage = fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i);

  return (
    <div className="relative inline-block mr-2 mb-2">
      {isImage ? (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
          <img src={url} alt={fileName} className="w-full h-full object-cover" />
          <Button
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="relative flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg border border-border">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground max-w-[100px] truncate">{fileName}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-5 w-5 ml-1"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AttachmentPreview;

import { useState } from "react";
import { Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FileUploadProps {
  onFileUploaded: (url: string, fileName: string) => void;
}

const FileUpload = ({ onFileUploaded }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Bestand is te groot. Maximum grootte is 10MB.");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('chat-uploads')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('chat-uploads')
        .getPublicUrl(filePath);

      onFileUploaded(publicUrl, file.name);
      toast.success("Bestand geüpload!");
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Fout bij uploaden van bestand");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
        disabled={uploading}
        accept="image/jpeg,image/png,image/gif,image/webp,application/pdf,.doc,.docx"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={uploading}
        onClick={() => document.getElementById('file-upload')?.click()}
        className="text-muted-foreground hover:text-foreground"
      >
        <Paperclip className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default FileUpload;

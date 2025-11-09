-- Create storage bucket for chat uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'chat-uploads',
  'chat-uploads',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- RLS policies for chat uploads bucket
CREATE POLICY "Anyone can upload chat files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'chat-uploads');

CREATE POLICY "Anyone can view chat files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'chat-uploads');

CREATE POLICY "Anyone can delete their uploads"
ON storage.objects
FOR DELETE
USING (bucket_id = 'chat-uploads');
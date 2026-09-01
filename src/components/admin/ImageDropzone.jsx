'use client';

import { useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ImageDropzone({
  onFiles,
  multiple = true,
  busy = false,
  label = 'Drop photos here or click to upload',
  hint = 'JPG, PNG, WEBP, or GIF · up to 8 MB each',
  compact = false,
  className,
}) {
  const inputRef = useRef(null);
  const [over, setOver] = useState(false);

  const take = (files) => {
    const list = [...files].filter((file) => file.type.startsWith('image/'));
    if (list.length) onFiles(list);
  };

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setOver(false);
        take(event.dataTransfer.files);
      }}
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-xl border border-dashed text-center transition-colors',
        compact ? 'min-h-28 gap-1 px-4 py-6' : 'min-h-40 gap-2 px-6 py-8',
        over ? 'border-primary bg-secondary/60' : 'border-border bg-muted/50 hover:bg-muted',
        busy && 'pointer-events-none opacity-70',
        className,
      )}
    >
      {busy ? (
        <Loader2 className="size-6 animate-spin text-primary" />
      ) : (
        <ImagePlus className="size-6 text-primary" />
      )}
      <span className="text-sm font-medium">{busy ? 'Uploading…' : label}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          take(event.target.files || []);
          event.target.value = '';
        }}
      />
    </button>
  );
}

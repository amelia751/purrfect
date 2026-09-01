'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function TextField({ id, label, value, onChange, type = 'text', ...props }) {
  return (
    <div className="grid min-w-0 gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
}

export function AreaField({ id, label, value, onChange, rows = 4, ...props }) {
  return (
    <div className="grid min-w-0 gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        rows={rows}
        className="max-h-48 resize-y [field-sizing:fixed]"
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
}

export function BilingualField({ id, label, value = {}, onChange, multiline = false }) {
  const Field = multiline ? AreaField : TextField;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field
        id={`${id}-en`}
        label={`${label} (EN)`}
        value={value.en}
        onChange={(en) => onChange({ ...value, en })}
      />
      <Field
        id={`${id}-vi`}
        label={`${label} (VI)`}
        value={value.vi}
        onChange={(vi) => onChange({ ...value, vi })}
      />
    </div>
  );
}

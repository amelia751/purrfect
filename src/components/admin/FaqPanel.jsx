'use client';

import { useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  addFaqItemAdmin,
  deleteFaqItemAdmin,
  saveFaqItemAdmin,
  saveFaqSectionAdmin,
} from '@/lib/adminContent';
import { emptyPair, runAdminAction } from '@/lib/adminHelpers';
import { ConfirmDelete } from './ConfirmDelete';
import { BilingualField } from './fields';

export function FaqPanel({ faq, setFaq }) {
  const [sectionId, setSectionId] = useState(faq.sections[0]?.id || '');
  const [savingId, setSavingId] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const [removing, setRemoving] = useState(false);

  const updateSection = (index, title) => {
    const sections = [...faq.sections];
    sections[index] = { ...sections[index], title };
    setFaq({ ...faq, sections });
  };

  const updateItem = (index, patch) => {
    const items = [...faq.items];
    items[index] = { ...items[index], ...patch };
    setFaq({ ...faq, items });
  };

  const addQuestion = async () => {
    const target = sectionId || faq.sections[0]?.id;
    if (!target) return;
    const data = {
      sectionId: target,
      sortOrder: faq.items.filter((item) => item.sectionId === target).length,
      question: { ...emptyPair },
      answer: { ...emptyPair },
    };
    const id = await runAdminAction(() => addFaqItemAdmin(data), 'Added a blank question.');
    setFaq({ ...faq, items: [...faq.items, { id, ...data }] });
  };

  const removeItem = async () => {
    const item = pendingDelete;
    if (!item) return;
    setRemoving(true);
    try {
      await runAdminAction(() => deleteFaqItemAdmin(item.id), 'Question deleted.');
      setFaq({ ...faq, items: faq.items.filter((row) => row.id !== item.id) });
      setPendingDelete(null);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="grid gap-6">
      {faq.sections.map((section, index) => (
        <Card key={section.id} className="rounded-2xl shadow-[0_8px_24px_rgba(117,102,89,0.06)]">
          <CardHeader>
            <CardTitle>{section.title?.en || section.id}</CardTitle>
            <CardDescription>Section id: {section.id}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <BilingualField id={`section-${section.id}`} label="Title" value={section.title} onChange={(title) => updateSection(index, title)} />
            <Button
              className="w-fit rounded-full"
              disabled={savingId === section.id}
              onClick={async () => {
                setSavingId(section.id);
                try {
                  await runAdminAction(
                    () => saveFaqSectionAdmin(section.id, { sortOrder: section.sortOrder, title: section.title }),
                    'Section saved.',
                  );
                } finally {
                  setSavingId('');
                }
              }}
            >
              {savingId === section.id ? <Loader2 className="animate-spin" /> : null}
              Save section
            </Button>
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select value={sectionId} onValueChange={setSectionId}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Add to section" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[90]">
            {faq.sections.map((section) => (
              <SelectItem key={section.id} value={section.id}>
                {section.title?.en || section.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="rounded-full" onClick={addQuestion}>
          <Plus />
          Add question
        </Button>
      </div>

      {faq.items.map((item, index) => (
        <Card key={item.id} className="rounded-2xl shadow-[0_8px_24px_rgba(117,102,89,0.06)]">
          <CardHeader>
            <CardDescription>{faq.sections.find((section) => section.id === item.sectionId)?.title?.en || item.sectionId}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <BilingualField id={`q-${item.id}`} label="Question" value={item.question} onChange={(question) => updateItem(index, { question })} />
            <BilingualField id={`a-${item.id}`} label="Answer" value={item.answer} multiline onChange={(answer) => updateItem(index, { answer })} />
            <div className="flex flex-wrap gap-2">
              <Button
                className="rounded-full"
                disabled={savingId === item.id}
                onClick={async () => {
                  setSavingId(item.id);
                  try {
                    await runAdminAction(() => saveFaqItemAdmin(item.id, item), 'Question saved.');
                  } finally {
                    setSavingId('');
                  }
                }}
              >
                {savingId === item.id ? <Loader2 className="animate-spin" /> : null}
                Save question
              </Button>
              <Button variant="outline" className="text-destructive" onClick={() => setPendingDelete(item)}>
                <Trash2 />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <ConfirmDelete
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open && !removing) setPendingDelete(null);
        }}
        title="Delete this question?"
        description={
          pendingDelete?.question?.en
            ? `“${pendingDelete.question.en}” will disappear from the FAQ page.`
            : 'Guests will no longer see this question on the FAQ page.'
        }
        confirmLabel="Delete question"
        busy={removing}
        onConfirm={removeItem}
      />
    </div>
  );
}

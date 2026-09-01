'use client';

import { useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addReviewAdmin, deleteReviewAdmin, saveReviewAdmin } from '@/lib/adminContent';
import { emptyPair, runAdminAction } from '@/lib/adminHelpers';
import { ConfirmDelete } from './ConfirmDelete';
import { BilingualField, TextField } from './fields';

export function ReviewsPanel({ reviews, setReviews }) {
  const [savingId, setSavingId] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const [removing, setRemoving] = useState(false);

  const update = (index, patch) => {
    const next = [...reviews];
    next[index] = { ...next[index], ...patch };
    setReviews(next);
  };

  const addReview = async () => {
    const data = {
      author: '',
      star: 5,
      sortOrder: reviews.length,
      text: { ...emptyPair },
    };
    const id = await runAdminAction(() => addReviewAdmin(data), 'Added a blank review.');
    setReviews([...reviews, { id, ...data }]);
  };

  const removeReview = async () => {
    const review = pendingDelete;
    if (!review) return;
    setRemoving(true);
    try {
      await runAdminAction(() => deleteReviewAdmin(review.id), 'Review deleted.');
      setReviews(reviews.filter((row) => row.id !== review.id));
      setPendingDelete(null);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <Button className="rounded-full" onClick={addReview}>
          <Plus />
          Add review
        </Button>
      </div>

      {reviews.map((review, index) => (
        <Card key={review.id} className="rounded-2xl shadow-[0_8px_24px_rgba(117,102,89,0.06)]">
          <CardHeader>
            <CardTitle>{review.author || 'New review'}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <TextField id={`author-${review.id}`} label="Author" value={review.author} onChange={(author) => update(index, { author })} />
              <div className="grid gap-2">
                <Label>Stars</Label>
                <Select value={String(review.star || 5)} onValueChange={(star) => update(index, { star: Number(star) })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[90]">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <SelectItem key={star} value={String(star)}>
                        {star} star{star === 1 ? '' : 's'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <TextField
                id={`order-${review.id}`}
                label="Order"
                type="number"
                value={review.sortOrder}
                onChange={(sortOrder) => update(index, { sortOrder: Number(sortOrder) || 0 })}
              />
            </div>
            <BilingualField id={`review-${review.id}`} label="Review" value={review.text} multiline onChange={(text) => update(index, { text })} />
            <div className="flex flex-wrap gap-2">
              <Button
                className="rounded-full"
                disabled={savingId === review.id}
                onClick={async () => {
                  setSavingId(review.id);
                  try {
                    const { id, ...data } = review;
                    await runAdminAction(() => saveReviewAdmin(id, data), `Saved ${review.author || 'review'}.`);
                  } finally {
                    setSavingId('');
                  }
                }}
              >
                {savingId === review.id ? <Loader2 className="animate-spin" /> : null}
                Save review
              </Button>
              <Button variant="outline" className="text-destructive" onClick={() => setPendingDelete(review)}>
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
        title="Delete this review?"
        description={
          pendingDelete?.author
            ? `The review from ${pendingDelete.author} will disappear from the reviews page.`
            : 'This review will disappear from the reviews page.'
        }
        confirmLabel="Delete review"
        busy={removing}
        onConfirm={removeReview}
      />
    </div>
  );
}

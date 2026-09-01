'use client';

import { useEffect, useState } from 'react';
import { ADMIN_EMAIL, signInAdmin, signOutAdmin, watchAdminUser } from '@/lib/auth';
import {
  addFaqItemAdmin,
  addReviewAdmin,
  deleteFaqItemAdmin,
  deleteReviewAdmin,
  loadCatsAdmin,
  loadFaqAdmin,
  loadReviewsAdmin,
  loadSiteAdmin,
  saveCatAdmin,
  saveFaqItemAdmin,
  saveFaqSectionAdmin,
  saveReviewAdmin,
  saveSiteAdmin,
} from '@/lib/adminContent';
import './Admin.css';

const TABS = [
  { id: 'store', label: 'Store' },
  { id: 'cats', label: 'Cats' },
  { id: 'faq', label: 'FAQ' },
  { id: 'reviews', label: 'Reviews' },
];

function Field({ label, value, onChange, multiline = false }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label className="admin-field">
      <span>{label}</span>
      <Tag value={value ?? ''} onChange={(event) => onChange(event.target.value)} rows={multiline ? 4 : undefined} />
    </label>
  );
}

function Pair({ label, value = {}, onChange, multiline = false }) {
  return (
    <div className="admin-pair">
      <Field label={`${label} (EN)`} value={value.en} multiline={multiline} onChange={(en) => onChange({ ...value, en })} />
      <Field label={`${label} (VI)`} value={value.vi} multiline={multiline} onChange={(vi) => onChange({ ...value, vi })} />
    </div>
  );
}

function AdminPage() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('store');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [cats, setCats] = useState([]);
  const [faq, setFaq] = useState({ sections: [], items: [] });
  const [reviews, setReviews] = useState([]);
  const [site, setSite] = useState(null);

  useEffect(() => watchAdminUser(setUser), []);

  useEffect(() => {
    if (!user) return undefined;
    let cancelled = false;
    Promise.all([loadCatsAdmin(), loadFaqAdmin(), loadReviewsAdmin(), loadSiteAdmin()])
      .then(([nextCats, nextFaq, nextReviews, nextSite]) => {
        if (cancelled) return;
        setCats(nextCats);
        setFaq(nextFaq);
        setReviews(nextReviews);
        setSite(nextSite);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const flash = (message) => {
    setNotice(message);
    setError('');
  };

  const signIn = async () => {
    setBusy(true);
    setError('');
    try {
      await signInAdmin();
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setBusy(false);
    }
  };

  if (!user) {
    return (
      <div className="admin-shell">
        <div className="admin-card">
          <img className="admin-logo" src="/purrfect-logo-white.png" alt="Purrfect Coffee" />
          <h1>Admin</h1>
          <p>Sign in with the shop Google account only.</p>
          <p className="admin-email">{ADMIN_EMAIL}</p>
          <button type="button" className="admin-google" onClick={signIn} disabled={busy}>
            {busy ? 'Opening Google…' : 'Continue with Google'}
          </button>
          {error ? <p className="admin-error">{error}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-app">
      <header className="admin-top">
        <div>
          <p className="admin-kicker">Purrfect Coffee</p>
          <h1>Admin</h1>
        </div>
        <div className="admin-who">
          <span>{user.email}</span>
          <button type="button" onClick={() => signOutAdmin()}>Sign out</button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? 'is-active' : ''}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {error ? <p className="admin-error">{error}</p> : null}
      {notice ? <p className="admin-notice">{notice}</p> : null}

      {tab === 'store' && site ? (
        <StorePanel
          site={site}
          setSite={setSite}
          onSave={async () => {
            await saveSiteAdmin(site);
            flash('Store info saved.');
          }}
        />
      ) : null}

      {tab === 'cats' ? (
        <CatsPanel
          cats={cats}
          setCats={setCats}
          onSave={async (cat) => {
            const { id, ...data } = cat;
            await saveCatAdmin(id, data);
            flash(`Saved ${cat.name}.`);
          }}
        />
      ) : null}

      {tab === 'faq' ? (
        <FaqPanel
          faq={faq}
          setFaq={setFaq}
          flash={flash}
        />
      ) : null}

      {tab === 'reviews' ? (
        <ReviewsPanel
          reviews={reviews}
          setReviews={setReviews}
          flash={flash}
        />
      ) : null}
    </div>
  );
}

function StorePanel({ site, setSite, onSave }) {
  const set = (key, value) => setSite({ ...site, [key]: value });
  return (
    <section className="admin-panel">
      <Pair label="Address" value={site.address} onChange={(value) => set('address', value)} />
      <Pair label="Phone" value={site.phone} onChange={(value) => set('phone', value)} />
      <Pair label="Hours" value={site.hours} multiline onChange={(value) => set('hours', value)} />
      <Pair label="Price" value={site.price} multiline onChange={(value) => set('price', value)} />
      <Pair label="Amenities" value={site.amenities} multiline onChange={(value) => set('amenities', value)} />
      <Field
        label="Ticket price (VND)"
        value={site.ticketPriceVnd}
        onChange={(value) => set('ticketPriceVnd', Number(value) || 0)}
      />
      <button type="button" className="admin-save" onClick={onSave}>Save store</button>
    </section>
  );
}

function CatsPanel({ cats, setCats, onSave }) {
  const update = (index, patch) => {
    const next = [...cats];
    next[index] = { ...next[index], ...patch };
    setCats(next);
  };
  return (
    <section className="admin-panel">
      {cats.map((cat, index) => (
        <article key={cat.id} className="admin-block">
          <div className="admin-block-head">
            {cat.profileUrl || cat.profile?.url ? (
              <img src={cat.profileUrl || cat.profile.url} alt="" />
            ) : null}
            <h2>{cat.fullname || cat.name}</h2>
          </div>
          <div className="admin-grid">
            <Field label="Name" value={cat.name} onChange={(name) => update(index, { name })} />
            <Field label="Full name" value={cat.fullname} onChange={(fullname) => update(index, { fullname })} />
            <Field label="Species" value={cat.species} onChange={(species) => update(index, { species })} />
            <Field label="Gender" value={cat.gender} onChange={(gender) => update(index, { gender })} />
            <Field label="Born" value={cat.dob} onChange={(dob) => update(index, { dob })} />
            <Field label="Order" value={cat.sortOrder} onChange={(sortOrder) => update(index, { sortOrder: Number(sortOrder) || 0 })} />
          </div>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={cat.showOnHome !== false}
              onChange={(event) => update(index, { showOnHome: event.target.checked })}
            />
            Show on home
          </label>
          <button type="button" className="admin-save" onClick={() => onSave(cat)}>Save cat</button>
        </article>
      ))}
    </section>
  );
}

function FaqPanel({ faq, setFaq, flash }) {
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

  return (
    <section className="admin-panel">
      {faq.sections.map((section, index) => (
        <article key={section.id} className="admin-block">
          <h2>{section.id}</h2>
          <Pair label="Title" value={section.title} onChange={(title) => updateSection(index, title)} />
          <button
            type="button"
            className="admin-save"
            onClick={async () => {
              await saveFaqSectionAdmin(section.id, { sortOrder: section.sortOrder, title: section.title });
              flash('FAQ section saved.');
            }}
          >
            Save section
          </button>
        </article>
      ))}

      {faq.items.map((item, index) => (
        <article key={item.id} className="admin-block">
          <p className="admin-muted">{item.sectionId} · {item.id}</p>
          <Pair label="Question" value={item.question} onChange={(question) => updateItem(index, { question })} />
          <Pair label="Answer" value={item.answer} multiline onChange={(answer) => updateItem(index, { answer })} />
          <div className="admin-actions">
            <button
              type="button"
              className="admin-save"
              onClick={async () => {
                await saveFaqItemAdmin(item.id, item);
                flash('FAQ item saved.');
              }}
            >
              Save question
            </button>
            <button
              type="button"
              className="admin-danger"
              onClick={async () => {
                await deleteFaqItemAdmin(item.id);
                setFaq({ ...faq, items: faq.items.filter((row) => row.id !== item.id) });
                flash('FAQ item deleted.');
              }}
            >
              Delete
            </button>
          </div>
        </article>
      ))}

      <button
        type="button"
        className="admin-save"
        onClick={async () => {
          const sectionId = faq.sections[0]?.id || 'store-rules';
          const sortOrder = faq.items.length;
          const data = {
            sectionId,
            sortOrder,
            question: { en: '', vi: '' },
            answer: { en: '', vi: '' },
          };
          const id = await addFaqItemAdmin(data);
          setFaq({ ...faq, items: [...faq.items, { id, ...data }] });
          flash('Added a blank FAQ item.');
        }}
      >
        Add question
      </button>
    </section>
  );
}

function ReviewsPanel({ reviews, setReviews, flash }) {
  const update = (index, patch) => {
    const next = [...reviews];
    next[index] = { ...next[index], ...patch };
    setReviews(next);
  };

  return (
    <section className="admin-panel">
      {reviews.map((review, index) => (
        <article key={review.id} className="admin-block">
          <div className="admin-grid">
            <Field label="Author" value={review.author} onChange={(author) => update(index, { author })} />
            <Field label="Stars" value={review.star} onChange={(star) => update(index, { star: Number(star) || 5 })} />
            <Field label="Order" value={review.sortOrder} onChange={(sortOrder) => update(index, { sortOrder: Number(sortOrder) || 0 })} />
          </div>
          <Pair label="Review" value={review.text} multiline onChange={(text) => update(index, { text })} />
          <div className="admin-actions">
            <button
              type="button"
              className="admin-save"
              onClick={async () => {
                const { id, ...data } = review;
                await saveReviewAdmin(id, data);
                flash(`Saved ${review.author}.`);
              }}
            >
              Save review
            </button>
            <button
              type="button"
              className="admin-danger"
              onClick={async () => {
                await deleteReviewAdmin(review.id);
                setReviews(reviews.filter((row) => row.id !== review.id));
                flash('Review deleted.');
              }}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
      <button
        type="button"
        className="admin-save"
        onClick={async () => {
          const data = {
            author: '',
            star: 5,
            sortOrder: reviews.length,
            text: { en: '', vi: '' },
          };
          const id = await addReviewAdmin(data);
          setReviews([...reviews, { id, ...data }]);
          flash('Added a blank review.');
        }}
      >
        Add review
      </button>
    </section>
  );
}

export default AdminPage;

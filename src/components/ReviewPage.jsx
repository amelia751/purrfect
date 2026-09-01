'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import FadeImage from './FadeImage';
import Reveal from './Reveal';
import ReviewerIcon from './ReviewerIcon';
import { localReviews } from '@/data/reviews';
import { fetchReviews } from '@/lib/content';
import './Review.css';

function reviewsForLanguage(language) {
  return localReviews.map((review) => ({
    ...review,
    text: review.text[language] || review.text.en || review.text.vi,
  }));
}

const ReviewInfo = ({ iconIndex, author, star, text }) => {
  const filledStars = Array(star).fill('★');
  const emptyStars = Array(5 - star).fill('☆');
  return (
    <div className="review-info">
      <div className="review-head">
        <ReviewerIcon index={iconIndex} />
        <p className="reviewer-name">{author}</p>
      </div>
      <div className="star-rating">
        <span style={{ color: '#FFD700' }}>
          {filledStars.concat(emptyStars).join('')}
        </span>
      </div>
      <p className="review-text">{text}</p>
    </div>
  );
};

function ReviewPage() {
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'en' ? 'en' : 'vi';
  const [reviews, setReviews] = useState(() => reviewsForLanguage(language));

  useEffect(() => {
    let cancelled = false;
    setReviews(reviewsForLanguage(language));
    fetchReviews(language).then((next) => {
      if (!cancelled) setReviews(next);
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

  return (
    <div className="review">
      <Header />
      <div className="review-banner">
        <FadeImage className="review-img" src="/review-img.png" alt="Review" priority optimizeWidth={1920} sizes="100vw" fit="cover" />
        <h1>{t('menuOptions.review')}</h1>
      </div>
      <div className="review-body">
        {reviews.map((review, index) => (
          <Reveal key={review.id} delay={index * 50}>
            <ReviewInfo
              iconIndex={index}
              author={review.author}
              star={review.star}
              text={review.text}
            />
          </Reveal>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ReviewPage;

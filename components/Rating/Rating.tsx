/* eslint-disable react/display-name */
import { useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import cn from 'classnames';

import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ error, rating, isEditable = false, setRating, tabIndex, ...props}: RatingProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const ratingRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseMove = (number: number) => {
    if (isEditable) {
      setCurrentRating(number);
    }
  };

  const handleClick = (number: number) => {
    if (isEditable && setRating) {
      setCurrentRating(number);
      setRating(number);
    }
  };

  const computeFocus = (rating: number, i: number): number => {
    if (!isEditable) {
      return -1;
    }
    if (!rating && i === 0) {
      return tabIndex ?? 0;
    }
    if (rating === i + 1) {
      return tabIndex ?? 0;
    }
    return -1;
  };

  const hadleKey = (event: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return;
    }
    if (event.code === 'ArrowRight' || event.code === 'ArrowUp') {
      if (!currentRating) {
        setCurrentRating(1);
      } else {
        event.preventDefault();
        setCurrentRating(currentRating < 5 ? currentRating + 1 : 5);
      }
      ratingRef.current[currentRating]?.focus();
    }
    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown') {
      if (!currentRating) {
        setCurrentRating(1);
      } else {
        event.preventDefault();
        setCurrentRating(currentRating > 1 ? currentRating - 1 : 1);
      }
      ratingRef.current[currentRating - 2]?.focus();
    }
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      setRating(currentRating);
    }
  };

  return (
    <div className={styles.ratingContainer}>
      <div {...props} ref={ref} >
        {Array.from(Array(5)).map((_, i: number) => (
          <span
            className={styles.star}
            key={i}
            onMouseEnter={() => handleMouseMove(i + 1)}
            onMouseLeave={() => handleMouseMove(rating)}
            onClick={() => handleClick(i + 1)}
            tabIndex={computeFocus(currentRating, i)}
            onKeyDown={hadleKey}
            ref={(ref) => { ratingRef.current?.push(ref) }}
            role={isEditable ? "slider" : ''}
            aria-valuenow={currentRating}
            aria-valuemax={5}
            aria-valuemin={1}
            aria-label={isEditable ? 'Поставьте оценку' : 'рейтинг' + rating}
            aria-invalid={error ? true : false}
          >
            <StarIcon
              className={cn(styles.mr5, {
                [styles.filled]: i < currentRating,
                [styles.isEditable]: isEditable,
                [styles.error]: error,
              })}
            />
          </span>
        ))}
      </div>
      {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
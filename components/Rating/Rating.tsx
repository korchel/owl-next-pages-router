/* eslint-disable react/display-name */
import { useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';

import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ error, rating, isEditable = false, setRating, ...props}: RatingProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [currentRating, setCurrentRating] = useState<number>(rating);

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

  const hadleKey = (number: number, event: KeyboardEvent<SVGElement>) => {
    if (event.code == 'Space' && setRating) {
      setCurrentRating(number);
      setRating(number);
    }
  }

  return (
    <div className={styles.ratingContainer}>
      <div {...props} ref={ref} >
        {Array.from(Array(5)).map((_, i: number) => (
          <span
            key={i}
            onMouseEnter={() => handleMouseMove(i + 1)}
            onMouseLeave={() => handleMouseMove(rating)}
            onClick={() => handleClick(i + 1)}
          >
            <StarIcon
              className={cn(styles.mr5, {
                [styles.filled]: i < currentRating,
                [styles.isEditable]: isEditable,
                [styles.error]: error,
              })}
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(event: KeyboardEvent<SVGElement>) => isEditable && hadleKey(i + 1, event)}
            />
          </span>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
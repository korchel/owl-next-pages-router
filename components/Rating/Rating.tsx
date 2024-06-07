'use client';

import cn from 'classnames';

import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import StarIcon from './star.svg';
// isEditable = false, setRating, className

export const Rating = ({ rating, ...props}: RatingProps): JSX.Element => {
  // const [currentRating, setCurrentRating] = useState<number>(0);
  return (
    <div {...props}>
      {Array.from(Array(5)).map((_, i: number) => (
        <StarIcon
          key={i}
          className={cn(styles.mr5, {
            [styles.svg]: i < rating
          })}
        />
      ))}
    </div>
  );
};
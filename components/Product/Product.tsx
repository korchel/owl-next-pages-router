/* eslint-disable react/display-name */
import cn from 'classnames';
import { motion } from 'framer-motion';

import { ProductProps } from "./Product.props";
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { getDeclination, priceToRu } from '@/helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: {
      opacity: 1,
      height: 'auto',
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const scrollToReview = () => {
    setReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={className} {...props} ref={ref}>
      <Card
        className={cn(styles.product, className)}
        {...props}
        color="white"
      >
        <div className={styles.logo}>
          <Image
            loader={() => product.image}
            src={product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceToRu(product.price)}
          {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceToRu(product.price - product.oldPrice)}</Tag>}
        </div>
        <div className={styles.credit}>{priceToRu(product.credit)}/<span className={styles.month}>мес.</span></div>
        <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
        <div className={styles.tags}>{product.categories.map((category) => (
            <Tag className={styles.category} key={category}>{category}</Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}>
          <a href="#ref" onClick={scrollToReview}>{product.reviewCount} {getDeclination(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
        </div>
        <Divider className={cn(styles.hr, styles.hr1)} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.features}>
          {product.characteristics.map((item) => (
            <div className={styles.feature} key={item.name}>
              <span className={styles.featureName}>{item.name}</span>
              <span className={styles.dots}></span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && <div className={styles.advantages}>
            <div className={styles.advTitle}>Преимущества</div>
            <div>{product.advantages}</div>
          </div>}
          {product.disadvantages && <div className={styles.disadvantages}>
            <div className={styles.advTitle}>Недостатки</div>
            <div>{product.disadvantages}</div>
          </div>}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button variant="primary">Узнать подробнее</Button>
          <Button
            variant="ghost"
            arrow={isReviewOpened ? "down" : "right"}
            onClick={() => setReviewOpened((state) => !state)}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial={{opacity: 'hidden'}}>
        <Card ref={reviewRef} color="lilac" className={styles.reviews}>
            {product.reviews.map((review) => (
              <div key={review._id} >
                <Review review={review} />
                <Divider />
              </div>
            ))}
            <ReviewForm productId={product._id} />
        </Card>
      </motion.div>
    </div>
  );
}));
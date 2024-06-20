/* eslint-disable react/display-name */
import cn from 'classnames';

import { CardProps } from "./Card.props";
import styles from './Card.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(({ color = 'white', children, className, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  return (
    <div className={cn(styles.card, className, {[styles.lilac]: color === 'lilac'})}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  );
});
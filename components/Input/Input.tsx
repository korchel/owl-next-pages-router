/* eslint-disable react/display-name */
import cn from 'classnames';

import { InputProps } from './Input.props';
import styles from './Input.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(({ error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <div className={cn(styles.inputContainer, className)}>
      <input className={cn(styles.input, {[styles.error]: error})} {...props} ref={ref} />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

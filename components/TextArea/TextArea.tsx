/* eslint-disable react/display-name */
import cn from 'classnames';

import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const TextArea = forwardRef(({ error, className, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <div className={cn(styles.textareaContainer, className)}>
      <textarea role="alert" className={cn(styles.textArea, {[styles.error]: error})} {...props} ref={ref} />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>

  );
});
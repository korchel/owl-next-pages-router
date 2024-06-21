import { ButtonIconProps, icons } from "./ButtonIcon.props";
import styles from './ButtonIcon.module.css';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';
import React from "react";


export const ButtonIcon = ({ variant, icon, children, className, ...props }: ButtonIconProps) => {
  const Icon = icons[icon];

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant === 'primary',
        [styles.white]: variant === 'white',
      })}
      {...props}
    >
      <Icon />
    </button>
  );
};
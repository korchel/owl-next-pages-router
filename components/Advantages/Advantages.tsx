import cn from 'classnames';


import styles from './Advantages.module.css';
import { Card } from '../Card/Card';
import CheckIcon from './check.svg';

import { AdvantagesProps } from './Advantages.props';

export const Advantages = ({advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map((item) => (
        <div key={item._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{item.title}</div>
          <hr className={styles.vertical} />
          <div>{item.description}</div>
        </div>
      ))}
    </>
  );
};
import cn from 'classnames';

import { HhDataProps } from "./HhData.props";
import styles from './HhData.module.css';
import { Card } from '../Card/Card';
import RateIcon from './star.svg';

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.vacancies}>
        <p className={styles.title}>Всего вакансий</p>
        <p className={styles.vacanciesCount}>{count}</p>
      </Card>
      <Card className={styles.salary}>
        <div>
          <p className={styles.title}>Начальный</p>
          <p className={styles.salaryValue}>{juniorSalary}</p>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div>
          <p className={styles.title}>Средний</p>
          <p className={styles.salaryValue}>{middleSalary}</p>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>
        <div>
          <p className={styles.title}>Профессионал</p>
          <p className={styles.salaryValue}>{seniorSalary}</p>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
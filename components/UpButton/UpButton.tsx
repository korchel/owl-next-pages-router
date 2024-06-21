import { useAnimation, motion } from 'framer-motion';

import styles from './UpButton.module.css';
import useScrollY from '@/hooks/useScrollY';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const UpButton = (): JSX.Element => {
  const controls = useAnimation();
  const yPosition = useScrollY();

  useEffect(() => {
    controls.start({ opacity: yPosition / document.body.scrollHeight });
  }, [yPosition, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className={styles.upButton}
      animate={controls}
      initial={{opacity: 0}}
    >
      <ButtonIcon variant="primary" icon="up" onClick={scrollToTop} />
    </motion.div>
  );
};
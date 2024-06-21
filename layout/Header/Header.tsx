import cn from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { HeaderProps } from "./Header.props";
import styles from './Header.module.css';
import Logo from '../logo.svg';
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';
import Sidebar from '../Sidebar/Sidebar';

const Header = ({className, ...props}: HeaderProps) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const router = useRouter();

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {stiffness: 20},
    },
    closed: {
      opacity: 0,
      x: '100%',
    },
  };

  useEffect(() => {
    setMenuOpened(false);
  }, [router]);

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon
        variant="white"
        icon="menu"
        onClick={() => setMenuOpened(true)}
      />
      <motion.div className={styles.mobileMenu} variants={variants} animate={menuOpened ? 'opened' : 'closed'} initial={"closed"}>
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          variant="white"
          icon="close"
          onClick={() => setMenuOpened(false)}
        />
      </motion.div>
    </header>
  );
};

export default Header;
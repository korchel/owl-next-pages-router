import cn from 'classnames';
import Link from 'next/link';
import { useContext, KeyboardEvent, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';

import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import styles from './Menu.module.css';
import { MenuContext } from '@/context/menu.context';
import { firstLevelMenu } from '@/helpers/helpers';

const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(MenuContext);
  const [secondLevelAnnounce, setSecondLevelAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion ? {} : {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const childrenVariants = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((item) => {
      if (item._id.secondCategory === secondCategory) {
        setSecondLevelAnnounce(item.isOpen ? 'closed' : 'opened')
        item.isOpen = !item.isOpen;
      }
      return item;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => (
    <ul>
      {firstLevelMenu.map((item) => (
        <li key={item.route} aria-expanded={item.id === firstCategory}>
          <Link href={`/${item.route}`}>
            <div className={cn(styles.firstLevel, { [styles.firstLevelActive]: item.id === firstCategory })}>
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
          <ul className={styles.firstLevelBlock}>
            {item.id === firstCategory && buildSecondLevel(item)}
          </ul>
        </li>
      ))}
    </ul>
  );

  const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => menu.map((item) => {
    if (item.pages.map((page) => page.alias).includes(router.asPath.split('/')[2])) {
      item.isOpen = true;
    }
    return (
      <li key={item._id.secondCategory}>
        <button
          onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, item._id.secondCategory)}
          className={styles.secondLevel}
          onClick={() => openSecondLevel(item._id.secondCategory)}
          aria-expanded={item.isOpen}
        >
          {item._id.secondCategory}
        </button>
        <motion.ul
          className={cn(styles.secondLevelBlock)}
          layout
          initial={item.isOpen ? 'visible' : 'hidden'}
          animate={item.isOpen ? 'visible' : 'hidden'}
          variants={variants}
        >
          {item.isOpen && buildThirdLevel(item.pages, firstLevelMenuItem.route, item.isOpen ?? false)}
        </motion.ul>
      </li>
    )
  });
    
  const buildThirdLevel = (pages: PageItem[], route: string, isOpen: boolean) => pages.map((page) => (
    <motion.li
      aria-current={`/${route}/${page.alias}` === router.asPath ? 'page' : false}
      key={page._id}
      variants={childrenVariants}
    >
      <Link
        href={`/${route}/${page.alias}`}
        className={cn(styles.thirdLevel, { [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath })}
        tabIndex={isOpen ? 0 : -1}
      >
        {page.category}
      </Link>
    </motion.li>
  ));

  return (
    <nav className={styles.menu} role="navigation">
      {secondLevelAnnounce && <span role="log" className='visuallyHidden'>{secondLevelAnnounce === 'opened' ? 'развернуто' : 'свернуто'}</span>}
      {buildFirstLevel()}
    </nav>
  );
};

export default Menu;
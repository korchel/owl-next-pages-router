import cn from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';
import { motion } from 'framer-motion';

import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";

import styles from './Menu.module.css';
import { MenuContext } from '@/context/menu.context';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '@/helpers/helpers';



const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(MenuContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((item) => {
      if (item._id.secondCategory === secondCategory) {
        item.isOpen = !item.isOpen;
      }
      return item;
    }))
  };

  const buildFirstLevel = () => firstLevelMenu.map((item) => (
    <div key={item.route}>
      <Link href={`/${item.route}`}>
        <div className={cn(styles.firstLevel, { [styles.firstLevelActive]: item.id === firstCategory })}>
          {item.icon}
          <span>{item.name}</span>
        </div>
      </Link>
      <div className={styles.firstLevelBlock}>
        {item.id === firstCategory && buildSecondLevel(item)}
      </div>
    </div>
  ));

  const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => menu.map((item) => {
    if (item.pages.map((page) => page.alias).includes(router.asPath.split('/')[2])) {
      item.isOpen = true;
    }
    return (
      <div key={item._id.secondCategory}>
        <div className={styles.secondLevel} onClick={() => openSecondLevel(item._id.secondCategory)}>{item._id.secondCategory}</div>
        <motion.div
          className={cn(styles.secondLevelBlock)}
          layout
          initial="hidden"
          animate={item.isOpen ? 'visible' : 'hidden'}
          variants={variants}
        >
          {item.isOpen && buildThirdLevel(item.pages, firstLevelMenuItem.route)}
        </motion.div>
      </div>
    )
  });
    
  const buildThirdLevel = (pages: PageItem[], route: string) => pages.map((page) => (
    <Link href={`/${route}/${page.alias}`} className={cn(styles.thirdLevel, { [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath })} key={page._id}>
      {page.category}
    </Link>
  ));

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
};

export default Menu;
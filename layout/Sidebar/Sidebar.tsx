import cn from 'classnames';

import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css';
import Logo from '../logo.svg';
import Menu from '../Menu/Menu';

const Sidebar = ({className, ...props}: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      sidebar
      <Menu />
    </div>
  );
};

export default Sidebar;
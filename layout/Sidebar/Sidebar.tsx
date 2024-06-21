import cn from 'classnames';

import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css';
import Logo from '../logo.svg';
import Menu from '../Menu/Menu';
import { Search } from '@/components/Search/Search';


const Sidebar = ({className, ...props}: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebarBlock)} {...props}>
      <Logo />
      <Search />
      <Menu />
    </div>
  );
};

export default Sidebar;
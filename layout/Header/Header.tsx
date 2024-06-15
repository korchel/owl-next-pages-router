import cn from 'classnames';

import { HeaderProps } from "./Header.props";
import styles from './Header.module.css';

const Header = ({className, ...props}: HeaderProps) => {
  return (
    <div className={cn(className, styles.header)} {...props}>
      header
    </div>
  );
};

export default Header;
import { HeaderProps } from "./Header.props";

const Header = ({className, ...props}: HeaderProps) => {
  return (
    <div {...props}>
      header
    </div>
  );
};

export default Header;
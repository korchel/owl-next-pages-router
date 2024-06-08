import { FooterProps } from "./Footer.props";

const Footer = ({className, ...props}: FooterProps) => {
  return (
    <div {...props}>
      footer
    </div>
  );
};

export default Footer;
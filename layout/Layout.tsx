import { LayoutProps } from "./Layout.props";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { FunctionComponent } from "react";
import styles from './Layout.module.css';

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header  className={styles.header}/>
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>
        {children}
      </div>
      <Footer  className={styles.footer}/>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  const WithLayoutComponent = (props: T): JSX.Element => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
  return WithLayoutComponent;
};
import { LayoutProps } from "./Layout.props";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { FunctionComponent } from "react";
import styles from './Layout.module.css';
import { IMenuContext, MenuContextProvider } from "@/context/menu.context";
import { UpButton } from "@/components";

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header  className={styles.header}/>
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>
        {children}
      </div>
      <Footer  className={styles.footer}/>
      <UpButton />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IMenuContext>(Component: FunctionComponent<T>) => {
  const WithLayoutComponent = (props: T): JSX.Element => {
    return (
      <MenuContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </MenuContextProvider>

    );
  };
  return WithLayoutComponent;
};
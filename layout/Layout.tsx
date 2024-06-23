import cn from 'classnames';
import { KeyboardEvent, useRef } from 'react';

import { LayoutProps } from "./Layout.props";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { FunctionComponent, useState } from "react";
import styles from './Layout.module.css';
import { IMenuContext, MenuContextProvider } from "@/context/menu.context";
import { UpButton } from "@/components";

const Layout = ({ children }: LayoutProps) => {
  const [skipLinkShow, setSkiplinkShow] = useState<boolean>(); 
  const bodyRef = useRef<HTMLDivElement>(null);
  const skipToContent = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setSkiplinkShow(false);
  }
  return (
    <div className={styles.container}>
      <a
        onFocus={() => setSkiplinkShow(true)}
        onKeyDown={(key: KeyboardEvent) => skipToContent(key)}
        tabIndex={1}
        className={cn(styles.skipLink, {[styles.skipLinkShow]: skipLinkShow})}
      >
        Сразу к содержанию
      </a>
      <Header  className={styles.header}/>
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
        {children}
      </main>
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
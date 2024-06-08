import { LayoutProps } from "./Layout.props";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { FunctionComponent } from "react";

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <div>
          {children}
        </div>
      </div>
      <Footer />
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
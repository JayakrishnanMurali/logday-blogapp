import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="py-8 px-16">
    <Header />
    <div className="mt-12">{props.children}</div>
  </div>
);

export default Layout;

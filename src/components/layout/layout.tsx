import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Header from "./header/header";
import Footer from "./footer/footer";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="layout">
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
}

export default Layout;

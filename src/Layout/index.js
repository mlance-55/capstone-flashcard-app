import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import RootRoutes from "./RootRoutes";
import { BrowserRouter } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <RootRoutes/>
        {/*<NotFound />*/}
      </div>
    </>
  );
}

export default Layout;

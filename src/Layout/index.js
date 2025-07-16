import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import RootRoutes from "./RootRoutes";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <RootRoutes/>
        <NotFound />
      </div>
    </>
  );
}

export default Layout;

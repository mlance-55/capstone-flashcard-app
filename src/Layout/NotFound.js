import React from "react";
import {Link} from "react-router-dom"

function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <Link className="btn" to="/">Return Home</Link>
    </div>
  );
}

export default NotFound;

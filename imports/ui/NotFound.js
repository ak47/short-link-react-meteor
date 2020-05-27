import React from "react";
import { Link } from "react-router";

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Existing</h1>
        <p>we is unable to locate de page </p>
        <Link to="/" className="button button--link">
          head home
        </Link>
      </div>
    </div>
  );
};

import React from "react";
import { Accounts } from "meteor/accounts-base";

// stateless functional component -> presentation component
const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button
          onClick={() => Accounts.logout()}
          className="button button--link-text"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default PrivateHeader;

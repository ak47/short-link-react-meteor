import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, browserHistory } from "react-router";

import Signup from "./../ui/Signup";
import Link from "./../ui/Link";
import Login from "./../ui/Login";
import NotFound from "./../ui/NotFound";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace("/links");
  }
};
const onEnterPrivatePage = () => {
  console.log("primate page", !!Meteor.userId());
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  console.log("isAuthenticated", isAuthenticated);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace("/");
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />

    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />

    <Route path="*" component={NotFound} />
  </Router>
);

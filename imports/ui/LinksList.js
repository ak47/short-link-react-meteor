import React from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import FlipMove from "react-flip-move";

import { Links } from "../api/links";
import LinksListItem from "./LinksListItem";

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe("linksPub");
      const links = Links.find(
        { visible: Session.get("showVisible") },
        { sort: { url: 1 } }
      ).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    console.log("component did uNmounty LInksList");
    this.linksTracker.stop();
  }
  renderLinkListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__state-message">No links found ;-()</p>
        </div>
      );
    } else {
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
      });
    }
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>{this.renderLinkListItems()}</FlipMove>
      </div>
    );
  }
}

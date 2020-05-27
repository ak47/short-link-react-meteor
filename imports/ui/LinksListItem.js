import React from "react";
import Clipboard from "clipboard";
import moment from "moment";

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard
      .on("success", (e) => {
        this.setState({ justCopied: true });
        setTimeout(() => {
          this.setState({ justCopied: false });
        }, 400);
      })
      .on("error", () => {
        alert("Unable to copy. manual copy suckker!");
      });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderButtonText() {
    return this.state.justCopied ? ".copied" : ".copy";
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? "visit" : "visits";
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === "number") {
      visitedMessage = `(visited ${moment(
        this.props.lastVisitedAt
      ).fromNow()})`;
    }

    return (
      <p className="item__message">
        {this.props.visitedCount} {visitMessage} {visitedMessage}
      </p>
    );
  }
  render() {
    return (
      <div key={this.props._id} className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <div>
          <a
            href={this.props.shortUrl}
            target="_new"
            className="button button--pill button--link"
          >
            .visit
          </a>
          <button
            ref="copy"
            data-clipboard-text={this.props.shortUrl}
            className="button button--pill"
          >
            {this.renderButtonText()}
          </button>
          <button
            onClick={() => {
              Meteor.call(
                "links.setVisibility",
                this.props._id,
                !this.props.visible
              );
            }}
            ref="hide"
            className="button button--pill"
          >
            {this.props.visible ? ".hide" : ".unhide"}
          </button>
        </div>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: React.PropTypes.string.isRequired,
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number,
};

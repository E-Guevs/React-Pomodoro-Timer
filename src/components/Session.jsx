import React, { Component } from "react";

export default class Session extends Component {
  render() {
    return (
      <div className="settings-container">
        <div id="session-label" className="settings-label">
          Session Length
        </div>
        <div className="settings">
          <div
            id="session-decrement"
            className="button"
            onPointerUp={this.props.decrementSession}>
            <i className="fa-solid fa-minus"></i>
          </div>
          <div id="session-length" className="activity-length">
            {this.props.sessionDefault}
          </div>
          <div
            id="session-increment"
            className="button"
            onPointerUp={this.props.incrementSession}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    );
  }
}

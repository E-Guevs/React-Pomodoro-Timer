import React, { Component } from "react";

export default class Break extends Component {
  render() {
    return (
      <div className="settings-container">
        <div id="break-label" className="settings-label">
          Break Length
        </div>
        <div className="settings">
          <div
            id="break-decrement"
            className="button"
            onPointerDown={this.props.decrementBreak}>
            <i className="fa-solid fa-minus"></i>
          </div>
          <div id="break-length" className="activity-length">
            {this.props.breakDefault}
          </div>
          <div
            id="break-increment"
            className="button"
            onPointerDown={this.props.incrementBreak}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    );
  }
}

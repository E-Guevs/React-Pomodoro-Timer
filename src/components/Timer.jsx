import React, { Component } from "react";
import formatTimer from "../formatTimer";

export default class Timer extends Component {
  render() {
    return (
      <div id="timer-container">
        <div id="progress-bar" style={{ background: this.props.background }}>
          <div id="timer-label-container">
            <div id="timer-label">{this.props.timerLabel}</div>
            <div id="time-left">{formatTimer(this.props.timeLeft)}</div>
          </div>
        </div>
        <div id="play-nav">
          <div
            id="start_stop"
            className="button"
            onPointerUp={this.props.start}>
            <i className={this.props.startIcon}></i>
          </div>
          <div id="reset" className="button" onPointerUp={this.props.reset}>
            <i className="fa-solid fa-rotate-right"></i>
          </div>
        </div>
      </div>
    );
  }
}

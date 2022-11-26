import React, { Component } from "react";
import formatTimer from "../functions/formatTimer";

export default class Timer extends Component {
  render() {
    return (
      <div id="timer-container">
        <div id="progress-bar-container">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle className="progress-border"></circle>
          </svg>
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ animation: this.props.glow }}>
            <circle
              className="progress-border"
              id="progress-bar"
              style={{
                animation: this.props.animation,
                animationPlayState: this.props.animationPlayState,
              }}></circle>
          </svg>
          <div id="timer-label-container">
            <div id="timer-label">{this.props.timerLabel}</div>
            <div id="time-left">{formatTimer(this.props.timeLeft)}</div>
          </div>
        </div>
        <div id="play-nav">
          <div
            id="start_stop"
            className="button"
            onPointerDown={this.props.start}>
            <i className={this.props.startIcon}></i>
          </div>
          <div id="reset" className="button" onPointerDown={this.props.reset}>
            <i className="fa-solid fa-rotate-right"></i>
          </div>
        </div>
      </div>
    );
  }
}

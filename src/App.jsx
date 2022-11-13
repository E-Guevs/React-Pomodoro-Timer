import React, { Component } from "react";
import Timer from "./components/Timer";
import Session from "./components/Session";
import Break from "./components/Break";
import { initialState } from "./initialState";
import electricAlarmBeep from "./Electric-Alarm-Beep.mp3"; 

export default class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    let initialTouchY;

    document.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        initialTouchY = e.changedTouches[0].clientY;
      },
      { passive: false }
    );

    document.addEventListener(
      "touchmove",
      (e) => {
        let updatedTouchY = e.changedTouches[0].clientY;
        let scrollDistance = initialTouchY - updatedTouchY;
        window.scrollBy(0, scrollDistance);
        initialTouchY = updatedTouchY;
      },
      { passive: false }
    );
  }

  decrementSession() {
    if (this.state.timerRunning === true) return;

    this.setState({
      sessionDefaultLength:
        this.state.sessionDefaultLength > 1
          ? this.state.sessionDefaultLength - 1
          : this.state.sessionDefaultLength,
      timeLeft:
        this.state.timeLeft > 60
          ? this.state.timeLeft - 60
          : this.state.timeLeft,
    });
  }

  incrementSession() {
    if (this.state.timerRunning === true) return;

    this.setState({
      sessionDefaultLength:
        this.state.sessionDefaultLength < 60
          ? this.state.sessionDefaultLength + 1
          : this.state.sessionDefaultLength,
      timeLeft:
        this.state.timeLeft < 3600
          ? this.state.timeLeft + 60
          : this.state.timeLeft,
    });
  }

  decrementBreak() {
    if (this.state.timerRunning === true) return;

    this.setState({
      breakDefaultLength:
        this.state.breakDefaultLength > 1
          ? this.state.breakDefaultLength - 1
          : this.state.breakDefaultLength,
    });
  }

  incrementBreak() {
    if (this.state.timerRunning === true) return;

    this.setState({
      breakDefaultLength:
        this.state.breakDefaultLength < 60
          ? this.state.breakDefaultLength + 1
          : this.state.breakDefaultLength,
    });
  }

  start() {
    const beep = document.getElementById("beep");
    this.setState({
      timerRunning: !this.state.timerRunning,
      startIconClass:
        this.state.timerRunning === true
          ? "fa-solid fa-play"
          : "fa-solid fa-pause",
      interval:
        this.state.timerRunning === true
          ? clearInterval(this.state.interval)
          : setInterval(() => {
              if (this.state.timeLeft === 1) beep.play();

              this.setState({
                onSession:
                  this.state.timeLeft === 0
                    ? this.state.onSession === true
                      ? false
                      : true
                    : this.state.onSession,
                timerLabel:
                  this.state.timeLeft === 0
                    ? this.state.onSession === true
                      ? "Break"
                      : "Session"
                    : this.state.timerLabel,
                timeLeft:
                  this.state.timeLeft === 0
                    ? this.state.onSession === true
                      ? this.state.breakDefaultLength * 60
                      : this.state.sessionDefaultLength * 60
                    : this.state.timeLeft - 1,
              });
            }, 1000),
      progress:
        this.state.timerRunning === true
          ? clearInterval(this.state.progress)
          : setInterval(() => {
              let initialProgress = this.state.initialProgress,
                finalProgress =
                  this.state.onSession === true
                    ? this.state.sessionDefaultLength * 60 * 250
                    : this.state.breakDefaultLength * 60 * 250;

              this.setState({
                initialProgress:
                  this.state.timeLeft === 0
                    ? 0
                    : this.state.initialProgress + 1,
                progressBarBackground:
                  this.state.timeLeft === 0
                    ? "aqua"
                    : `conic-gradient(aqua ${
                        (initialProgress / finalProgress) * 360
                      }deg, #455A64 ${
                        (initialProgress / finalProgress) * 360
                      }deg)`,
              });
            }, 1),
    });
  }

  reset() {
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
    this.setState(initialState);
    clearInterval(this.state.interval);
    clearInterval(this.state.progress);
  }

  render() {
    return (
      <div>
        <h1>POMODORO TIMER</h1>
        <Timer
          timerLabel={this.state.timerLabel}
          timeLeft={this.state.timeLeft}
          start={this.start}
          startIcon={this.state.startIconClass}
          reset={this.reset}
          background={this.state.progressBarBackground}
        />
        <div id="settings-grid">
          <Session
            sessionDefault={this.state.sessionDefaultLength}
            decrementSession={this.decrementSession}
            incrementSession={this.incrementSession}
          />
          <Break
            breakDefault={this.state.breakDefaultLength}
            decrementBreak={this.decrementBreak}
            incrementBreak={this.incrementBreak}
          />
        </div>
        <audio
          id="beep"
          src={electricAlarmBeep}
          preload="auto"
          type="audio/mp3"></audio>
      </div>
    );
  }
}

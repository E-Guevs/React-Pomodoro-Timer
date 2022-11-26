import React, { Component } from "react";
import Timer from "./components/Timer";
import Session from "./components/Session";
import Break from "./components/Break";
import { initialState } from "./initialState";
import addButtonEffects from "./functions/addButtonEffects";
import electricAlarmBeep from "./Electric-Alarm-Beep.mp3";

let currentActivityCount = 0,
  newActivityCount = 0,
  percentTimeLeft;

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

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: COMPONENT DID MOUNT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  componentDidMount() {
    function preventDefaultTouchAction(e) {
      e.preventDefault();
    }
    document.addEventListener("touchstart", preventDefaultTouchAction, {
      passive: false,
    });
    document.addEventListener("load", addButtonEffects("button"));

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible")
        percentTimeLeft = this.state.timeLeft / this.state.duration;

      if (
        document.visibilityState === "visible" &&
        currentActivityCount !== newActivityCount &&
        this.state.timerRunning === true
      ) {
        this.setState({
          duration: this.state.timeLeft,
          animation: `throttledProgress ${this.state.duration}s linear forwards`,
        });

        setTimeout(() => {
          this.setState({
            animation:
              this.state.onSession === true
                ? percentTimeLeft <= 0.66
                  ? `sessionProgress ${
                      this.state.duration * (29 / 30)
                    }s cubic-bezier(0, ${1 - percentTimeLeft}, 0, ${
                      1 - percentTimeLeft
                    }) forwards`
                  : `sessionProgress ${
                      this.state.duration * (29 / 30)
                    }s linear forwards`
                : percentTimeLeft <= 0.66
                ? `breakProgress ${
                    this.state.duration * (29 / 30)
                  }s cubic-bezier(0, ${1 - percentTimeLeft}, 0, ${
                    1 - percentTimeLeft
                  }) forwards`
                : `breakProgress ${
                    this.state.duration * (29 / 30)
                  }s linear forwards`,
          });
        }, 10);

        setTimeout(() => {
          currentActivityCount = newActivityCount;
        }, 20);
      }
    });
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: COMPONENT DID MOUNT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: DECREMENT SESSION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  decrementSession() {
    if (this.state.timerRunning === true && this.state.onSession === true)
      return;

    this.setState({
      sessionDefaultLength:
        this.state.sessionDefaultLength > 1
          ? this.state.sessionDefaultLength - 1
          : this.state.sessionDefaultLength,
      timeLeft:
        this.state.onSession === true
          ? this.state.timeLeft > 60
            ? this.state.timeLeft - 60
            : this.state.timeLeft
          : this.state.timeLeft,
      duration:
        this.state.onSession === true
          ? this.state.timeLeft > 60
            ? this.state.duration - 60
            : this.state.duration
          : this.state.duration,
      animation:
        this.state.onSession === true
          ? this.state.timeLeft > 60
            ? this.state.timerRunning === true
              ? `sessionProgress ${
                  this.state.duration - 60
                }s linear forwards running`
              : `sessionProgress ${
                  this.state.duration - 60
                }s linear forwards paused`
            : this.state.animation
          : this.state.animation,
    });
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: DECREMENT SESSION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: INCREMENT SESSION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  incrementSession() {
    if (this.state.timerRunning === true && this.state.onSession === true)
      return;

    this.setState({
      sessionDefaultLength:
        this.state.sessionDefaultLength < 60
          ? this.state.sessionDefaultLength + 1
          : this.state.sessionDefaultLength,
      timeLeft:
        this.state.onSession === true
          ? this.state.timeLeft < 3600
            ? this.state.timeLeft + 60
            : this.state.timeLeft
          : this.state.timeLeft,
      duration:
        this.state.onSession === true
          ? this.state.timeLeft < 3600
            ? this.state.duration + 60
            : this.state.duration
          : this.state.duration,
      animation:
        this.state.onSession === true
          ? this.state.timeLeft < 3600
            ? this.state.timerRunning === true
              ? `sessionProgress ${
                  this.state.duration + 60
                }s linear forwards running`
              : `sessionProgress ${
                  this.state.duration + 60
                }s linear forwards paused`
            : this.state.animation
          : this.state.animation,
    });
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: INCREMENT SESSION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: DECREMENT BREAK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  decrementBreak() {
    if (this.state.timerRunning === true && this.state.onSession === false)
      return;

    this.setState({
      breakDefaultLength:
        this.state.breakDefaultLength > 1
          ? this.state.breakDefaultLength - 1
          : this.state.breakDefaultLength,
      timeLeft:
        this.state.onSession === false
          ? this.state.timeLeft > 60
            ? this.state.timeLeft - 60
            : this.state.timeLeft
          : this.state.timeLeft,
      duration:
        this.state.onSession === false
          ? this.state.timeLeft > 60
            ? this.state.duration - 60
            : this.state.duration
          : this.state.duration,
      animation:
        this.state.onSession === false
          ? this.state.timeLeft > 60
            ? this.state.timerRunning === true
              ? `breakProgress ${
                  this.state.duration - 60
                }s linear forwards running`
              : `breakProgress ${
                  this.state.duration - 60
                }s linear forwards paused`
            : this.state.animation
          : this.state.animation,
    });
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: DECREMENT BREAK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: INCREMENT BREAK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  incrementBreak() {
    if (this.state.timerRunning === true && this.state.onSession === false)
      return;

    this.setState({
      breakDefaultLength:
        this.state.breakDefaultLength < 60
          ? this.state.breakDefaultLength + 1
          : this.state.breakDefaultLength,
      timeLeft:
        this.state.onSession === false
          ? this.state.timeLeft < 3600
            ? this.state.timeLeft + 60
            : this.state.timeLeft
          : this.state.timeLeft,
      duration:
        this.state.onSession === false
          ? this.state.timeLeft < 3600
            ? this.state.duration + 60
            : this.state.duration
          : this.state.duration,
      animation:
        this.state.onSession === false
          ? this.state.timeLeft < 3600
            ? this.state.timerRunning === true
              ? `breakProgress ${
                  this.state.duration + 60
                }s linear forwards running`
              : `breakProgress ${
                  this.state.duration + 60
                }s linear forwards paused`
            : this.state.animation
          : this.state.animation,
    });
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: INCREMENT BREAK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: START() METHOD~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  start() {
    const beep = document.getElementById("beep");
    this.setState({
      timerRunning: !this.state.timerRunning,
      startIconClass:
        this.state.timerRunning === true
          ? "fa-solid fa-play"
          : "fa-solid fa-pause",
      initialized: true,

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: INTERVAL~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      interval:
        // IF
        this.state.initialized === false
          ? // START OF SET INTERVAL
            setInterval(() => {
              // START OF IF THE TIMER IS RUNNING
              if (this.state.timerRunning === true) {
                if (this.state.timeLeft === 1) beep.play();

                if (this.state.timeLeft === 0) newActivityCount++;
                if (
                  this.state.timeLeft === 0 &&
                  document.visibilityState === "visible"
                )
                  currentActivityCount++;

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
                  duration:
                    this.state.timeLeft === 0
                      ? this.state.onSession === true
                        ? this.state.breakDefaultLength * 60
                        : this.state.sessionDefaultLength * 60
                      : this.state.duration,
                  animation:
                    this.state.timeLeft === 0
                      ? this.state.onSession === true
                        ? `breakProgress ${
                            this.state.breakDefaultLength * 60
                          }s linear forwards`
                        : `sessionProgress ${
                            this.state.sessionDefaultLength * 60
                          }s linear forwards`
                      : this.state.animation,
                });
              }
              // END OF IF THE TIMER IS RUNNING
            }, 1000)
          : // END OF SET INTERVAL
            // ELSE
            this.state.interval,
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: INTERVAL~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      animation:
        this.state.initialized === false
          ? `sessionProgress ${this.state.duration}s linear forwards`
          : this.state.animation,
      animationPlayState:
        this.state.timerRunning === true ? "paused" : "running",
      glow: "glow 1s ease-out infinite alternate",
    });
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: START() METHOD~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: RESET~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  reset() {
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
    this.setState(initialState);
    clearInterval(this.state.interval);
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: RESET~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~START: RENDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
          animation={this.state.animation}
          animationPlayState={this.state.animationPlayState}
          glow={this.state.glow}
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

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~END: RENDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
}

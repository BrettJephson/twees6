"use strict";

class Tween {
  constructor(property) {
    this.property = property;
    this.isRunning = false;
    this.startValue = 0.0;
    this.endValue = 0.0;
    this.easingFunction = (t,b,c,d) => { return 0; }
    this.timeStartedAt;
    this.engine;
  }
  start() {
    return new Promise((resolve, reject) => {
      if(this.isRunning) { reject("Tween already running"); }
      this.isRunning = true;
      this.property = this.startValue;
      this.timeStartedAt = Date.now();
      this.updateInterval = setInterval(() => {
        var time = Date.now() - this.timeStartedAt;
        if(time >= this.duration) {
          this.property = this.endValue;
          clearInterval(this.updateInterval);
          this.isRunning = false;
          this.updateCallback = null;
          resolve(this.property);
        }
        this.property = this.easingFunction(time, this.startValue, this.endValue - this.startValue, this.duration);
        if(this.updateCallback) { this.updateCallback(this.property); }
      }, 16);
    });
  }
  to(value) {
    this.endValue = value;
    return this;
  }
  from(value) {
    this.startValue = value;
    return this;
  }
  timing(duration, easingFunction) {
    this.duration = duration;
    this.easingFunction = easingFunction;
    return this;
  }
  tick(updateCallback) {
    this.updateCallback = updateCallback;
    return this;
  }
}

export {Tween};

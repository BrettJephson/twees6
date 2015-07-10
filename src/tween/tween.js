"use strict";

class Tween {
  constructor(property) {
    this.isRunning = false;
    this.startValue = property;
    this.endValue = property;
    this.easingFunction = (t,b,c,d) => { return 0; };
    this.timeStartedAt;
    this.engine;
  }
  start() {
    function* step(startValue, endValue, duration, easingFunction) {
      let startTime = Date.now();
      let currentTime = 0;
      while(currentTime < duration) {
        currentTime = Date.now() - startTime;
        yield easingFunction(currentTime, startValue, endValue - startValue, duration);
      }
    }

    return new Promise((resolve, reject) => {
      if(this.isRunning) { reject("Tween already running"); }
      this.isRunning = true;

      var stepGen = step(this.startValue, this.endValue, this.duration, this.easingFunction);

      this.updateInterval = setInterval(() => {
        var stepResult = stepGen.next();
        if(stepResult.done) {
          this.end(stepResult);
          resolve(this.endValue);
        }
        else {
          if(this.updateCallback) {
            this.updateCallback(stepResult.value);
          }
        }
      }, 16);
    });
  }
  end() {
    clearInterval(this.updateInterval);
    this.isRunning = false;
    this.updateCallback = null;
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

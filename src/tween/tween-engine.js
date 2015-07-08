"use strict";

import {Tween} from "./tween";

class TweenEngine {
  constructor() {
    this.tweens = [];
    this.updateInterval;
    return this;
  }
  create(property) {
    var tween = new Tween(property);
    tween.engine = this;
    this.tweens.push(tween);
    return tween;
  }
}

export default new TweenEngine();

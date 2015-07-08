"use strict";

import tween from './tween/tween-engine';
import pkg from 'package.json!';

const VERSION = pkg.version;

var x;
var y;

var tweenX = tween.create(x);
var tweenY = tween.create(y);

var linearEasing = (t, b, c, d) => { return c * t / d + b; };

tweenY
  .from(5.0)
  .to(10.0)
  .timing(500, linearEasing);

tweenX
  .from(0.0)
  .to(1.0)
  .timing(1000, linearEasing)
  .tick((v) => { console.log(v); })
  .start()
  .then(function(v) {
    console.log(v);
    tweenY
      .tick((u) => { console.log(u); })
      .start()
      .then(function(w) { console.log(w); });
  });

export { VERSION };

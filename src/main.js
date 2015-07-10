"use strict";

import tween from './tween/tween-engine';
import pkg from 'package.json!';

const VERSION = pkg.version;

var x = 0;
var y = 0;

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
  .tick((v) => { log(`tweenX: ${v}`); })
  .start()
  .then(function(v) {
    log(`tweenX finished: ${v}`);
    tweenY
      .tick((v) => { log(`tweenY: ${v}`); })
      .start()
      .then((v) => { log(`tweenY finished: ${v}`); });
  });

var a = 0, b = 1, c = 2;

var tween1 = tween.create(a),
    tween2 = tween.create(b),
    tween3 = tween.create(c);

function log(msg) {
  console.log(msg);
}

tween1.to(b).timing(110, linearEasing).tick(log);
tween2.to(c).timing(120, linearEasing);
tween3.to(c+1).timing(130, linearEasing);

Promise.all([tween1.start().then(log), tween2.start().then(log), tween3.start().then(log)]);
export { VERSION };

'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        modal = require('./modules/modal'),
        postToServer = require('./modules/post-to-server'),
        cards = require('./modules/cards'),
        slider = require('./modules/slider'),
        calc = require('./modules/calc');

  tabs();
  timer();
  modal();
  postToServer();
  calc();
  cards();
  slider();
});
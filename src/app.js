var template;
define(['d3', 'Display', 'Feeder'], function(d3, Viz, Feeder){
  'use strict';

  var container = d3.select('body').append('div').node();

  template = new Viz({
    el: container
  });
  template.init();

  new Feeder(template.update, [
    function(r, i, arr){ return r*1000; },
    function(r, i, arr){ return arr[0] + r*10; },
    function(r, i, arr){ return r*10; }
  ], 1000 );
});

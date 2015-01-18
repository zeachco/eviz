var template;
var exampleOptions = {
  debug: {
    /* no options */
  }
};

define(['d3', 'Display', 'Feeder'], function(d3, Viz, Feeder){
  'use strict';

  var container = d3.select('body').append('div').node();

  template = new Viz({
    el: container
  });
  template.init();


  function showView(plugin){
    require([plugin], function(plugin){
      plugin.init(exampleOptions[plugin]);
    });
  }

  new Feeder({
    speed: 1000,
    len: 1000,
    onData: function(data){
      template.update(data.filter(function(d, i){
        return i % Math.ceil(Math.random()*500) === 0;
      }));
    },
    maps: [
      function(r, i, arr){ return Feeder.alpha(8); },
      function(r, i, arr){ return r*1000; },
      function(r, i, arr){ return arr[1] + r*10; },
      function(r, i, arr){ return r*10; }
    ]
  });

});

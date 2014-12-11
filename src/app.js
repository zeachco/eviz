var template;
define(['d3', 'Display'], function(d3, Viz){
  'use strict';

  var container = d3.select('body').append('div').node();

  template = new Viz({
    el: container
  });
  template.init();

  function feed(){
    var data = d3.range(50)
      .filter(function(d){
        var r = Math.ceil(Math.random()*10);
        return d % r === 0;
      })
      .map(function(d){
        return { index: d, r: Math.random()*100 };
      })
    ;
    template.update(data);
    setTimeout(feed, 1750);
  }
  feed();
});

define(['d3', 'VizTemplate'], function(d3, VizTemplate){
  'use strict';
  console.log(d3.version);
  d3.select('body').append('div');
  var t = new VizTemplate();
  t.update(d3.range(100).map(function(d){return {index: d, r: Math.random()*100};}));
});

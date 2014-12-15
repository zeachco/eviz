define(['d3'], function(d3){
  'use strict';
  return function Feeder(func, maps, length){
    length = length || 1000;
    var data = d3.range(length);
    maps = maps || [];
    data.map(function(d, i){
      var arr = [];
      maps.forEach(function(f, i){
        arr[i] = f(Math.random(), i);
      });
      return arr;
    });
    func(data);
  };
});

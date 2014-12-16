define(['d3'], function(d3){
  'use strict';
  return function Feeder(func, maps, len, speed){
    speed = speed || 1000;
    var data = [];

    function feed(){
      data = d3.range(len);
      len = len || 1000;
      maps = maps || [];
      data = data.map(function(d, i){
        var arr = [];
        maps.forEach(function(f, i){
          arr[i] = f(Math.random(), i, arr);
        });
        return arr;
      });
      func(data);

      setTimeout(feed, speed);
    }
    feed();
  };
});

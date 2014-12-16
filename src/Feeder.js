define(['d3'], function(d3){
  'use strict';
  function Feeder(opts){
    var onData = opts.onData || function(data){ console.log(data); };
    var maps = opts.maps || [];
    var len = opts.len || 1000;
    var speed = opts.speed || 1000;
    function feed(){
      var data = d3.range(len);
      data = data.map(function(d, i){
        var arr = [];
        maps.forEach(function(f, i){
          arr[i] = f(Math.random(), i, arr);
        });
        return arr;
      });
      onData(data);
      setTimeout(feed, speed);
    }
    feed();
  }
  Feeder.alpha = function(len){
    var a = 'abcdefghijklmnopqrstuvwxyz0123456789'  ;
    var str = '';
    for(var i = 0; i<len; i++){
      str += a[Math.floor(Math.random()*a.length)];
    }
    return str;
  };
  return Feeder;
});

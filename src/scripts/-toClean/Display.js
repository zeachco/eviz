define(['Visualization'], function(Visualization){
  function VizTemplate(){
    var self = this;
    var animSpeed = 500;
    var animDelay = function(d, i){return Math.random()*30*i ;};
    self._init = function(){
      self.container = d3.select(self.el).append('div');
    };

    self._update = function(){
      var dataset = self.container.selectAll('p').data(self.data);


      dataset
        .transition().duration(animSpeed).delay(animDelay)
        .style('opacity', '1')
        .style('color', '#48f')
      ;

      dataset.enter()
        .append('p')
        .style('opacity', '0')
        .style('color', '#0f0')
        .transition().duration(animSpeed).delay(animDelay)
        .style('opacity', '1')
        .style('color', '#4f4')
      ;

      dataset.html(function(d){ return JSON.stringify(d); });

      dataset.exit()
        .transition().duration(animSpeed).delay(animDelay)
        .style('opacity', '0.75')
        .style('color', '#f44')
        .remove()
      ;
    };

  }
  VizTemplate.prototype = new Visualization();
  return VizTemplate;
});

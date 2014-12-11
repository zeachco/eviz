define(['Vizualisation'], function(Vizualisation){
  function VizTemplate(){
    var self = this;

    self._init = function(){
      self.container = d3.select(self.el).append('div');
    };

    self._update = function(){
      var dataset = self.container.selectAll('pre').data(self.data);
      dataset.enter().append('pre');
      dataset.exit().remove();
      dataset.html(function(d){
        return JSON.stringify(d);
      });
    };
    
  }
  VizTemplate.prototype = new Vizualisation();
  return VizTemplate;
});

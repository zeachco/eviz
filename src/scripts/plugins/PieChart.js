define(['d3'], function(d3){
  return function PieChart(){
    var self = this;

    self._init = function(){
      self.container = d3.select(self.el).append('div');
    };

    self._update = function(){
      console.log(self.data, self, this);
      var dataset = self.container.selectAll('pre').data(self.data);
      dataset.enter().append('pre');
      dataset.exit().remove();
      dataset.html(function(d){
        return JSON.stringify(d);
      });
    };
  };
});

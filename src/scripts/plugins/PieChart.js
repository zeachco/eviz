define(['d3'], function(d3){
  return function PieChart(){
    var self;
    this._init = function(){
      self = this;
      self.container = d3.select(self.el).append('div');
    };

    this._update = function(){
      console.log(self.data);
      var dataset = self.container.selectAll('pre').data(self.data);
      dataset.enter().append('pre');
      dataset.exit().remove();
      dataset.html(function(d){
        return JSON.stringify(d);
      });
    };
  };
});

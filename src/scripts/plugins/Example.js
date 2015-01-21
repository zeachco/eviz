define(['d3'], function(d3){
  return function Example(){
    var self;
    this._init = function(){
      self = this;
      self.container = d3.select(self.el).append('div');
      self.container.append('h1').html('This is an example');
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

define(['d3'], function(d3){
  return function PieChart(){
    var self, viz;

    var w = 400;
    var h = 400;
    var r = h/2;

    var color = d3.scale.category20c();
    var arc = d3.svg.arc()
      .outerRadius(r)
      .innerRadius(r/2);

    this.options = {
      label: function(d, i){ return ''+d[0]; },
      map: function(d){ return +d[1]; },
      fill: function(d, i){ return color(i);}
    };

    this._init = function(){
      self = this;
      self.container = d3.select(self.el).append('div');

      self.container.append('h3').attr('class','well').html('Ok i\'m working on that one...');
      self.info = self.container.append('p').attr('class','well').html('mouse over to view data...');
      vis = self.container.append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")")
      ;

    };

    this._update = function(){
      var pie = d3.layout.pie().value(self.options.map);
      var arcsSet = vis.selectAll("g.slice").data(pie(self.data));

      var arcIn = arcsSet.enter().append("svg:g").attr("class", "slice");
      arcIn.append('path');
      arcIn.append('text');
      arcsSet.exit().remove();

      arcsSet.select('path')
        .on('mouseover', function(d, i){
          self.info.html(self.options.label(d.data, i) + ': ' + self.options.map(d.data, i));
        })
        .transition().duration(self.options.animTime)
        .attr("fill", self.options.fill)
        .attr("d", arc)
      ;
/*
      arcsSet.select("text")
        .attr("transform", function(d){
          d.innerRadius = 0;
          d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle").text( function(d, i) {

        })
      ;
*/
    };
  };
});

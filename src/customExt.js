define(['d3'], function(d3){
  'use strict';
  function CustomExt(){
    this.param = function(opt){
      opt = opt || {};
      this.options = this.options || {};
      for(var n in opt){
      	this.options[n] = opt[n] || this.options[n];
      }
    };
    this.paramRequire = function(func){
      this.options[func] = this.options[func] || function(){
        console.warn('required method '+func+' is not defined');
      };
    };
    this.init = function(){ console.error('this.init is required'); };
    this.render = function(){ console.error('this.render is required'); };
    this.build = function(el, opt){
      var self = this;
      this.data = [];
      this.el = el || this.el || document.body;
      this.initiated = true;
      this.param(opt);
      window.addEventListener('resize', function(){
        if(self.dirtyTO){
          clearTimeout(self.dirtyTO);
        }
        self.dirtyTO = setTimeout(self._update, 200);
      });
    };
    this.update = function(data){
      this.data = data || this.data || [];
      if(!this.initiated){ throw 'plugin not initiated before updating'; }
    };
  }
});

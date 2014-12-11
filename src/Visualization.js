define(['d3'], function(d3){
  'use strict';
  return function Visualization(){
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
    this._init = function(){ console.error('this._init is required'); };
    this._update = function(){ console.error('this._update is required'); };
    this.init = function(el, opt){
      this.data = [];
      this.el = el || this.el || document.body;
      this.initiated = true;
      this.param(opt);
      var self = this;
      window.addEventListener('resize', function(){
        self.setDirty();
      });
      this._init();
    };
    this.setDirty = function(){
      if(this.dirtyTO){ clearTimeout(this.dirtyTO); }
      this.dirtyTO = setTimeout(this._update, 200);
    };
    this.update = function(data){
      this.data = data || this.data || [];
      if(!this.initiated){ throw 'plugin not initiated before updating'; }
      this.setDirty();
    };
  };
});

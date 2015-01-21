// default object
window.eviz = {
  base: {},
  plugins: {},
  pluginsPath: './plugins/'
};

// permit to configure eviz globals
eviz.config = function(opts){
  eviz.pluginsPath = opts.pluginsPath || opts.plugins|| eviz.pluginsPath;
};

// Create plugin with AMD if require loaded
eviz.create = function(load){

  if(eviz.plugins[load] === 'function'){
    return new eviz.plugins[load]();
  }else{
    if(typeof require !== 'function'){
      throw load + ' is not part of eviz';
    }else{

      var holds = [];
      var Temp = function (){
        function queue(f, a){ holds.push({func: f, args: a}); }
        this.config = function config(){ queue('config', arguments); };
        this.init = function init(){ queue('init', arguments); };
        this.update = function update(){ queue('update', arguments); };
      };

      var proxy = new Temp();

      require([eviz.pluginsPath + load], function(Loaded){
        Loaded.prototype = eviz.base;

        eviz.plugins[load] = Loaded;

        var obj = new eviz.plugins[load]();

        for (var attr in obj) {
          if(obj.hasOwnProperty(attr) ){
            proxy[attr] = obj[attr];
          }
        }
        holds.forEach(function(f){
          console.log(f);
          proxy[f.func].apply(f.args);
        });
      });
      return proxy;
    }
  }

  return create;
  if(!eviz.plugins[load]){
    if(typeof require === 'function'){
      require([eviz.pluginsPath + load], function(Loaded){
        Loaded.prototype = eviz.base;
        eviz.plugins[load] = Loaded;
        tempHolder = new Loaded();
        holded.forEach(function(d){
          tempHolder[d.func].apply(d.args);
        });
        tempHolder.prototype = eviz.base;
      });
      return tempHolder;
    }else{
    }
  }else{
    return new eviz[load]();
  }
};

// base prototype
eviz.base.paramRequire = function(func){
  this.options[func] = this.options[func] || function(){
    console.warn('required method '+func+' is not defined');
  };
};

eviz.tempBase = function(){

  this.init = function(){
    console.log(arguments);
  };

  this.param = function(opt){
    opt = opt || {};
    this.options = this.options || {};
    for(var n in opt){
      this.options[n] = opt[n] || this.options[n];
    }
  };

  this.config = function(opt){
    this.param(opt);
    this.init(opt);
    return this;
  };
};
eviz.tempBase.prototype = eviz.base;

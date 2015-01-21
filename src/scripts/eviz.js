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
      var messages = [];
      // create an answering maachine while real object load
      var AnsweringMachine = function(){
        function queue(f, a){ messages.push({func: f, args: a}); }
        this.config = function(){ queue('config', arguments); };
        this.init = function(){ queue('init', arguments); };
        this.update = function(){ queue('update', arguments); };
        this.turnOff = function(){
          delete this.config;
          delete this.init;
          delete this.update;
          delete this.turnOff;
        };
      };
      AnsweringMachine.prototype = eviz.base;
      var aMachine = new AnsweringMachine();
      require([eviz.pluginsPath + load], function(Loaded){
        Loaded.prototype = eviz.base;
        // cache for next time
        eviz.plugins[load] = Loaded;
        // create real object once loaded
        var obj = new eviz.plugins[load]();
        // remove "answering machine"
        aMachine.turnOff();
        // copy attributes from real object
        for (var attr in obj) {
          if(obj.hasOwnProperty(attr) ){
            aMachine[attr] = obj[attr];
          }
        }
        // apply calls in order
        messages.forEach(function(f){
          aMachine[f.func].apply(f.args);
        });
      });
      return aMachine;
    }
  }
  return create;
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

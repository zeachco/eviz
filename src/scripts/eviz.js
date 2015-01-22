// default object
window.eviz = {
  base: {},
  plugins: {},
  pluginsPath: './plugins/'
};

if(!window.console){ // ie console fix
  window.console.debug = function(){};
  window.console.info = function(){};
  window.console.log = function(){};
  window.console.warn = function(){};
  window.console.error = function(){};
  window.console.table = function(){};
}

// permit to configure eviz globals
eviz.config = function(opts){
  eviz.pluginsPath = opts.pluginsPath || opts.plugins|| eviz.pluginsPath;
};

eviz.register = function(){
  
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
      // create an answering machine while real object load
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
          aMachine[f.func].apply(aMachine, f.args);
        });
      });
      return aMachine;
    }
  }
  return create;
};

// base prototype
function ProtoBase(){
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
  this.config = function(opt){
    this.param(opt);
    this.init(opt);
    return this;
  };
  this.create = function(){
    return new this.constructor();
  };
  this.transform = function(){

  };
  this._init = function(){ console.error('this._init is not defined on ' + this.constructor.name); };
  this._update = function(){ console.error('this._update is required ' + this.constructor.name); };
  this.init = function(opt){
    this.data = [];
    this.el = opt.el || this.el || document.body;
    this.initiated = true;
    this.param(opt);
    this.options.animTime = this.options.animTime || 200;
    var self = this;
    window.addEventListener('resize', function(){
      self.setDirty();
    });
    this._init();
    this.setDirty();
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
}
eviz.base = new ProtoBase();

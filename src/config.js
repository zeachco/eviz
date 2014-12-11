require.config({
  paths: {
    "d3":"../bower_components/d3/d3.min"
  }
});

require(['main'], function(){
  console.log('demo started');
});

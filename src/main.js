'use strict';

require.config({
  baseUrl: 'src',
  paths: {
    // vendor
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    jquery: '../bower_components/jquery/dist/jquery',
    lodash: '../bower_components/lodash/dist/lodash',
    sprintf: '../bower_components/sprintfjs/sprintf'
  },
  shim: {
    bootstrap : [ 'jquery' ]
  }
});

require([ 'bootstrap-number-spinner' ]);

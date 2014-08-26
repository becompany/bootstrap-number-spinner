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

require([ 'jquery', 'bootstrap-number-spinner' ], function($) {
  
  $('#options-demo-spinner').bsSpinner({ min: 2, max: 5, format: '%d mm' }).val(3);
  
  $('#event-demo-spinner').bsSpinner().on('change.bs.spinner', function(evt, value) {
    $('#event-demo-indicator').html(value);
  });
  
});

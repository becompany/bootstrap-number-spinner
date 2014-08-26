define([
  'jquery',
  'lodash',
  'sprintf',
  'bootstrap'
], function(
  $,
  _,
  sprintf
) {
  
  var
    defaultValue = 0,
    defaultOpts = {
      format: '%d',
      min: -Infinity,
      max: Infinity
    };
  
  function parse(v, def) {
    if (v) {
      var num = parseFloat(v);
      if (_.isNumber(num) && !_.isNaN(num)) {
        return num;
      }
    }
    return def;
  }
  
  function parseNum(v, def) {
    return v !== undefined ? parseFloat(v) : def;
  }
  
  function getOpts($node) {
    return _.transform(defaultOpts, function(result, defaultVal, attr) {
      var v = $node.data(attr);
      result[attr] = v === undefined ? defaultVal : v;
    }, {});
  }
  
  $.fn.bsSpinner = function(opts) {
    var
      $spinner = this,
      $input = $('input', this),
      options = _.merge(getOpts($input), opts || {}),
      val = defaultValue;
    
    // Add class to support JS initialization of elements that are not automatically initialized
    this.addClass('spinner');
    
    function limit(num) {
      return Math.min(Math.max(num, options.min), options.max);
    }
    
    function output() {
      $input.val(sprintf(options.format, val));
    }
    
    function changed() {
      output();
      $spinner.trigger('change.bs.spinner', val);
    }
    
    function read() {
      val = limit(parse($input.val(), val));
      output();
    }
    
    function set(v) {
      val = limit(v);
      changed();
    }
    
    _.each($('[data-incr]', this), function(btn) {
      var
        $btn = $(btn),
        incr = parseFloat($btn.data('incr'));
      $btn.click(function() {
        set(val + incr);
      });
    });
    
    $input.focus(function() {
      $input.val(val);
    });
    
    $input.blur(read);
    
    // initial formatting
    read();
    
    $spinner.val = function(v) {
      if (v === undefined) {
        return val;
      }
      else {
        set(v);
      }
    }
    
    return this;
  }
  
  _.each($('.spinner'), function(node) {
    $(node).bsSpinner();
  });
  
  
});
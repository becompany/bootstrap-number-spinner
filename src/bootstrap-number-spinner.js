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
  
  function createSpinner(opts) {
    var
      $spinner = this,
      spinnerNode = this[0],
      $group = $spinner.closest('.input-group'),
      options = _.merge(getOpts($spinner), opts || {}),
      val = defaultValue;
    
    function limit(num) {
      return Math.min(Math.max(num, options.min), options.max);
    }
    
    function output() {
      spinnerNode.value = sprintf(options.format, val);
    }
    
    function changed() {
      output();
      $spinner.trigger('change.bs.spinner', val);
    }
    
    function set(v) {
      val = limit(v);
      changed();
    }
    
    function read() {
      set(limit(parse(spinnerNode.value, val)));
    }
    
    _.each($('[data-incr]', $group), function(btn) {
      var
        $btn = $(btn),
        incr = parseFloat($btn.data('incr'));
      $btn.click(function() {
        set(val + incr);
      });
    });
    
    $spinner.focus(function() {
      spinnerNode.value = val;
    });
    
    $spinner.blur(read);
    
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
  }
  
  $.fn.bsSpinner = function(opts) {
    var spinner = this.data('spinner');
    if (spinner === undefined) {
      spinner = createSpinner.apply(this, opts);
      this.data('spinner', spinner);
    }
    return this;
  }
  
  _.each($('.spinner'), function(node) {
    $(node).bsSpinner();
  });
  
});
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
    defaultFormat = '%d';
  
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
  
  function createSpinner(node) {
    var
      $input = $('input', node),
      val = defaultValue,
      format = $input.data('format') || defaultFormat,
      min = parseNum($input.data('min'), -Infinity),
      max = parseNum($input.data('max'), Infinity);
    
    function limit(num) {
      return Math.min(Math.max(num, min), max);
    }
    
    function update() {
      $input.val(sprintf(format, val));
    }
    
    function read() {
      val = limit(parse($input.val(), val));
      update();
    }
    
    function add(v) {
      val = limit(val + v);
      update();
    }
    
    _.each($('[data-incr]', node), function(btn) {
      var
        $btn = $(btn),
        incr = parseFloat($btn.data('incr'));
      $btn.click(_.partial(add, incr));
    });
    
    $input.focus(function() {
      $input.val(val);
    });
    
    $input.blur(read);
    
    // initial formatting
    read();
  }
  
  _.each($('.spinner'), createSpinner);
  
  return createSpinner;
  
});
import { option } from 'fp-ts';
import { sprintf } from 'sprintf-js';
import * as $ from 'jquery';

interface Options {
  format: string;
  min: number;
  max: number;
}

export interface NumberSpinnerOptions {
  format?: string;
  min?: number;
  max?: number;
}

const defaultValue: number = 0;

const defaultOptions = {
  format: '%d',
  min: -Infinity,
  max: Infinity
};

function parseNumber(value: string): option.Option<number> {
  if (value) {
    const num = parseFloat(value);
    if (typeof num === 'number' && !isNaN(num)) {
      return option.some(num);
    }
  }
  return option.none;
}

function getOpts(node: HTMLElement, opts: NumberSpinnerOptions): Options {
  return {
    format: option
      .fromNullable(node.getAttribute('data-format'))
      .getOrElse(() => opts.format ? opts.format : defaultOptions.format ),
    min: option
      .fromNullable(node.getAttribute('data-min'))
      .chain(parseNumber)
      .getOrElse(() => opts.min ? opts.min : defaultOptions.min),
    max: option
      .of(node.getAttribute('data-max'))
      .chain(parseNumber)
      .getOrElse(() => opts.max ? opts.max : defaultOptions.max),
  };
}

export class BootstrapNumberSpinner {

  private options: Options;
  private _inputElement: HTMLInputElement;
  private _value: number = defaultValue;

  constructor(inputElement: HTMLInputElement, opts?: NumberSpinnerOptions) {
    this._inputElement = inputElement;
    this.options = getOpts(inputElement, opts ? opts : {});

    const that = this;
    const $spinner = $(this._inputElement);
    const $group = $spinner.closest('.input-group');

    $('[data-incr]', $group).each((i, btn) => {
      const $btn = $(btn);
      const incr = parseFloat($btn.data('incr'));
      $btn.click(() => {
        that.value += incr;
        that.notify();
      });
    });

    $spinner

      .focus(() => {
        that._inputElement.value = that._value.toString();
      })

      // prevent form submission when enter is pressed
      .keypress(evt => {
        const k = evt.keyCode || evt.which;
        if (k === 13) {
          that.read();
          evt.preventDefault();
        }
      })

      .change(evt => {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        that.read();
      });

    // initial formatting
    that.read();

  }

  private limit(num: number) {
    return Math.min(Math.max(num, this.options.min), this.options.max);
  }

  private write() {
    this._inputElement.value = sprintf(this.options.format, this._value);
  }

  private notify() {
    const event = new Event('change.bs.spinner');
    this._inputElement.dispatchEvent(event);
  }

  get value(): number {
    return this._value;
  }

  set value(v: number) {
    this._value = this.limit(v);
    this.write();
  }

  private read() {
    console.log("reading " + parseNumber(this._inputElement.value));
    this.value = parseNumber(this._inputElement.value).getOrElseValue(this._value);
    this.notify();
  }

}

/*
  $.fn.bsSpinner = function(opts) {
    var spinner = this.data('spinner');
    if (spinner === undefined) {
      spinner = createSpinner.call(this, opts);
      this.data('spinner', spinner);
    }
    return this;
  };

  _.each($('.spinner'), function(node) {
    $(node).bsSpinner();
  });
*/

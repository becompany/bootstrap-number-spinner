import { BootstrapNumberSpinner } from '../src/bootstrap-number-spinner';
import { option } from 'fp-ts';

import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;
describe('Bootstrap number spinner', () => {

  it('should parse number strings correctly' , () => {
    expect(BootstrapNumberSpinner.parseNumber("3").getOrElseValue(0)).to.equal(3);
  });

});
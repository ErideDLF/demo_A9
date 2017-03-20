'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import InputBox from '../src/a9/components/inputBox/InputBox';

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(shallow(<InputBox />).contains(<i className="material-icons md-25 md-light ui-a9-input-icon prefix">search</i>)).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(shallow(<InputBox />).is('.input-field')).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(mount(<InputBox />).find('.ui-a9-input').length).to.equal(1);
  });
});

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'; // idk if this is needed but eslint says it is
import { mount } from 'enzyme';
// import sinon from 'sinon';
import A11yWrapper from './A11yWrapper';

const optionalProps = {
  id: 'a11y-module',
  children: <h1>Props test</h1>,
  lang: 'fr',
};

// used to test for dangerous html, and table of contents + input enhancements
// should this be a string?
const dangerousHtml = (
  <div>
    <h1>Stuff</h1>
    <h2>More stuff</h2>
    <a href="https://google.com">Link</a>
    {/* eslint-disable-next-line react/button-has-type */}
    <button>Button</button>
  </div>
);

describe('<A11yWrapper />', () => {
  it('A11yWrapper renders without crashing', () => {
    mount(<A11yWrapper />);
  });

  it('A11yWrapper accepts optional props', () => {
    const wrapper = mount(
      <A11yWrapper id={optionalProps.id}>{optionalProps.children}</A11yWrapper>
    );
    expect(wrapper.props().id.toEqual(optionalProps.id));
    expect(wrapper.props().children.toEqual(optionalProps.children));
    expect(wrapper.props().lang.toEqual(optionalProps.lang));
  });

  it('A11yWrapper renders children', () => {
    const wrapper = mount(
      <A11yWrapper id={optionalProps.id}>{optionalProps.children}</A11yWrapper>
    );
    expect(wrapper.contains(optionalProps.children).toEqual(true));
  });

  // test for dangerouslysetinnerhtml
  it('A11yWrapper dangerously sets innerHTML', () => {
    const wrapper = mount(<A11yWrapper dangerouslySet={dangerousHtml} />);
    expect(wrapper.contains(dangerousHtml).equals(true));
  });

  // test that the button exists
  it('a11y button is rendered', () => {
    const wrapper = mount(<A11yWrapper />);
    expect(wrapper.find('.a11ize__a11y-button').exists().toBeTruthy());
  });

  // test that the panel gets the active class when the button is clicked
  // (i think it's hashed this might be weird)

  // test for scaling font size with children

  // test for font family

  // test line height

  // test letter spacing

  // test word spacing

  // test contrast

  // test enhance inputs

  // test for table of contents
});

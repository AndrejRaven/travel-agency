import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';


describe('Component OrderOption', () => { 
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='Lorem' type='number' />);
    expect(component).toBeTruthy();
  });
});
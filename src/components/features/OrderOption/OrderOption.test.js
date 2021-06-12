import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => { 
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='Lorem' type='number' />);
    expect(component).toBeTruthy();
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
  it('should render correct title', () => {
    const expectedTitle = 'Lorem ipsum';
    const component = shallow(<OrderOption name={expectedTitle} type='number'/>);
    
    const renderedTitle = component.find('.title').text();
    
    expect(renderedTitle).toEqual(expectedTitle);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};
  
const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};
  
const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });
  
    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
          
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
          
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': {
        it('contains names and icon', () => {
          const component = renderedSubcomponent.find('.component');
          expect(component.length).toBe(1);

          const emptyIcon = component.find('Icon[name="times-circle"]').length;
          expect(emptyIcon).toBe(1);  
          
          const activeIcon = component.find('.iconActive').length;
          expect(activeIcon).toBe(1);  

          const icons = component.find('Icon').not('[name="times-circle"]');
          expect(icons.length).toBe(mockProps.values.length);
          expect(icons.at(0).prop('name')).toBe(mockProps.values[0].icon);
          expect(icons.at(1).prop('name')).toBe(mockProps.values[1].icon);  
        
        });
        it('should run setOptionValue on click', () => {
          renderedSubcomponent.find('.icon').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue }); 
        });
        break;
      }
      case 'checkboxes': {
        it('should contain checkboxes', () => {
          const checkboxes = renderedSubcomponent.find('.checkboxes');
          expect(checkboxes.length).toBe(1);
          
          const input = checkboxes.find('input');
          expect(input.length).toBe(mockProps.values.length);
        });  
        it('should run setOptionValue function on change', () => {
          renderedSubcomponent.find('input').last().simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id] : [mockProps.currentValue, testValue] });
        });
        break;
      }
      case 'date': {
        it('should render DatePicker', () => {
        //   console.log(renderedSubcomponent.debug());
          const datePicker = renderedSubcomponent.find(DatePicker);
          expect(datePicker.length).toBe(1);
        });  
        it('should run setOptionValue function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        }); 
        break;
      }
      case 'number': {
        it('should render input type number', () => {
          const renderedNumberInput = renderedSubcomponent.find('.number');
          expect(renderedNumberInput.length).toBe(1);
          
          const input = renderedNumberInput.find('.inputSmall').prop('value');
          expect(input).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': {
        it('should render input type text', () => {
          const renderedNumberInput = renderedSubcomponent.find('.component');
          expect(renderedNumberInput.length).toBe(1);
            
          const input = renderedNumberInput.find('.input').prop('type');
          expect(input).toBe('text');
        });  
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        }); 
        break;
      }
    }
  });
}
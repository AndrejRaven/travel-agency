import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {   
  const expectedId = 'abc';
  const expectedName = 'Lorem ipsum';
  const expectedImage = 'image.jpg';
  const expectedCost = '$14,12.00';
  const expectedDays = 11;
  const expectedTags = ['apple', 'orange', 'banan']; 

  it('should generate link with id', () => {
    
    const component = shallow(<TripSummary id={expectedId} tags={expectedTags} name={expectedName} cost={expectedCost} days={expectedDays} image={expectedImage} />);
    const linkTo = component.find('.link').prop('to');
    const renderedId = linkTo.slice(6, linkTo.length);


    expect(renderedId).toEqual(expectedId);
  });
  it('should render correct image src and alt', () => {
    const component = shallow(<TripSummary id={expectedId} name={expectedName} cost={expectedCost} days={expectedDays} image={expectedImage} />);
      
    const renderedImage = component.find('img').prop('src');

    expect(renderedImage).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedName);
  });
  it('renders correct props', () => {
    const component = shallow(<TripSummary id={expectedId} name={expectedName} cost={expectedCost} days={expectedDays} image={expectedImage} />);
    const renderedName = component.find('.title').text();
    const renderedDaysSpan = component.find('.details').find('span').at(0).text();
    const renderedCostSpan = component.find('.details').find('span').at(1).text();
      
    const renderedDays = renderedDaysSpan.split(' ')[0];
    const renderedCost = renderedCostSpan.split(' ')[1];

    expect(renderedName).toEqual(expectedName);
    expect(renderedDays).toEqual(expectedDays.toString());  
    expect(renderedCost).toEqual(expectedCost);  
  });
  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary id={expectedId} name={expectedName} cost={expectedCost} days={expectedDays} />)).toThrow(); 
    expect(() => shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} image={expectedImage}  />)).toThrow();  
    expect(() => shallow(<TripSummary id={expectedId} cost={expectedCost} days={expectedDays} image={expectedImage}  />)).toThrow();   
    expect(() => shallow(<TripSummary id={expectedId} name={expectedName} days={expectedDays} image={expectedImage}  />)).toThrow(); 
    expect(() => shallow(<TripSummary id={expectedId} name={expectedName} cost={expectedCost} image={expectedImage}  />)).toThrow(); 
  });
  it('should render tags in right order', () => {
    const firstTag = expectedTags[0];
    const secondTag = expectedTags[1];
    const thirdTag = expectedTags[2]; 

    const component = shallow(<TripSummary id={expectedId} tags={expectedTags} name={expectedName} cost={expectedCost} days={expectedDays} image={expectedImage} />);

    const renderedFirstTag = component.find('.tag').at(0).text(); 
    const renderedSecondTag = component.find('.tag').at(1).text(); 
    const renderedThirdTag = component.find('.tag').at(2).text(); 
      
    expect(renderedFirstTag).toEqual(firstTag);
    expect(renderedSecondTag).toEqual(secondTag);
    expect(renderedThirdTag).toEqual(thirdTag);
  });
  it('shouldn`t render tags without prop tags', () => {
    const component = shallow(<TripSummary id={expectedId} name={expectedName} cost={expectedCost} days={expectedDays} image={expectedImage} />);
      
    expect(component.hasClass('tag')).toBe(false); 
  });    
});
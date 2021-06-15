import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
// import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';



const sendOrder = (options, tripCost, tripId, countryCode, tripName) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  
  const payload = {
    tripId,
    countryCode,
    tripName,
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
    
};

const OrderForm = ({options, setOrderOption, tripCost, tripName, country, tripId}) => (
  <Row center="xs">
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption {...option}
          setOrderOption={setOrderOption}
          currentValue ={options[option.id]}
        />
      </Col>
    ))}  
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options}/>
    </Col>
    <Col xs={12}>
      {
        (options.name == '' || options.contact == '' || options['start-date'] == '') ? (
          <p>Please chose start date, provide name and contact to submit order</p>
        ) : (
          <Button onClick={() => sendOrder(options, tripCost, tripId, country.alpha2Code, tripName)}>Order now!</Button>
        )}
    </Col>
  </Row>
);



OrderForm.propTypes = {
  country: PropTypes.object,
  tripId:  PropTypes.string,
  tripName: PropTypes.string,
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
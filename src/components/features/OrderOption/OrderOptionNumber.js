import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionNumber = ({currentValue, limits, price, setOptionValue}) => (
  <div className={styles.number}>
    <input type='number' className={styles.inputSmall}
      min={limits.min} max={limits.max}
      value={currentValue}
      onChange={event => setOptionValue(event.currentTarget.value)}>    
    </input>
    (+{formatPrice(price)}) 
  </div>
);
  
OrderOptionNumber.propTypes = {
  currentValue: PropTypes.any,
  limits: PropTypes.object,
  setOptionValue: PropTypes.func,
  price: PropTypes.string,
};
    
  
export default OrderOptionNumber;
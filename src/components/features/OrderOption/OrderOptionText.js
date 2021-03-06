import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';


const OrderOptionText = ({setOptionValue, currentValue}) => {
    
  return (
    <div className={styles.component}>
      <input type='text' className={styles.input}
        value={currentValue}    
        onChange={event => setOptionValue(event.currentTarget.value)} />
    </div>  
  );
};

OrderOptionText.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
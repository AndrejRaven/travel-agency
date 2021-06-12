import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';



const OrderOptionDate = ({setOptionValue, currentValue}) => {
  
  return (
    <div className={styles.component}>
      <DatePicker className={styles.datePicker} value={currentValue} selected={currentValue} onChange={setOptionValue} placeholderText='Pick a date' />
    </div>  
  );
};

OrderOptionDate.propTypes = {
  currentValue: PropTypes.any,
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
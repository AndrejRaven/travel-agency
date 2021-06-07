import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
// import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';



const OrderOptionDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>  
  );
};


export default OrderOptionDate;
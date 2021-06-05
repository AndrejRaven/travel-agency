import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';
import {formatPrice} from '../../../utils/formatPrice';


const OrderOptionIcons = ({values, required, currentValue, setOptionValue}) => (
  
  <div className={styles.component}>
    {required ? '' : (
      <div className={styles.icon}
        onClick={() => setOptionValue('')}
      >
        <Icon name='times-circle'/>
        none
      </div>
    )}
    {values.map(value => (
      <div className={value.id == currentValue ? `${styles.icon} ${styles.iconActive}` : styles.icon}
        key={value.id}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon}/>
        {value.name} 
        ({formatPrice(value.price)})
      </div>
    ))}
  </div>
);
  
OrderOptionIcons.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
  required: PropTypes.bool,
};
    
  
export default OrderOptionIcons;

// import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './OrderOption.scss';
// import {formatPrice} from '../../../utils/formatPrice';


// const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
//   <select
//     className={styles.dropdown}
//     value={currentValue}
//     onChange={event => setOptionValue(event.currentTarget.value)}
//   >
//     {required ? '' : (
//       <option key='null' value=''>---</option>
//     )}
//     {values.map(value => (
//       <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
//     ))}
//   </select>
// );
  
// OrderOptionDropdown.propTypes = {
//   name: PropTypes.string,
//   values: PropTypes.array,
//   required: PropTypes.bool,
//   currentValue: PropTypes.string,
//   setOptionValue: PropTypes.func,
// };
    
  
// export default OrderOptionDropdown;
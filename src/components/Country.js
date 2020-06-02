import React from 'react';
import PropTypes from 'prop-types';

const Country = props => 
    <label>
        <input 
            type="checkbox" 
            checked={props.isChecked} 
            onChange={props.handleCheckedCountry}/>
            {props.country}
    </label>
Country.propTypes = {
    country: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    handleCheckedCountry: PropTypes.func.isRequired,
}

export default Country;
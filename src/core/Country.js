import React from 'react';
import PropTypes from 'prop-types';

const Country = props => 
    <li>
        <label>
            <input 
                type="checkbox" 
                checked={props.isChecked} 
                onChange={props.handleCheckedCountry}/>
        </label>
        {props.country}
    </li>

Country.propTypes = {
    country: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    handleCheckedCountry: PropTypes.func.isRequired,
}

export default Country;
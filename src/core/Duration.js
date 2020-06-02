import React from 'react';
import PropTypes from 'prop-types';

const Duration = props =>  {

    const dates = [];
    for (var i = 1; i <= 30; i++){
        dates.push(i);
    };

    return (
    <li>
        <label> start date</label>    
        <select
            value={props.startDate}
            onChange={ (e) =>props.setStartDate(e.target.value)}
            >
            {dates.map(value => <option type="number" key={value} value={value}>{value}</option>)}
        </select>
        <label> end date</label>
        <select
            value={props.endDate}
            onChange={ (e) => props.setEndDate(e.target.value) }
            >
            {dates.map(value => <option type="number" key={value} value={value}>{value}</option>)}
        </select>

    
    </li>
    );
};
Duration.propTypes = {
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
}

export default Duration;
import React from 'react';
import PropTypes from 'prop-types';

const Duration = props =>  
    <div>
        <label> Start date </label>    
        <select
            value={props.startDate}
            onChange={ (e) =>props.handleStartDate(e.target.value)}
            >
            { Array.from(new Array(30), (val, index) => index + 1).map((value) => (<option key={value} value={value}>{value}</option>))}
        </select>

        <label> End date </label>
        <select
            value={props.endDate}
            onChange={ (e) => props.handleEndDate(e.target.value) }
            >
            { Array.from(new Array(30), (val, index) => index + 1).map((value) => (<option key={value} value={value}>{value}</option>))}
        </select>
    </div>

    
Duration.propTypes = {
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    handleStartDate: PropTypes.func.isRequired,
    handleEndDate: PropTypes.func.isRequired,
}

export default Duration;
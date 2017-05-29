import React from 'react';
import './Spinner.css';

// html + css source: https://codepen.io/magnus16/pen/BKoRNw
const Spinner = () => {
    return (
        <div className="cs-loader">
            <div className="cs-loader-inner">
                <label> ●</label>
                <label> ●</label>
                <label> ●</label>
                <label> ●</label>
                <label> ●</label>
                <label> ●</label>
            </div>
        </div>
    );
};

export default Spinner;
import React from 'react';
import './LoadMoreBtn.css';

const loadMoreBtn=(props)=>{
    return(
        <div className="rmdb-loadmorebtn" onClick={props.clicked}>
            <p>{props.text}</p>
        </div>
    );
}

export default loadMoreBtn;
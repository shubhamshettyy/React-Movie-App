import React from 'react';
import './MovieThumb.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const movieThumb=(props)=>{
    return(
        <div className="rmdb-moviethumb">
            {props.clickable?
            <Link to={{
                pathname:`/${props.movieId}`,
                movieName: `${props.movieName}`
            }}>
                <img src={props.image} alt="movie thumb" />
            </Link>:
                <img src={props.image} alt="movie thumb" />}
            
        </div>
    )
}

movieThumb.propTypes={
    image:PropTypes.string,
    movieId: PropTypes.number,
    movieName: PropTypes.string
}
export default movieThumb;
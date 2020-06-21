import React from 'react';
import  {Link} from 'react-router-dom';
import './Navigation.css';

const navigation=(props)=>{
    return(
        <div className="rmdb-navigation">
            <div className="rmdb-navigation-content">
                <Link to="/">
                    <p>Home</p>
                </Link>
                <p>/{props.movie}</p>
            </div>
        </div>

    )
}
export default navigation;
import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import NotFound from '../elements/NotFound/NotFound';

const app=(props)=>{
    return(

        <BrowserRouter>
            <React.Fragment>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/:movieId" exact component={Movie}/>
                    <Route component={NotFound}/>
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default app;
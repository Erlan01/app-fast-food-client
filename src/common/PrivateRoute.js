import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {getCurrentUser} from "../util/APIUtils";


const PrivateRoute = ({component: Component, authenticated, ...rest}) => {


        return (
            <Route
                {...rest}
                render={props =>
                    authenticated ? (
                        <Component {...rest} {...props} />
                    ) : (

                        <Redirect to={{
                            pathname: '/login',
                            state: {from: props.location}
                        }}/>
                    )
                }
            />
        )
    }

;

export default PrivateRoute
import React from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {ACCESS_TOKEN} from "../../constants";
import {getCurrentUser} from "../../util/APIUtils";

const OAuth2RedirectHandler = ({setAuth, setUser, history, ...props}) => {
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const saveToken = (token) => {
        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            setAuth(true)
             getCurrentUser()
                .then(res=>{
                    setUser(res)

                })
        }
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');
    saveToken(token)

    return (
        token.length ?
            <Redirect to={{
                pathname: "/profile",
                state: {from: props.location}
            }}/>
            :

            <Redirect to={{
                pathname: "/login",
                state: {
                    from: props.location,
                    error: error
                }
            }}/>
    )
}

export default withRouter(OAuth2RedirectHandler);
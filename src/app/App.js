import React, {Component, useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true
        }

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    userMe() {
        const data = getCurrentUser()
        console.log(data)
        // return data;
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        Alert.success("You're safely logged out!");
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        return (
            <div className="app">
                <div className="app-top-box">
                    <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
                </div>
                <div className="app-body">
                    <Switch>
                        <Route exact
                               path="/"
                               component={Home}>
                        </Route>

                        <PrivateRoute
                            path="/profile"
                            authenticated={this.state.authenticated}
                            currentUser={this.state.currentUser}
                            component={Profile}
                            userMe={this.userMe}
                            setStateFunc={this.setState}>
                        </PrivateRoute>

                        <Route path="/login"
                               render={(props) =>
                                   <Login authenticated={this.state.authenticated} {...props} />}>
                        </Route>

                        <Route path="/signup"
                               render={(props) =>
                                   <Signup authenticated={this.state.authenticated} {...props} />}>
                        </Route>

                        <Route
                            path="/oauth2/redirect"
                            render={(props) => <OAuth2RedirectHandler
                                loadUser={() => this.loadCurrentlyLoggedInUser()}/>}
                            // component={OAuth2RedirectHandler}
                        >
                        </Route>

                        <Route component={NotFound}></Route>
                    </Switch>
                </div>

                <Alert stack={{limit: 5}} timeout={5000} position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }
}


/*const App = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)

    const loadCurrentlyLoggedInUser = async () => {
        await getCurrentUser()
            .then(response => {
                setAuthenticated(true)
                setCurrentUser(response)
                setLoading(false)
            }).catch(error => {
                setLoading(false)
            });
    }

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setAuthenticated(false)
        setCurrentUser({})
        Alert.success("You're safely logged out!");
    }

    useEffect(() => {
        loadCurrentlyLoggedInUser()
    }, [])

    if (loading) {
        return <LoadingIndicator/>
    }

    return (
        <div className="app">
            <div className="app-top-box">
                <AppHeader authenticated={authenticated} onLogout={handleLogout}/>
            </div>
            <div className="app-body">
                <Switch>
                    <Route exact
                           path="/"
                           component={Home}>
                    </Route>

                    <PrivateRoute
                        path="/profile"
                        authenticated={authenticated}
                        currentUser={currentUser}
                        component={Profile}
                    >
                    </PrivateRoute>

                    <Route path="/login"
                           render={(props) =>
                               <Login authenticated={authenticated} {...props} />}>
                    </Route>

                    <Route path="/signup"
                           render={(props) =>
                               <Signup authenticated={authenticated} {...props} />}>
                    </Route>

                    <Route
                        path="/oauth2/redirect"
                        render={(props) => <OAuth2RedirectHandler setAuth={setAuthenticated} setUser={setCurrentUser}/>}
                    >
                    </Route>

                    <Route component={NotFound}></Route>
                </Switch>
            </div>

            <Alert stack={{limit: 5}} timeout={5000} position='top-right' effect='slide' offset={65}/>
        </div>
    )
}*/

export default App;

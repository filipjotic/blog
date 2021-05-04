import React from 'react';
import {Box, Container, createMuiTheme, MuiThemeProvider, withStyles} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import HomePage from './components/Homepage/HomePage'
import Login from './components/LoginSignup/Login'
import Signup from './components/LoginSignup/Signup'
import NewListing from './components/UserDashboard/NewListing'
import Navtabs from "./components/Navtabs";
import EditListing from "./components/UserDashboard/EditListing";
import Detail from "./components/Homepage/Detail";
import UserDashboard from "./components/UserDashboard/UserDashboard";

import './App.css';


const theme = createMuiTheme({
    typography: {
        h1: {
            fontFamily: "Shippori Mincho B1",
            fontWeight: '800',
        },
        h2: {
            fontFamily: "Shippori Mincho B1",
            fontWeight: '800',
        },
        h3: {
            fontFamily: "Shippori Mincho B1",
            fontWeight: '800',
        },
        h4: {
            fontFamily: "Shippori Mincho B1",
            fontWeight: '800',

        },
        h5: {
            fontFamily: "Shippori Mincho B1",
            fontWeight: '800',
        },
        button: {
            fontFamily: "Shippori Mincho B1",
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: 'none',
        },
        h6: {
            fontFamily: "Shippori Mincho B1",
            fontWeight: '800',
        },
        caption: {
            fontFamily: "Shippori Mincho B1",

        },
        body1: {
            fontFamily: "Shippori Mincho B1",

        },
        fontFamily: "Shippori Mincho B1",
    }
});


const useStyles = ((theme) => ({
    root: {
        backgroundColor: 'white',
        "& h6": {
            fontWeight: '800',
            lineHeight: '26px',
        }
    },
    mainParts: {
        marginTop: '10px',
    },
}));

class App extends React.Component {
    state = {token: ''};
    setToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token));

        this.setState({token: token})
    };

    getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        if (userToken) {
            return userToken.token
        } else {
            return ''
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>

                <Box className={classes.root}>
                    <BrowserRouter>
                        <Navtabs getToken={this.getToken}/>
                        <Container maxWidth='lg' className={classes.mainParts}>
                            <Switch>
                                <Route path='/' exact component={HomePage}/>
                                <Route path='/newListing' exact><NewListing getToken={this.getToken}/> </Route>
                                <Route path='/editListing/:id' exact
                                       component={(props) => <EditListing {...props} getToken={this.getToken}/>}/>
                                <Route path='/detail/:id' exact
                                       component={(props) => <Detail {...props} getToken={this.getToken}/>}/>

                                <Route path='/userdashboard' exact> <UserDashboard getToken={this.getToken}/></Route>

                                <Route path='/login' exact> <Login setToken={this.setToken}
                                                                   getToken={this.getToken}/></Route>
                                <Route path='/signup' exact> <Signup getToken={this.getToken}/></Route>
                            </Switch>
                        </Container>
                    </BrowserRouter>

                </Box>
            </MuiThemeProvider>
        );
    }


}

export default withStyles(useStyles)(App);
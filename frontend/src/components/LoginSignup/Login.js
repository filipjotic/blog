import React from 'react';
import {Container, Grid, withStyles} from "@material-ui/core";
import {Redirect} from "react-router-dom";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import backEndApi from '../api/api'

const loginImage = process.env.PUBLIC_URL + '/img/login.png';

const useStyles = theme => ({
    root: {
        marginTop: '60px',
        padding: '50px !important',
        background: 'rgba(242,237,215,0.21)',
        borderRadius: '15px',
        "& a": {
            color: '#3A6351',
        },

    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        background: '#3A6351',
        borderRadius: '5px',
        width: '406px',
        height: '50px',
        margin: theme.spacing(3, 0, 2),
        "&:hover": {
            background: 'rgba(64,98,64,0.8)',
        }
    },
    textField: {
        marginBottom: '15px',
        background: "#F2EDD7",
        borderRadius: '5px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        width: '406px',
        border: '0px solid #FFF',
        borderLeftWidth: '7px',
        borderLeftColor: '#E48257',
        "& input": {
            background: '#F2EDD7',
            border: '0px solid red',
            borderRadius: '5px'
        }

    },
    inputAdornment: {
        background: '#E48257',
        borderRadius: '7px 0px 0px 7px',

    },

});


class Login extends React.Component {
    state = {email: '', password: '', redirect: false, errorMessage: '', token: ''};
    errorcheck = () => {
        if (this.state.errorMessage) {
            return <Typography variant='h6'
                               style={{
                                   color: 'red',
                                   marginLeft: '5px',
                                   fontSize: '14px'
                               }}>{this.state.errorMessage}</Typography>
        } else {
            return <Typography variant='body2' style={{color: 'red', display: 'none'}}>''</Typography>
        }
    };

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
    };

    onPasswordChange = (e) => {
        this.setState({password: e.target.value})
    };

    loginApiRequest = async (loginParams) => {
        const {data} = await backEndApi.post('/getUser', {params: loginParams});
        const token = data;
        if (data === "notUser") {
            this.setState({errorMessage: "Incorrect Username or Password!"});

        } else {

            this.props.setToken(token);
            this.setState({token: token, redirect: true});
        }

    };

    validateInput = () => {
        const logindetails = {
            email: this.state.email,
            password: this.state.password,
        };

        if (this.state.email && this.state.password) {
            this.loginApiRequest(logindetails);

        } else {
            this.setState({errorMessage: "Please fill all the inputs!"})
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.validateInput();
     };

    componentDidMount() {
        const token = this.props.getToken();
        console.log(token);
        if (token) {
            console.log("welcome Mr ");
            return <Redirect to='/userdashboard'/>
        }
    }

    render() {

        if (this.state.redirect || this.props.getToken()) {
            return <Redirect to='/userdashboard'/>

        }

        const {classes} = this.props;

        return (
            <Container maxWidth='lg'>
                <Grid container className={classes.root}>

                    <Grid item xs={12} md={5} style={{
                        backgroundColor: "rgba(228,130,87,0.21)",

                        borderRadius: '15px', marginBottom: 'auto'
                    }}>
                        <img src={loginImage} alt="" height='420px' style={{
                            borderRadius: '5px',
                            marginTop: '20px',
                            marginLeft: '20px',
                            marginBottom: '-20px'
                        }}/>

                    </Grid>
                    <Grid item xs={1} md={2} />

                    <Grid item xs={12} md={5}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <div className={classes.paper}>

                                <Typography component="h1" variant="h5" style={{paddingBottom: '40px'}}>
                                    Login Account
                                </Typography>
                                <form className={classes.form} noValidate>

                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onChange={this.onEmailChange}
                                        autoComplete="email"
                                        autoFocus
                                        className={classes.textField}

                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        required
                                        fullWidth
                                        name="password"
                                        onChange={this.onPasswordChange}

                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        className={classes.textField}

                                    />

                                    <Box align='right'><Link href="/resetPassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                    </Box>
                                    {this.errorcheck()}

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.onSubmit}
                                    >
                                        Log in
                                    </Button>
                                    <Grid container justify='center'>

                                        <Grid item md={6}>
                                            <Box mt={4} style={{fontWeight: '800'}}>Don't have an account?
                                                <Link href="/signup" variant="body2">
                                                    {" Sign Up"}
                                                </Link></Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>

                        </Container>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}

export default withStyles(useStyles)(Login);

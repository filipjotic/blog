import React from 'react';
import {Checkbox, Container, FormControlLabel, Grid, withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import backEndApi from '../api/api'
import {Redirect} from "react-router-dom";

const SignupImage = process.env.PUBLIC_URL + '/img/signup.png';
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
        padding: '0px',
        background: "#F2EDD7",
        borderRadius: '5px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        width: '406px',
        border: '0px solid #eee',

        borderLeftWidth: '7px',
        borderLeftColor: '#E48257',
        "& input": {
            color: "rgba(57,50,50,0.25)",
            border: '0px solid #eee',
            borderRadius: '30px',

        },

    },
    inputAdornment: {
        background: '#E48257',
        borderRadius: '7px 0px 0px 7px',

    },
});

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isCheck: false,
        errorMessage: '',
        successMessage: '',
        redirect: false,
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState({errorMessage: ''});
        this.setState({successMessage: ''});

        this.validateInput();

    };
    signUpApiRequest = async (signUpDetails) => {
        const {data} = await backEndApi.post('/signUpUser', signUpDetails);
        if (data === "userExist") {
            this.setState({errorMessage: "The email that you have provided is already in use."})
        } else {
            this.setState({
                redirect: true,
                errorMessage: '',
                successMessage: 'You have successfully  Signed Up.'
            });


        }
    };
    validateInput = () => {
        const signUpUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


        if (this.state.name && this.state.email && this.state.password && this.state.confirmPassword) {
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({errorMessage: "The passwords that you have entered does not match."})
            } else if (!mailformat.test(this.state.email)) {

                this.setState({errorMessage: "The email that you have provided is invalid."})

            } else if (!this.state.isCheck) {
                this.setState({errorMessage: "You have to agree to the Privacy Policy and Terms Of Use."})
            } else {
                if (this.state.errorMessage === '') {
                    this.signUpApiRequest(signUpUser)
                    /*/!*axios.post('http://localhost:5000/signUpUser', signupUser)*!/
                    axios.post('https://damp-fjord-23317.herokuapp.com/signUpUser', signUpUser)
                        .then(res => {

                            }
                        )*/
                }
            }
        } else {
            this.setState({errorMessage: "Please fill all the inputs."})
        }


    };
    onNameChange = (e) => {
        this.setState({name: e.target.value});
    };
    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    };
    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    };
    onConfirmPasswordChange = (e) => {
        this.setState({confirmPassword: e.target.value});
    };
    onCheckboxChange = (e) => {
        if (e.target.checked && this.state.errorMessage === "You Have to accept the Terms & PP") {
            this.setState({errorMessage: ''})
        }
        this.setState({isCheck: e.target.checked})
    };
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
    successCheck = () => {
        if (this.state.successMessage) {
            return <Typography variant='h6'
                               style={{color: 'green', marginLeft: '5px'}}>{this.state.successMessage}</Typography>
        } else {
            return <Typography variant='body2' style={{color: 'red', display: 'none'}}>''</Typography>
        }

    };

    render() {
        if (this.state.redirect || this.props.getToken()) {
            return <Redirect to='/login'/>

        }
        const {classes} = this.props;
        return (
            <Container maxWidth='lg'>
                <Grid container className={classes.root}>

                    <Grid item xs={12} md={5} style={{
                        backgroundColor: "rgba(228,130,87,0.21)",

                        borderRadius: '15px', marginBottom: 'auto'
                    }}>
                        <img src={SignupImage} alt="" height='420px' style={{
                            borderRadius: '8px',
                            marginTop: '20px',
                            marginLeft: '20px',
                            marginBottom: '-20px'
                        }}/>

                    </Grid> {/*height='446px' width='490px' */}
                    <Grid item xs={1} md={2}> {/*<Divider orientation='vertical'/>*/}</Grid>

                    <Grid item xs={12} md={5}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <div className={classes.paper}>

                                <Typography component="h1" variant="h5"
                                            style={{paddingBottom: '30px', marginTop: '-60px'}}>
                                    Sign Up
                                </Typography>
                                <form className={classes.form} noValidate onSubmit={this.onFormSubmit}>

                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        required
                                        fullWidth
                                        id="text"
                                        onChange={this.onNameChange}
                                        label="Name"
                                        name="name"
                                        autoFocus
                                        className={classes.textField}

                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        required
                                        fullWidth
                                        id="email"
                                        onChange={this.onEmailChange}
                                        label="Email Address"
                                        name="email"
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
                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        required
                                        fullWidth
                                        onChange={this.onConfirmPasswordChange}

                                        label="Confirm Password"
                                        name='confirmPassword'
                                        type="password"
                                        id="password"

                                        className={classes.textField}

                                    />

                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary"
                                                           onChange={this.onCheckboxChange}/>}
                                        label="I have read and agreed to Privacy Policy  & TOU"
                                    />

                                    {this.state.errorMessage ? this.errorcheck() : this.successCheck()}

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justify='center'>

                                        <Grid item md={6}>
                                            <Box mt={4} style={{fontWeight: '800'}}>Already have an account
                                                <Link href="/login" variant="body2">
                                                    {" Log in"}
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

export default withStyles(useStyles)(Signup);

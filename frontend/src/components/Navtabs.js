import React from 'react'
import {AppBar, Button, Grid, List, ListItem, Toolbar, Typography, withStyles} from "@material-ui/core/index";
import withWidth from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import {Redirect} from "react-router-dom";

const useStyles = theme => ({
    root: {
        "& ul": {
            padding: '0px',
            margin: '0px',
        },
        "& li": {
            display: 'inline',
            padding: '0px',
            "& a": {
                color: '#ffeedd',
                padding: '5px 20px ',
                marginRight: '10px',
                textTransform: 'none',
                borderRadius: '5px',
                lineHeight: '26px'

            },

            "& a:hover": {
                textDecoration: 'none',

            },

        },

        backgroundColor: 'rgba(228,130,87,0.89)',
        maxHeight: '100px',
        color: '#ffeedd',
        lineHeight: '26px',
        boxShadow: 'opx 6px 10px rgba(0,0,0,0.15)',

        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.down('sm')]: {
            maxHeight: '1000px',
            "& li": {
                display: 'block',
                marginBottom: '10px',
                backgroundColor: 'rgba(228,130,87,0.56)',
                "& a": {
                    width: '100%',
                    padding: '5px 20px ',
                    marginRight: '10px',
                    textTransform: 'none',
                    borderRadius: '5px',
                    lineHeight: '26px',
                    "& span": {
                        justifyContent: 'left'
                    }

                },
            },

        }


    },
    logoContainer: {},
    menuContainer: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {

            display: 'none'
        },
        [theme.breakpoints.up('md')]: {
            display: 'inline'
        }
    },
    hamburgerMenu: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block',

        }
    },
    humbergerBody: {
        [theme.breakpoints.down('sm')]: {}
    },
    logo: {
        backgroundColor: 'rgba(242,237,215,0.89)',
        borderRadius: '5px',
        color: 'rgba(228,130,87,0.89)',
        padding: '8px 2px 8px 20px',
    }

});

class Navtabs extends React.Component {
    state = {humbergerBody: false};

    onLogoutclicked = () => {
        localStorage.clear();
        return <Redirect to='/'/>

    };

    isAuthnticated = () => {
        if (this.props.getToken()) {
            return (
                <List>
                    <ListItem><Button href='/'>Home</Button> </ListItem>
                    <ListItem>
                        <Button href='/userdashboard' style={{backgroundColor: '#393232'}}>
                            Dashboard
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button href='/' variant='outlined'
                                style={{border: ' 1px solid #F2EDD7'}}
                                onClick={this.onLogoutclicked}>Logout</Button></ListItem>
                </List>
            )
        } else {
            return (
                <List>
                    <ListItem>
                        <Button href='/'>Home</Button>
                    </ListItem>
                    <ListItem>
                        <Button href='/login' style={{backgroundColor: 'rgba(58,99,81,0.89)'}}>
                            Submit Your Launch
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button href='/signup' variant='outlined'
                                style={{border: ' 1px solid #F2EDD7'}}>Login/Signup</Button></ListItem>
                </List>
            )
        }
    };

    onHumbergerClick = () => {
        if (this.state.humbergerBody === true) {
            document.getElementById('drawer').style.display = 'none';

            this.setState({humbergerBody: false})

        } else if (this.state.humbergerBody === false) {
            document.getElementById('drawer').style.display = 'block';
            this.setState({humbergerBody: true})
        }


    };

    iconChange = () => {
        if (this.state.humbergerBody === false) {
            return <MenuIcon/>
        } else if (this.state.humbergerBody === true) {
            return <CloseIcon/>
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <>
                <AppBar className={classes.root} position='static'>
                    <Toolbar>
                        <Grid container className={classes.logoContainer}>
                            <Grid item xs={6} sm={5} md={3} align='left'>
                                <Typography variant='h6'>ezmid</Typography>

                            </Grid>

                            <Grid item sm={1} md={4} />
                            <Grid item className={classes.hamburgerMenu} xs={6} align="right">
                                <div align='right'>
                                    <Button
                                        onClick={this.onHumbergerClick} id='humbergerButton'>
                                        {this.iconChange()}
                                    </Button>
                                </div>
                            </Grid>


                            <Grid item xs={12} md={5} align='right' id='drawer'
                                  className={classes.menuContainer}>
                                {this.isAuthnticated()}
                            </Grid>
                        </Grid>
                    </Toolbar>

                </AppBar>
            </>
        );
    }

}

export default withStyles(useStyles)(withWidth()(Navtabs));
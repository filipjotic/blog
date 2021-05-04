import React from 'react';
import {Box, Grid, Typography, withStyles} from '@material-ui/core';
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from '@material-ui/icons/Email';

const useStyles = theme => ({});


class AccountInfo extends React.Component {

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item md={6} style={{marginBottom: '5px'}}>
                        <Typography variant='h5' style={{
                            display: 'inline'
                        }}> Account
                            Info</Typography>
                    </Grid>

                    <Grid item md={6} align='right'>

                    </Grid>

                </Grid>
                <Box container style={{
                    marginTop: '-2px',
                    paddingBottom: '10px',
                    backgroundColor: '#f2edd7',
                    boxShadow: '-9px 9px 16px rgba(0, 0, 0, 0.05)',
                    borderRadius: '5px'
                }}>
                    <div>
                        <div style={{
                            marginBottom: '20px',
                            marginTop: '3px',
                            marginLeft: '15px',
                            paddingTop: '20px'
                        }}>

                            <PersonIcon fontSize="inherit" style={{
                                background: '#F2EDD7',
                                color: '#E48257',
                                marginRight: '5px',
                                marginBottom: '-3px',
                                fontSize: '15px',
                                borderRadius: '4px',
                            }}/>

                            <Typography variant='h6' style={{display: 'inline', fontSize: '16px'}}>Name</Typography>
                            <div style={{marginLeft: '20px',}}>{this.props.name}</div>
                        </div>
                        <div style={{marginBottom: '20px', marginLeft: '15px'}}>

                            <EmailIcon fontSize="inherit" style={{
                                background: '#F2EDD7',
                                color: '#E48257',
                                marginRight: '5px',
                                marginBottom: '-3px',
                                fontSize: '15px',
                                borderRadius: '4px',
                            }}/>

                            <Typography variant='h6'
                                        style={{display: 'inline', fontSize: '16px'}}>Email</Typography>
                            <div style={{marginLeft: '20px'}}>{this.props.email}</div>
                        </div>

                    </div>
                </Box>
            </div>
        );
    }

}

export default withStyles(useStyles)(AccountInfo);
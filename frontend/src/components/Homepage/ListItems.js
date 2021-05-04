import React from 'react';
import {Box, Card, CardContent, Grid, Typography, withStyles} from "@material-ui/core";
import moment from "moment";
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = (theme) => ({

    PremiumCardTitle: {
        background: 'rgba(58,99,81,0.31)',
        marginBottom: '20px',
        width: '233px ',
        marginTop: '-10px',
        height: '86px ',
        borderRadius: '0px 0px 100px 100px',
        borderBottom: '0px solid #F2EDD7',
        borderLeft: '10px solid #F2EDD7',
        borderRight: '10px solid #F2EDD7',

        "& span": {
            position: 'relative',
            top: '20px'
        }
    },
    otherLauchesCardTitle: {
        marginBottom: '20px',
        width: '233px ',
        marginTop: '-10px',
        height: '86px ',
        borderRadius: '5px',
        "& span": {
            position: 'relative',
            top: '20px'
        }
    },
    card: {
        backgroundColor: '#F2EDD7',

        marginBottom: '30px',
        marginTop: '10px',
        boxShadow: ' -9px 9px 16px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px',

    },
    listCard: {
        margin: '10px 30px',

        height: '104px',
        backgroundColor: 'rgba(228, 130,87, 0.2)',
        marginBottom: '10px',

        border: '0.5px solid rgba(228, 130, 87, 0.6)',
        boxSizing: 'border-box',
        borderRadius: '5px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            minHeight: '175px',
        }

    },
    listCardContent: {},
    cardDate: {

        color: "#393232",
        opacity: 0.8,
        borderRadius: '5px',
        width: '45px',
        marginTop: '5px',
        padding: '7px 0px',
        textAlign: 'center',
        fontSize: '10px',
        lineHeight: '14px',
    },
    listCardTitle: {
        color: '#393232',
        fontWeight: 800,
        fontSize: '18px',
        lineHeight: '26px',
        overflow: 'hidden',
        maxHeight: '30px',
        [theme.breakpoints.down('sm')]: {
            overflow: 'visible',
            maxHeight: '50px'

        },
    },
    smallText: {
        fontSize: '10px',
        lineHeight: '14px'
    },
    listCardSubTitle: {
        opacity: '0.5',
        display: 'inline',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    listCardLorem: {
        wordBreak: 'break-all',
        color: '#393232',
        fontWeight: 'normal',
        fontSize: '10px',
        lineHeight: '14px',
        maxHeight: '30px',
        height: '30px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '42px',
        },

    },
    listCardLeft: {
        backgroundColor: 'rgba(57,50,50,0.05)',
        margin: '-5px 0px 0px 0px',
        padding: '10px 10px 10px 25px',
        borderRadius: '5px',
        [theme.breakpoints.down('sm')]: {
            height: '47px',
        }
    },
    listCardFooter: {
        marginTop: '10px',
        marginBottom: '10px',
        opacity: '0.5',
        fontWeight: 'normal',
        fontSize: '10px',
        lineHeight: '14px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '5px'
        }

    },
    centerPartCard: {
        paddingLeft: '10px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '25px',

        }

    },
    promoteButton: {
        background: '#3A6351',
        borderRadius: '5px',
        marginLeft: '5px',
        fontStyle: 'normal',
        fontSize: '12px',
        fontWeight: '600',
        lineHeight: '14px',
        color: '#F2EDD7',
        height: '25px',
        width: '73px',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '30px',
            marginTop: '5px'

        },
        "&:hover": {
            background: 'rgb(37,64,48)'
        }
    },

});

class ListItems extends React.Component {


    render() {
        const {classes} = this.props;

        return (
            <div>
                <Grid item md={12} className={classes.card}>

                    <Box align='center'>
                        <Typography variant='h6' component='h6' className={classes.PremiumCardTitle}>
                            <span>ezmid</span></Typography>
                    </Box>

                    {this.props.getArticleDocs ? this.props.getArticleDocs.map((row) => {


                        return (
                            <Card className={classes.listCard} key={row._id}>

                                <ButtonBase href={'/detail/' + row._id}
                                            style={{display: 'block', textAlign: 'initial'}}>
                                    <CardContent classNmae={classes.listCardContent}
                                                 style={{padding: '0px', margin: '10px'}}>
                                        <Grid container>
                                            <Grid item xs={11} className={classes.centerPartCard}>
                                                <Box className={classes.listCardTitle}><Typography variant="h6"
                                                >
                                                    {row.articleTitle}
                                                    <Typography variant='caption' color='textSecondary'
                                                                className={classes.listCardSubTitle}>&nbsp; &nbsp;  by {row.ownerName}
                                                    </Typography>
                                                </Typography></Box>
                                                <Typography variant='body2' className={classes.listCardLorem}>
                                                    {row.articlePerex}
                                                </Typography>
                                                <Typography variant='body2' color='textSecondary'
                                                            className={classes.listCardFooter}><span
                                                    className={classes.cardDate}>
                                                {moment(row.dateCreated).format('D MMM ')}
                                            </span>
                                                        &nbsp; | {row.listingType}</Typography>
                                            </Grid>


                                        </Grid>

                                    </CardContent></ButtonBase>

                            </Card>
                        )
                    }) : <div> Loading</div>}
                    <br/><br/>

                </Grid>
            </div>
        );
    }

}

export default withStyles(useStyles)(ListItems);
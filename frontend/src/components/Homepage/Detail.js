import React from 'react';
import {Grid, Typography, withStyles} from "@material-ui/core";
import moment from "moment";

import backEndApi from '../api/api';

const useStyles = theme => ({
    root: {
        marginTop: '20px',
        marginLeft: '16px',
        "& input[type=number]": {
            "&::-webkit-inner-spin-button": {
                '-webkit-appearance': 'none',
            },
            "&::-webkit-outer-spin-button": {
                '-webkit-appearance': 'none',
            },
            '-moz-appearance': 'textField'
        },
        "& .MuiTypography-body2": {
            fontWeight: 800
        },
    },
    firstGrid: {
        /* background: '#F2EDD7',*/
        borderRadius: '5px',
        justifyContent: 'center'
    },
    firstGridContent: {
        background: '#F2EDD7',
        boxShadow: '-9px 18px 16px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px',
        justifyContent: 'center'
    },

    articleContent: {
        overflow: 'hidden'
    },

    articleDetail: {
        margin: '20px'
    },
    articleBody: {
        margin: '20px',
        wordBreak: 'break-all'
    }
});


class Detail extends React.Component {
    state = {listItem: ''};
    componentDidMount = async () => {
        const response = await backEndApi.get('/detail', {params: {id: this.props.match.params.id}});
        this.setState({listItem: response.data[0]})
        console.log(response.data[0]);

    };


    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant='h5' align={'center'} style={{
                    marginBottom: '30px',
                    marginTop: '35px',
                    marginLeft: '-15px'
                }}>{this.state.listItem.articleTitle}</Typography>

                <Grid container className={classes.firstGrid} spacing={4}>

                    <Grid item xs={12} md={6} className={classes.firstGridContent}>
                        <div className={classes.articleContent}>
                            <div className={classes.articleDetail}><h2>{this.state.listItem.articleTitle}</h2></div>
                            <div className={classes.articleDetail}>by:&nbsp;{this.state.listItem.ownerName}&nbsp;</div>
                            <div className={classes.articleDetail}>
                                {moment(this.state.listItem.dateCreated).format('D MMM')}&nbsp; |
                                &nbsp;{this.state.listItem.listingType}
                            </div>
                            <div className={classes.articleBody}>
                                <div>
                                    {this.state.listItem.articlePerex}
                                </div>
                                <br/><br/>
                                <div>
                                    {this.state.listItem.articleBody}

                                </div>
                            </div>


                        </div>
                    </Grid>

                </Grid>
            </div>

        );
    }


};


export default withStyles(useStyles)(Detail);
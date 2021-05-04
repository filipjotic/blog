import React from 'react';
import {Box, Button, Grid, IconButton, Typography, withStyles} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";

import backEndApi from "../api/api";
import AccountInfo from "./AccountInfo";

const useStyles = theme => ({
    root: {
        marginTop: '20px',
    },
    table: {
        minWidth: 650,
    },
    tableContainer: {
        padding: '12px',
        borderRadius: '5px',
        backgroundColor: '#F2EDD7',

    },
    margin: {
        margin: '5px',
        fontSize: '15px',
        borderRadius: '4px',
        "&:hover": {backgroundColor: '#3A6351'},
    },
    iconBackgroundRed: {
        backgroundColor: 'rgba(228,130,87,0.21)'
    },
    deleteIcon: {
        color: '#F24545'
    },
    editIcon: {
        color: '#E48257'

    },
    iconBackgroundBlack: {
        backgroundColor: 'rgba(57,50,50,0.2)'
    },
});


class userDashboard extends React.Component {
    state = {articleDocs: [], isSwitchOn: false};
    componentDidMount = async () => {
        const config = {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('token'))?.token
            }
        };
        const response = await backEndApi.get('/dashboard', config);

        if (response.data && !response.data.error) {
            this.setState({articleDocs: response.data});
        }

    };
    onDeleteClicked = async (id) => {
        await backEndApi.delete('/removeArticle', {params: {id: id}});
        window.location.reload(false)
    };

    render() {
        if (!this.state.articleDocs) {
            window.location.reload();
        }

        const {classes} = this.props;

        console.log('dfsfd', this.state.articleDocs)

        const articleRow = () => (
            this.state.articleDocs && this.state.articleDocs.length > 0
                ? this.state.articleDocs.map((row) => (
                    <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                            {row.articleTitle}
                        </TableCell>


                        <TableCell style={{textAlign: 'center'}}>{row.listingType}</TableCell>
                        <TableCell style={{textAlign: 'center'}}>

                            {moment(row.dateCreated).format('D MMM yyyy')}

                        </TableCell>
                        <TableCell style={{textAlign: 'center'}}>
                            <div>
                                <IconButton aria-label="delete"
                                            className={[classes.margin, classes.iconBackgroundRed]}
                                            size="small"
                                            href={"/editListing/" + row._id}

                                >
                                    <EditIcon fontSize="inherit" className={classes.editIcon}/>
                                </IconButton>
                                <IconButton aria-label="delete"
                                            className={[classes.margin, classes.iconBackgroundRed]}
                                            size="small" onClick={() => {
                                    this.onDeleteClicked(row._id)
                                }}>
                                    <DeleteIcon fontSize="inherit" className={classes.deleteIcon}/>
                                </IconButton>


                                <IconButton
                                    className={[classes.margin, classes.iconBackgroundBlack]}
                                    size='small' href={'/detail/' + row._id}>
                                    <VisibilityIcon fontSize="inherit"/>
                                </IconButton>


                            </div>
                        </TableCell>
                    </TableRow>))
                :
                ""
        );

        return (
            <Grid container className={classes.root} spacing={4}>
                <Grid item md={this.state.articleDocs[0] ? 9 : 12}>
                    <Box>
                        <Grid container style={{marginBottom: '5px'}}>
                            <Grid item xs={3} md={3}>
                                <Typography variant='h5'>Your Articles</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}/>
                            <Grid item xs={3} md={3} align='right'>
                                <Button href='/newListing' style={{
                                    background: '#3A6351',
                                    textTransform: 'none',
                                    color: '#F2EDD7',
                                    borderRadius: '5px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                }}>+ Add new Article</Button>
                            </Grid>
                        </Grid>
                        <Box><TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant='h6' style={{fontSize: '16px'}}>Article
                                                Title</Typography>
                                        </TableCell>


                                        <TableCell style={{textAlign: 'center'}}><Typography variant='h6'
                                                                                             style={{fontSize: '16px'}}>Article
                                            Type</Typography></TableCell>
                                        <TableCell style={{textAlign: 'center'}}>
                                            <Typography variant='h6' style={{fontSize: '16px'}}>Created
                                                Date</Typography>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}} align='justify'><Typography
                                            variant='h6' style={{fontSize: '16px'}}>Action</Typography></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {articleRow()}
                                </TableBody>
                            </Table>
                        </TableContainer></Box>
                    </Box>
                </Grid>
                {this.state.articleDocs[0] && (
                    <Grid item md={3} style={{marginTop: '2px'}}>
                        <AccountInfo
                            name={this.state.articleDocs[0].ownerName}
                            email={this.state.articleDocs[0].ownerEmail}
                        />
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(userDashboard);
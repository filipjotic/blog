import React from 'react';
import {Button, Grid, Typography, withStyles} from '@material-ui/core';
import {Redirect} from "react-router-dom";
import backEndApi from '../api/api'

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
    input: {
        padding: '10px',
        marginTop: '5px',
        width: '100%',
        height: '40px',
        borderRadius: '5px',
        border: '0.5px solid #E48257',
        background: '#F2EDD7',
        "&::-webkit-input-placeholder": {
            color: 'rgba(57,50,50,0.3)'
        },

        "&::-moz-placeholder": { /* Firefox 19+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-ms-input-placeholder": { /* IE 10+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-moz-placeholder": { /* Firefox 18- */
            color: 'rgba(57,50,50,0.3)'

        },

    },
    dataPicker: {
        "& .react-datepicker-wrapper": {
            display: 'block',
        },
        "& input": {},


    },
    textarea: {
        padding: '10px',
        resize: 'vertical',
        width: '100%',
        background: '#F2EDD7',
        border: '0.5px solid rgba(228, 130, 87, 0.8)',
        borderRadius: '5px',
        height: '120px',
        "&::-webkit-input-placeholder": {
            color: 'rgba(57,50,50,0.3)'
        },

        "&::-moz-placeholder": { /* Firefox 19+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-ms-input-placeholder": { /* IE 10+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-moz-placeholder": { /* Firefox 18- */
            color: 'rgba(57,50,50,0.3)'

        },
    },
    inputsContainer: {
        margin: '15px'
    },
    dropZone: {
        "& .MuiDropzoneArea-root": {
            background: '#F2EDD7',
            marginBottom: '30px',
            maxHeight: '243',
            height: '210px',
            minHeight: '200px',
            border: '.5px solid rgba(228, 130, 87, 0.8)',

        },
        "& .MuiTypography-h5": {
            fontSize: '14px',
            fontWeight: 'normal'
        },
        "& .MuiDropzoneArea-text": {
            marginTop: '130px',
            color: '#E48257'
        },
        "& .MuiSvgIcon-root": {
            display: 'flex',
            marginTop: '-100px',
            marginLeft: '110px',
            color: "#E48257"
        }
    },
    inputError: {
        color: 'red',
        fontSize: '14px',
        display: 'none',
    },
});

class NewListing extends React.Component {
    state = {
        articleTitle: '',
        articleBody: '',
        listingType: '',
        articleId: '',
        errorMessage: '',
        articlePerex: '',
        isRedirectToHomepage: false,
        submitValue: '',
    };
    characterCounter = 144;

    componentDidMount = async () => {
        const {data} = await backEndApi.get('/editedArticle', {params: {id: this.props.match.params.id}});
        this.setState({
            articleId: data._id,
            articlePerex: data.articlePerex,
            articleTitle: data.articleTitle,
            articleBody: data.articleBody,
            listingType: data.listingType,

        });

    };

    onFormSubmit = (e) => {
        console.log(e.currentTarget.value);
        e.preventDefault();

        this.validateForm(e);
    };

    validateForm = (e) => {
        const article = {
            id: this.state.articleId,
            name: this.state.articleTitle,
            description: this.state.articleBody,
            category: this.state.listingType,
            articlePerex: this.state.articlePerex,

        };

        if (!this.state.articleTitle) {
            document.getElementById('NameError').style.display = 'block';
        }
        if (!this.state.articleBody) {
            document.getElementById('descriptionError').style.display = 'block';
        } else if (this.state.articleBody.length < 1) {
            document.getElementById('descriptionError').style.display = 'block';
        }
        if (!this.state.listingType) {
            document.getElementById('categoryError').style.display = 'block';
        }

        if (this.state.articleTitle && this.state.articleBody &&
            this.state.listingType && this.state.articleBody.length > 1) {

            this.submitNewListingApiRequest(article);


        } else {
            //for not yet validated
            console.log("Form Not Validated")
        }

    };


    submitNewListingApiRequest = async (newLaunchDetails) => {

        await backEndApi.post('/editedArticleUpdate', {params: newLaunchDetails});

        this.setState({isRedirectToHomepage: true,})

    };

    onArticleTitleChanged = (e) => {
        if (e.target.value.length === 0) {

            document.getElementById('NameError').style.display = 'block';
        } else {
            document.getElementById('NameError').style.display = 'none';

        }
        this.setState({articleTitle: e.target.value})
    };

    onArticleBodyChanged = (e) => {
        this.characterCounter = 144 - this.state.articleBody.length;
        if (this.characterCounter < 1) {
            document.getElementById('remainingCharacter').style.display = 'none';
            document.getElementById('descriptionError').style.display = 'none';
        } else if (this.characterCounter > 0) {
            document.getElementById('descriptionError').style.display = 'block';
            document.getElementById('remainingCharacter').style.display = 'block';

        } else {
            document.getElementById('descriptionError').style.display = 'none';

        }
        this.setState({articleBody: e.target.value})
    };
    onArticlePerexChanged = (e) => {
        this.setState({articlePerex: e.target.value})
    };

    onSelectChanged = (e) => {
        if (e.target.value === 'Select Article Category') {
            document.getElementById('categoryError').style.display = 'block';

        } else {
            document.getElementById('categoryError').style.display = 'none';
        }
        this.setState({listingType: e.target.value})
    };


    render() {
        const {classes} = this.props;

        if (!this.props.getToken()) {
            return <Redirect to='/login'/>
        }
        if (this.state.isRedirectToHomepage) {
            return <Redirect to='/userdashboard'/>
        }

        return (
            <div className={classes.root}>
                <Typography variant='h5' align={'center'}
                            style={{marginBottom: '30px', marginTop: '35px', marginLeft: '-15px'}}>Edit
                    Article</Typography>

                <Grid container className={classes.firstGrid} spacing={4}>

                    <Grid item xs={12} md={6} className={classes.firstGridContent}>
                        <form>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>Article Title</Typography>
                                <input type="text" name='Myname' placeholder='Enter Article Title'
                                       className={classes.input}
                                       onChange={this.onArticleTitleChanged}
                                       value={this.state.articleTitle}
                                />
                                <Typography variant='body2' id='NameError' className={classes.inputError}>You have not
                                    entered a article Name.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>Article Perex</Typography>
                                <textarea className={classes.textarea} placeholder='Enter Article Perex'
                                          style={{marginTop: '5px',}} onChange={this.onArticlePerexChanged}
                                          value={this.state.articlePerex}
                                />
                                <Typography variant='body2'>Article body</Typography>
                                <textarea className={classes.textarea} placeholder='Enter Article Body'
                                          style={{marginTop: '5px',}} onChange={this.onArticleBodyChanged}
                                          value={this.state.articleBody}
                                />
                                <Typography variant='body2' align='right' id='remainingCharacter'
                                            style={{
                                                color: '#E48257',
                                                display: 'none'
                                            }}>({this.characterCounter} Characters
                                    Remaining)</Typography>
                                <Typography variant='body2' id='descriptionError' className={classes.inputError}>You
                                    have to write a description not less than 144 character.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>Article Category</Typography>

                                <select className={classes.input} onChange={this.onSelectChanged}
                                        value={this.state.listingType}>
                                    <option value="Select Article Category" disabled selected>Select Article Categories
                                    </option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Software As A Service">Software As A Service</option>
                                    <option value="Fitness & Health">Fitness & Health</option>
                                    <option value="Personal Development">Personal Development</option>
                                    <option value="Spirituality">Spirituality</option>
                                    <option value="Trading & Investments">Trading & Investments</option>
                                    <option value="Love, Sex & Dating">Love, Sex & Dating</option>
                                    <option value="Others">Others</option>
                                </select>
                                <Typography variant='body2' id='categoryError' className={classes.inputError}>you have
                                    to
                                    select article category.</Typography>
                            </div>
                            <div align='right'>
                                <Button onClick={this.onFormSubmit} value='Pending' variant='contained' style={{
                                    paddingLeft: '50px', paddingRight: '50px', background: '#E48257',
                                    borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                                }}> Update</Button>
                            </div>

                        </form>
                    </Grid>

                </Grid>
            </div>
        );
    }

}

export default withStyles(useStyles)(NewListing);




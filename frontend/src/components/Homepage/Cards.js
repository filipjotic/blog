import React from 'react';
import {Box, Grid} from '@material-ui/core/index';

import backEndApi from '../api/api'
import ListItems from "./ListItems";
import Filter from "./Filter";


class Cards extends React.Component {
    state = {articleDocs: []};

    componentDidMount = async () => {
        const response = await backEndApi.get('/homepage');
        console.log(response.data);
        this.setState({articleDocs: response.data})
    };

    setArticleDocs = (articleDocs) => {
        this.setState({articleDocs: articleDocs})

    };

    getArticleDocs = () => {
        return this.state.articleDocs;
    };


    render() {


        return (
            <Box>
                <Grid container spacing={3} style={{justifyContent:'flex-end'}}>
                    <Grid item md={7}>
                        <ListItems getArticleDocs={this.getArticleDocs()}/>
                    </Grid>
                    <Grid item md={4}>
                        <Filter setArticleDocs={this.setArticleDocs}/>
                    </Grid>
                </Grid>
            </Box>

        );
    }

}

export default Cards;
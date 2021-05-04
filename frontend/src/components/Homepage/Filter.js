import React from 'react';
import {Card, CardContent, Typography, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import backEndApi from '../api/api';

const useStyles = (theme) => ({
    topRightCard: {
        backgroundColor: '#F2EDD7',
        boxShadow: '-9px 9px 16px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px',
    },


});

class Filter extends React.Component {

    onButtonClicked = async (e) =>{
        console.log(e.target.innerText);
        const response = await backEndApi.get('/categoryFilter', {params: {filterSelected: e.target.innerText}});
        this.props.setArticleDocs(response.data)

    };

    render() {
        const {classes} = this.props;
        const filterTypes = ['Fitness & Health','Digital Marketing','Spirituality','Personal Development','Digital Wealth Creation','Software As A Service','Trading & Investments','Love, Sex & Dating'];

        return (

            <Card className={classes.topRightCard}><CardContent>
                <Typography variant='h6' component={'p'} align='center'> Discover More Or What Matters To You</Typography>
                <CardContent>
                    {filterTypes.map((filterType)=>{
                        return <Button key={filterType} variant="text" value={filterType} onClick={this.onButtonClicked} component={'span'} style={{textTransform:'none'}}>{filterType}</Button>
                    })}
                </CardContent>
            </CardContent>
            </Card>

        );
    }

}

export default withStyles(useStyles)(Filter);
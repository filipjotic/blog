import React from 'react'
import {Box, Container} from "@material-ui/core/index";

import Cards from './Cards'

class HomePage extends React.Component {

    render() {

        return (
            <Container maxWidth="lg">
                <Box>
                    <Cards/>
                </Box>
            </Container>
        );
    }

}

export default HomePage;
import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveGrid from "../component/responsiveGrid/ResponsiveGrid";

class Home extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return <ResponsiveGrid />
    }
}

Home.propTypes = {

};

export default Home;
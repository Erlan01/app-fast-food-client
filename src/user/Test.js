import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {test} from "../util/APIUtils";

class Test extends Component {
    componentDidMount() {
        test().then(res => {
            this.setState({colors: res})
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            colors: []
        }
    }

    render() {
        const {colors} = this.state;

        return (
            <div>
                {colors.map(c =>
                    <p style={{backgroundColor: c}}>{c}</p>
                )}
                <div>dd</div>
            </div>
        );
    }
}

Test.propTypes = {};

export default Test;
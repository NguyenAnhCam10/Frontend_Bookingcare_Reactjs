import React, { Component } from 'react';
import { connect } from "react-redux";

// import './DefaultClass.scss'

import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getExtraInforDocTorById } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    async componentDidMount() {

        if (this.props.doctorId) {
            let res = await getExtraInforDocTorById(this.props.doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        console.log(this.props.doctorId, prevProps.doctorId)


        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getExtraInforDocTorById(this.props.doctorId)
            console.log('check doctor id', res.data)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }

    }

    render() {

        console.log(this.state)
        return (
            <div></div>
        )
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);

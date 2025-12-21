import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

import specialtyImg from "../../../assets/specialty/coxuongkhop.png"
import { getAllSpecialty } from "../../../services/userService"
class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();

        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    render() {
        let { dataSpecialty } = this.state

        return (
            <div className='section-share section-specialty'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>< FormattedMessage id='homepage.specialty'></FormattedMessage></span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-infor'></FormattedMessage> </button>
                    </div>
                    <div className='section-mid'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='specialty-body' key={index}>
                                            <div className="img-container">
                                                <img src={item.image} />
                                            </div>

                                            <div>{item.name}</div>
                                        </div>
                                    )
                                })}


                        </Slider>
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

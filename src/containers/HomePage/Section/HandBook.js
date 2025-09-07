import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

import handbookImg from "../../../assets/handbook/camnang.jpg"
class HandBook extends Component {

    render() {

        return (
            <div className='section-share handbook'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>XEM THÊM </button>
                    </div>
                    <div className='section-mid'>
                        <Slider {...this.props.settings}>
                            <div className='specialty-body'>
                                <div className="img-container handbook">
                                    <img src={handbookImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container">
                                    <img src={handbookImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>

                            <div className='specialty-body'>
                                <div className="img-container">
                                    <img src={handbookImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container">
                                    <img src={handbookImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container">
                                    <img src={handbookImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);

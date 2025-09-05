import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import medalImg from "../../../assets/section-medical-facility/ChoRay.jpg"
class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật</span>
                        <button className='btn-section'>XEM THÊM </button>
                    </div>
                    <div className='section-mid'>
                        <Slider {...this.props.settings}>
                            <div className='specialty-body'>
                                <div className="img-container MedicalFacility">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container MedicalFacility">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container MedicalFacility">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container MedicalFacility">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container MedicalFacility">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container MedicalFacility">
                                    <img src={medalImg} />
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);

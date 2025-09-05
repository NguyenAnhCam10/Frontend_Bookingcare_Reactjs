import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import medalImg from "../../../assets/out-standing-doctor/doctor1.png"
class OutStandingDoctor extends Component {

    render() {

        return (
            <div className='section-share out-standing-doctor'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>XEM THÊM </button>
                    </div>
                    <div className='section-mid'>
                        <Slider {...this.props.settings}>
                            <div className='specialty-body'>
                                <div className="img-container OutStandingDoctor">
                                    <img src={medalImg} />
                                </div>
                                <div className='position text-center' >
                                    <div>Giáo sư, Tiến sĩ Hoàng Mạnh Tường</div>
                                    <div>Cơ xương khớp</div>
                                </div>

                            </div>
                            <div className='specialty-body'>
                                <div className="img-container OutStandingDoctor">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container OutStandingDoctor">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container OutStandingDoctor">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container OutStandingDoctor">
                                    <img src={medalImg} />
                                </div>

                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='specialty-body'>
                                <div className="img-container OutStandingDoctor">
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);

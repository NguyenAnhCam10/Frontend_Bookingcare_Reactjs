import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import medalImg from "../../../assets/out-standing-doctor/doctor1.png"
import * as actions from '../../../store/actions'
class OutStandingDoctor extends Component {

    componentDidMount() {
        this.props.loadTopDoctor();
    }

    render() {
        console.log('check props docto: ', this.props.topDoctorsRedux)
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
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);

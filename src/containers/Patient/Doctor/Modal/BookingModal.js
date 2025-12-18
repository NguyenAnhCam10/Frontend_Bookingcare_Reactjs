import React, { Component } from 'react';
import { connect } from "react-redux";

import './BookingModal.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {


    }



    render() {
        let { isOpenModal, closeModalBooking, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''
        return (
            // toggle={ }
            <div>
                <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                    size="lg" centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span className='right' onClick={closeModalBooking}><i class="fa-solid fa-xmark"></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Họ tên:</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại:</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ email:</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ liên hệ:</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Lý do khám:</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Đặt cho ai:</label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Giới tính:</label>
                                    <input className='form-control'></input>
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm' onClick={closeModalBooking}> Xác nhận</button>
                            <button className='btn-booking-cancel' onClick={closeModalBooking}>Trở về</button>
                        </div>
                    </div>
                </Modal>


            </div>

        )
    }
};

const mapStateToProps = state => {
    return {

        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

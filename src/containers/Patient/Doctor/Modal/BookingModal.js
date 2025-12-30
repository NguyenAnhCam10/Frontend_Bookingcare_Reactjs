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
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { postPatientBookAppointment } from "../../../../services/userService"
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: "",
            email: "",
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',
            date: ''

        }

    }

    async componentDidMount() {
        this.props.getGenders()

    }
    buildDataGender = (data) => {
        let result = []
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        // if (this.props.dataTime !== prevProps.dataTime) {
        //     if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        //         let doctorId = this.props.dataTime.doctorId;
        //         let date = this.props.dataTime.date;
        //         let timeType = this.props.dataTime.timeType
        //         this.setState({
        //             doctorId: doctorId,
        //             date: date,
        //             timeType: timeType

        //         })
        //     }
        // }

    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });

    }



    buildTimeBooking = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} ${date}`



        }
        return ''


    }

    buildDotorName = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name

        }
    }
    handleConfirmBooking = async () => {
        const { dataTime } = this.props;
        let timeString = this.buildTimeBooking(dataTime)
        let doctorName = this.buildDotorName(dataTime)
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,

            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: dataTime.date,
            doctorId: dataTime.doctorId,
            timeType: dataTime.timeType,
            selectedGender: this.state.selectedGender.value,
            genders: this.state.genders,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,


        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment success')
            this.props.closeModalBooking()
        } if (res && res.errCode === 2) {
            toast.error("You can only book one appointment per day.")
        }
        if (res && res.errCode === 1) {
            toast.error('Booking faild!')
        }
        console.log('thay doiree', this.state)

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
                            <span className='left'><FormattedMessage id="patient.booking-modal.infor-app" /></span>
                            <span className='right' onClick={closeModalBooking}><i class="fa-solid fa-xmark"></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.name" /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.number" /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Email:</label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    >

                                    </input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    ></input>
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className='form-control'
                                        value={this.state.birthday}
                                    />                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm' type="button" onClick={() => this.handleConfirmBooking()}>
                                <FormattedMessage id="patient.booking-modal.comfirm" /></button>
                            <button className='btn-booking-cancel' onClick={closeModalBooking}>

                                <FormattedMessage id="patient.booking-modal.cancel" />
                            </button>
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
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

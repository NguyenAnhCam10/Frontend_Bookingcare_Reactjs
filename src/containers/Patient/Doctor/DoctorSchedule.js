import React, { Component } from 'react';
import { connect } from "react-redux";

import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }

    }
    capitalizeFristLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    async componentDidMount() {
        let { language, doctorId } = this.props;
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFristLetter(labelVi)


            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd-DD/MM");

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        })
        if (doctorId) {
            let today = allDays[0].value; // ngày hôm nay
            let res = await getScheduleDoctorByDate(doctorId, today);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data || []
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = []
            for (let i = 0; i < 7; i++) {
                let object = {};
                if (this.props.language === LANGUAGES.VI) {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFristLetter(labelVi)

                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");

                }
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
                allDays.push(object);
            }
            this.setState({
                allDays: allDays,
            })
        }
    }
    handleOnChangeSelect = async (event) => {

        if (this.props.doctorId) {
            let doctorId = this.props.doctorId
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log(' event chang: ', res)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            } else {

            }
        }
        else {
            console.log('Không tìm thấy id doctor')
        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeModalBooking = () => {
        this.setState({
            isOpenModalBooking: false,


        })
    }

    render() {
        let { allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state
        let { language } = this.props

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => { this.handleOnChangeSelect(event) }}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}> {item.label}</option>
                                )
                            })}


                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fa-solid fa-calendar-days'></i> <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>

                        </div>
                        <div className='time-content'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvalableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                    key={index}>{timeDisplay}</button>
                                            )
                                        })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className="fa-regular fa-hand-point-up"></i> <FormattedMessage id="patient.detail-doctor.book" /></span>
                                    </div>
                                </>
                                : <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>


                            }

                        </div>
                    </div>
                </div >
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeModalBooking={this.closeModalBooking}
                    dataTime={dataScheduleTimeModal}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

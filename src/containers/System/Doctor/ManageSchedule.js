import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate'
import { toast } from 'react-toastify';
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentData: '',
            rangTime: [],
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false
                    return item;
                })
            }
            this.setState({
                rangTime: data
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id
                result.push(object)
            })

        }
        return result
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });


    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentData: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        console.log('checj click', time)
        let { rangTime } = this.state;
        if (rangTime && rangTime.length > 0) {
            rangTime = rangTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
                return item;
            })
            this.setState({
                rangTime: rangTime
            })
        }
    }
    handleSaveSchedule = () => {
        let { rangTime, selectedDoctor, currentData } = this.state
        let result = [];
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!')
            return
        }
        if (!currentData) {
            toast.error('Invalid date!')
            return

        }
        let FormattedDate = moment(currentData).format(dateFormat.SEND_TO_SERVER)
        if (rangTime && rangTime.length > 0) {
            let selectedTime = rangTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {}
                    object.doctorId = selectedDoctor.value;
                    object.date = FormattedDate;
                    object.time = schedule.keyMap;
                    result.push(object)

                })

            } else {
                toast.error('Invalid selected time!')
                return;
            }
        }
        console.log('chyeck result ', result)
    }
    render() {
        let { rangTime } = this.state
        let { language } = this.props

        return (

            <div className='manage-schedule-container'>

                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group' >
                            <FormattedMessage id='manage-schedule.choose-doctor' />                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <FormattedMessage id='manage-schedule.choose-day' />                             <DatePicker onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentData[0]}
                                minDate={new Date()}

                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangTime && rangTime.length > 0 &&
                                rangTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : "btn btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >

                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id='manage-schedule.save-infor' />
                            </button>

                        </div>
                    </div>
                </div>
            </div>



        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

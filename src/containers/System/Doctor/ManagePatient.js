import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'

import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService'
import moment from 'moment';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }

    }

    async componentDidMount() {

        let { user } = this.props;
        let { currentData } = this.state;
        let formatedDate = new Date(currentData).getTime()

        this.getDataPaitent(user, formatedDate)

    }
    getDataPaitent = async (user, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentData: date[0]
        }, () => {

            let { user } = this.props;
            let { currentData } = this.state;
            let formatedDate = new Date(currentData).getTime()
            this.getDataPaitent(user, formatedDate)

        })
    }
    handleBtnConfirm = () => {

    }
    handleBtnRemedy = () => {

    }
    render() {
        let { dataPatient } = this.state
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lí bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            value={this.state.currentData}

                        />                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.patientDataPatient?.valueVi}</td>

                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button className='mp-btn-comfirn'
                                                        onClick={() => this.handleBtnConfirm()}>Xác nhận</button>
                                                    <button className='mp-btn-remedy'
                                                        onClick={() => this.handleBtnRemedy()}>Gửi hóa đơn</button>
                                                </td>

                                            </tr>
                                        )
                                    }
                                    ) : <tr>No data</tr>
                                }


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

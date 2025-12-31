import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'

import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemery } from '../../../services/userService'
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemeryModal: false,
            dataModal: {},
            isShowLoading: false
        }

    }

    async componentDidMount() {



        this.getDataPaitent()

    }
    getDataPaitent = async () => {
        let { user } = this.props;
        let { currentData } = this.state;
        let formatedDate = new Date(currentData).getTime()
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
        }, async () => {


            await this.getDataPaitent()

        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType
        }
        this.setState({
            isOpenRemeryModal: true,
            dataModal: data
        })
        console.log('check data', data)
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemeryModal: false,
            dataModal: {}
        })
    }
    sendRemery = async (dataFormModal) => {
        this.setState({
            isShowLoading: true
        })

        let res = await postSendRemery(dataFormModal);

        if (res) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remery success!')
            this.closeRemedyModal()
            await this.getDataPaitent();

        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send remery error!')

        }
    }

    render() {
        let { dataPatient, isOpenRemeryModal, dataModal } = this.state
        let { language } = this.props
        return (
            <>
                <LoadingOverlay active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
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
                                                let time = language === LANGUAGES.VI ? item.patientDataPatient.valueVi :
                                                    item.patientDataPatient.valueEn
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi :
                                                    item.patientData.genderData.valueEn
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>

                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button className='mp-btn-comfirn'
                                                                onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>

                                                        </td>

                                                    </tr>
                                                )
                                            }
                                            ) : <tr><td colSpan='6'>No data</td></tr>
                                        }


                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
                <RemedyModal
                    isOpenModal={isOpenRemeryModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemery={this.sendRemery}
                />

            </>
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

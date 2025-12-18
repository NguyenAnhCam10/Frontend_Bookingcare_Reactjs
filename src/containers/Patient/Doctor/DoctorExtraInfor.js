import React, { Component } from 'react';
import { connect } from "react-redux";

import './DoctorExtraInfor.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getExtraInforDocTorById } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: true,
            extraInfor: {}
        }

    }

    async componentDidMount() {

        if (this.props.doctorId) {
            let res = await getExtraInforDocTorById(this.props.doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        console.log(this.props.doctorId, prevProps.doctorId)


        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getExtraInforDocTorById(this.props.doctorId)
            console.log('check doctor id', res.data)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { language } = this.props
        let { isShowDetailInfor, extraInfor } = this.state
        console.log(this.state)
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.extra-infor-doctor.address" /></div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address' >
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <FormattedMessage id="patient.extra-infor-doctor.exam-fee" />

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumberFormat className='currency'

                                    value={extraInfor.priceTypeData.valueVi} displayType='text' thousandSeparator={true} suffix='VND' />
                            }
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                && <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueEn} displayType='text' thousandSeparator={true} suffix='$' />
                            }

                            <span className='detail' onClick={() => this.showHideDetailInfor(true)}>Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title_price'><FormattedMessage id="patient.extra-infor-doctor.exam-fee" /></div>
                            <div className='detail-infor'>

                                <div className='price'>
                                    <span className='left'><FormattedMessage id="patient.extra-infor-doctor.exam-fee-thuong" /></span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat className='currency'

                                                value={extraInfor.priceTypeData.valueVi} displayType='text' thousandSeparator={true} suffix='VND' />
                                        }
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                            && <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueEn} displayType='text' thousandSeparator={true} suffix='$' />
                                        }


                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.pay" />&nbsp;
                                {extraInfor?.paymentTypeData && language === LANGUAGES.VI &&
                                    extraInfor.paymentTypeData.valueVi
                                }
                                {extraInfor?.paymentTypeData && language === LANGUAGES.EN &&
                                    extraInfor.paymentTypeData.valueEn
                                }
                            </div>


                            <div className='hide-price'><span onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span></div>
                        </>
                    }


                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);

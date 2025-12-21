import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions'
import { push } from 'connected-react-router';
class OutStandingDoctor extends Component {


    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorsRedux || []
            })

            console.log('topDoctorsRedux', this.props.topDoctorsRedux);

        }
    }
    componentDidMount() {
        this.props.loadTopDoctor();
    }
    handleViewDetailDoctor = (doctor) => {
        console.log('view', doctor)
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    render() {
        let { language } = this.props;
        let arrDoctor = this.state.arrDoctor;
        console.log('check bs', arrDoctor)


        return (
            <div className='section-share out-standing-doctor'>
                <div className='section-content'>
                    <div className='section-header'>

                        <span className='title-section'><FormattedMessage id="homepage.outstanding-doctor" /></span>
                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className='section-mid'>
                        <Slider {...this.props.settings}>

                            {arrDoctor && arrDoctor.length > 0 &&

                                arrDoctor.map((item, index) => {


                                    let nameVi = `${item.positionData?.valueVi} ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData?.valueEn} ${item.firstName} ${item.lastName}`;

                                    let imageSrc = item.image
                                        ? item.image
                                        : 'https://via.placeholder.com/150';

                                    return (
                                        <div className='specialty-body' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className="img-container OutStandingDoctor">
                                                <img src={imageSrc} alt="doctor" />

                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div>Cơ xương khớp</div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </Slider>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));

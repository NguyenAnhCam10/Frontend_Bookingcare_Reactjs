import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)

    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fa-solid fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality" /> </b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health_facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.Select _hospital_clinic" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.good_doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.exam_package" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.health_check" /></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'> <i className="fa-solid fa-circle-question"></i><FormattedMessage id="homeheader.support" /></div>
                            <div className={language === LANGUAGES.VI ? "language-vi active" : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>

                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><FormattedMessage id="banner.title2" /></div>
                        <div className='search'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>

                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-regular fa-hospital"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child1" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-mobile-screen-button"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child2" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-hospital-user"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child3" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-microscope"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child4" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-person-dots-from-line"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child5" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-solid fa-tooth"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child6" /></div>
                            </div>
                        </div>

                    </div>


                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);

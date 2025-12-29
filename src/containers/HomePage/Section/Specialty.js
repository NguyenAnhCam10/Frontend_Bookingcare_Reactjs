import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import { getAllSpecialty } from "../../../services/userService"
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();

        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        let { dataSpecialty } = this.state

        return (
            <div className='section-share section-specialty'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>< FormattedMessage id='homepage.specialty'></FormattedMessage></span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-infor'></FormattedMessage> </button>
                    </div>
                    <div className='section-mid'>
                        {/* <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='specialty-body' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className="img-container">
                                                <img src={item.image} />
                                            </div>

                                            <div>{item.name}</div>
                                        </div>
                                    )
                                })}


                        </Slider> */}
                        <Slider {...this.props.settings}>
                            {dataSpecialty.map(item => (
                                <div key={item.id} className="specialty-body">
                                    <Link
                                        to={`/detail-specialty/${item.id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div className="img-container">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div>{item.name}</div>
                                    </Link>
                                </div>
                            ))}
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));

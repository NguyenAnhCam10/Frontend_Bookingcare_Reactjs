import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import medalImg from "../../../assets/section-medical-facility/ChoRay.jpg"
import { getAllClinic } from "../../../services/userService"
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic();

        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        let { dataClinics } = this.state
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế</span>
                        <button className='btn-section'>XEM THÊM </button>
                    </div>
                    <div className='section-mid'>
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    // return (
                                    //     <div className='specialty-body' key={index}
                                    //         onClick={() => this.handleViewDetailClinic(item)}
                                    //     >
                                    //         <div className="img-container MedicalFacility">
                                    //             <img src={item.image} alt={item.name} />
                                    //         </div>

                                    //         <div className='clinic-name'>{item.name}</div>
                                    //     </div>
                                    // )
                                    return (

                                        <div className='specialty-body' key={index}>

                                            <Link
                                                to={`/detail-clinic/${item.id}`}
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                <div className="img-container  MedicalFacility">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div>{item.name}</div>
                                            </Link>
                                        </div>
                                    )

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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));

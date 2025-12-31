import React, { Component } from 'react';
import { connect } from "react-redux";

import './RemedyModal.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import _ from 'lodash'
import { FormattedMessage } from 'react-intl';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            image: ''

        }

    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }


    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnChangEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: file   // 
            });
        }
    }
    handleSendRemery = () => {
        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('file', this.state.image);
        formData.append('doctorId', this.props.dataModal.doctorId);
        formData.append('patientId', this.props.dataModal.patientId);
        formData.append('timeType', this.props.dataModal.timeType);

        this.props.sendRemery(formData);
    }
    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemery } = this.props;

        return (

            // toggle={ }
            <div>
                <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                    size="md" centered
                >
                    <div className='Modal-header'>
                        <h5 className='modal-title'>Gửi hóa đơn khám bệnh</h5>
                        <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <Label>Email</Label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={this.state.email || ''}
                                    //disabled
                                    onChange={(event) => this.handleOnChangEmail(event)}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <Label>Chọn file đơn thuốc</Label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color='primary' onClick={() => this.handleSendRemery()}>Send</Button>
                        <Button color='secondary' onClick={closeRemedyModal}>Cancel</Button>
                    </ModalFooter>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);

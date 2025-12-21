import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'

import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { createNewSpecialty } from '../../../services/userService'

import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: ''

        }

    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState(stateCopy);
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })

    }
    handleOnChangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                image: file   // 
            });
        }
    }
    handleSaveNewSpecialty = async () => {

        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty success')

        } else {
            toast.error("Add new specialty faild")
            console.log('stat', this.state)
        }

    }
    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>
                    Quản lý chuyên khoa
                </div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group' >
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}></input>
                    </div>

                    <div className='col-12'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>

                    <div className='col-12'>
                        <button
                            className="btn-save-specialty"
                            type="button"
                            onClick={this.handleSaveNewSpecialty}
                        >
                            Save
                        </button>

                    </div>
                </div>


            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

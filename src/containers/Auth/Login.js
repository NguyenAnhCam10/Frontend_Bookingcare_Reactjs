import React, { Component, useReducer } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })

    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            console.log('data', data)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })

            }
            if (data && data.errCode === 0) {

                this.props.userLoginSuccess(data.user);
                console.log('succes!')
                // this.setState({
                //     errMessage: data.message
                // })

            }

        } catch (error) {
            // if (error.response){
            //     if(error.response.data){
            //         this.setState({
            //             errMessage: error.response.data.message
            //         })
            //     }
            // }
            // let errMsg = "Đăng nhập thất bại, vui lòng thử lại!";

            // if (error.response) {
            //     if (error.response.data && error.response.data.message) {
            //         errMsg = error.response.data.message;
            //     }
            // } else if (error.message) {
            //     errMsg = error.message; // lỗi mạng, server không chạy,...
            // }

            // this.setState({
            //     errMessage: errMsg
            // });

            console.log('anhcam', error.response)

        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword

        })
    }
    handleKyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }
    render() {


        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <h2 className='title'>Đăng nhập</h2>

                        <div className='form-group'>
                            <label>Tài khoản</label>
                            <input
                                type="text"
                                placeholder="Nhập username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control'
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKyDown(event)}


                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}
                                ><i className={this.state.isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i></span>

                            </div>

                        </div>
                        <div>
                            {this.state.errMessage}
                        </div>
                        <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        <div>
                            <span className='forgot-password'>Quên mật khẩu?</span>
                        </div>
                        <div>
                            <span className='text-center'>Or Login with:</span>
                        </div>
                        <div className='social-login'>
                            <i className="fa-brands fa-google"></i>
                            <i className="fa-brands fa-facebook"></i>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, creatNewUserService, deleteUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }
    handleNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    async componentDidMount() {

        await this.getAllUsersFormReact();
    }
    getAllUsersFormReact = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    creatNewuser = async (data) => {
        try {
            let response = await creatNewUserService(data);
            console.log('res', response)
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUsersFormReact();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (e) {
            console.log(e)
        }


    }
    handleDeleteUser = async (user) => {
        console.log('item', user)
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFormReact();
            } else {
                alert(res.message);
            }
        } catch (e) {
            console.log(e);

        }
    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (

            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    creatNewuser={this.creatNewuser}
                />
                <div className='title text-center'>Manage users</div>
                <div className='mx-3'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleNewUser()}
                    ><i class="fa-solid fa-plus"></i> Add new users</button>

                </div>
                <div className='users-table mt-4 mx-3'>

                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>

                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={item.id || index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i class="fa-solid fa-pencil"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}



                        </tbody>
                    </table>


                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

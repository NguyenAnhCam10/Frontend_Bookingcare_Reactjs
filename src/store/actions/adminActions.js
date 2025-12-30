import actionTypes from './actionTypes';
import {
    getAllCodeService, creatNewUserService, getTopDoctorHomeService, getAllUsers, deleteUserService, editUserService, getAllDoctors,
    saveDetailDoctorService, getAllSpecialty, getAllClinic

} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({

//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")

            if (res && res.errCode === 0) {

                dispatch(fetchGenderSuccess(res.data))

            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderErr: ", e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPostionStart = () => {

    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("POSITION")

            if (res && res.errCode === 0) {

                dispatch(fetchPositionSuccess(res.data))

            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchGenderErr: ", e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("ROLE")

            if (res && res.errCode === 0) {

                dispatch(fetchRoleSuccess(res.data))

            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchGenderErr: ", e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const creatNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await creatNewUserService(data);
            console.log('check create user', res)

            if (res && res.errCode === 0) {
                toast.success('Creat a new user succeed!')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())

            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("fetchGenderErr: ", e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('ALL');
            console.log('check adminAction', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FECTH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FECTH_TOP_DOCTOR_FAILDED
                })
            }


        } catch (e) {
            console.log('FECTH_TOP_DOCTOR_FAILDED: ', e)
            dispatch({
                type: actionTypes.FECTH_TOP_DOCTOR_FAILDED
            })
        }
    }
}
export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("All")

            if (res && res.errCode === 0) {

                dispatch(fetchAllUsersSuccess(res.users.reverse()))

            } else {
                toast.error('Fetch all user error!')

                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error('Fetch all user error!')

            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsersErr: ", e)
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FECTH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FECTH_ALL_USERS_FAILDED,

})
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserService(userId);


            if (res && res.errCode === 0) {
                toast.success('Delete the user succeed!')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())

            } else {
                toast.error('Delete the user error!')

                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('Delete the user error!')

            dispatch(deleteUserFailed());
            console.log("fetchGenderErr: ", e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await editUserService(data);
            console.log('chck edit', res)

            if (res && res.errCode === 0) {
                toast.success('Update the user succeed!')
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())

            } else {
                toast.error('Update the user error!')

                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Update the user error!')

            dispatch(editUserFailed());
            console.log("fetchGenderErr: ", e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllDoctors();

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FECTH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FECTH_ALL_DOCTORS_FAILDED
                })
            }


        } catch (e) {
            console.log('FECTH_ALL_DOCTORS_FAILDED: ', e)
            dispatch({
                type: actionTypes.FECTH_ALL_DOCTORS_FAILDED
            })
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {

        try {
            let res = await saveDetailDoctorService(data);

            if (res && res.errCode === 0) {
                toast.success('Save infor detail doctor succeed!')

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                toast.error('Save infor detail doctor error!')

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
                })
            }


        } catch (e) {
            toast.error('Save infor detail doctor error!')

            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
            })
        }
    }
}
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllCodeService("TIME");

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FECTH_ALLCODE_SCHEDULE_HOUR_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FECTH_ALLCODE_SCHEDULE_HOUR_FAILDED
                })
            }


        } catch (e) {
            console.log('FECTH_ALLCODE_SCHEDULE_HOUR_FAILDED: ', e)
            dispatch({
                type: actionTypes.FECTH_ALLCODE_SCHEDULE_HOUR_FAILDED
            })
        }
    }
}
export const getRequiredDoctorInfor = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE")
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic()
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 && resClinic && resClinic.errCode === 0

            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))

            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log("fetchRequiredDoctorInforErr: ", e)
        }
    }
}
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})
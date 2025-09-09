import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    topDoctors: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state = { ...state };
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;

            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;

            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FECTH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctor;

            return {
                ...state,

            }
        case actionTypes.FECTH_TOP_DOCTOR_FAILDED:
            state.topDoctors = [];

            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;
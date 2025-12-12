import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const creatNewUserService = (data) => {
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('address', data.address);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('gender', data.gender);
    formData.append('role', data.role);
    formData.append('position', data.position);


    formData.append('image', data.image);

    return axios.post('/api/create-new-user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    // return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {

    return axios.delete('/api/delete-user', { data: { id: userId } })
}
// const editUserService = (inputData) => {
//     return axios.put('/api/edit-user', inputData);

// }
const editUserService = (data) => {
    const formData = new FormData();

    formData.append('id', data.id);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('password', data.password);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('gender', data.gender);

    formData.append('roleId', data.roleId);
    formData.append('positionId', data.positionId);

    // Nếu có ảnh mới thì gửi, không thì bỏ qua
    if (data.image instanceof File) {
        formData.append('image', data.image);
    }

    return axios.put('/api/edit-user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

const getAllCodeService = (inputtype) => {
    return axios.get(`/api/allcode?type=${inputtype}`)


}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
}
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data);
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`api/get-detail-doctor-by-id?id=${inputId}`);

}
export {
    handleLoginApi,
    getAllUsers,
    creatNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
}

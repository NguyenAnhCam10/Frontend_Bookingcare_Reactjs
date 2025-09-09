import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const creatNewUserService = (data) => {
    console.log('check data', data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {

    return axios.delete('/api/delete-user', { data: { id: userId } })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);

}
const getAllCodeService = (inputtype) => {
    return axios.get(`/api/allcode?type=${inputtype}`)


}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}
export {
    handleLoginApi,
    getAllUsers,
    creatNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService
}

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

export {
    handleLoginApi,
    getAllUsers,
    creatNewUserService,
    deleteUserService
}

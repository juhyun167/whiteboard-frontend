import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000'
})

const login = async (username, password) => {

}

const logout = async () => {

}

const register = async (displayName, username, password) => {
    try {
        return await axiosInstance.post('/api/user', {
            displayName,
            username,
            password
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const service = {
    login,
    logout,
    register,
}
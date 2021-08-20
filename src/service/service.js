import axios from 'axios'

const axiosInstance = axios.create({
    timeout: 1000,
})

const handleResponse = (response) => {
    return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        data: response.data
    }
}

const handleError = (error) => {
    let result = { success: false }
    if (error.response) {
        result.status = error.response.status
        result.statusText = error.response.statusText
        result.data = error.response.data
    }
    return result
}

const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', {
            username,
            password
        })
        return handleResponse(response)
    } catch (error) {
        return handleError(error)
    }
}

const logout = () => {

}

const register = async (displayName, username, password) => {
    try {
        const response = await axiosInstance.post('/api/user', {
            displayName,
            username,
            password
        })
        return handleResponse(response)
    } catch (error) {
        return handleError(error)
    }
}

export const service = {
    login,
    logout,
    register,
}
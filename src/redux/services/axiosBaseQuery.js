import Axios from '../../services/axios/axios';

const axiosBaseQuery = () => async ({ url, method = "GET", data, params, headers }) => {
    try {
        const result = await Axios({ url, method, data, params, headers })
        return { data: result.data }
    } catch (axiosError) {
        let err = axiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}

export default axiosBaseQuery;
export let service = axios.create({
    baseURL: 'http://192.168.5.7:3000/api',
    timeout: 5000
})

service.interceptors.request.use((config) => {
    config.headers = {
        'Accept': '*/*',
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})
service.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error)
})



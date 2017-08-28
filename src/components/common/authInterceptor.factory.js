const AuthInterceptor = $window => {
    return {
        request: config => {
            config.headers = config.headers || {};
            var token = $window.localStorage.getItem('accessToken');
            if (token && config.useAuthModule) {
                config.headers.Authorization = 'bearer ' + token;
            }
            return config;
        },
        response: response => {
            if (response.status === 401) {
                console.log('Unauthorize');
            }
            return response;
        }
    };
}

AuthInterceptor.$inject = ['$window'];

export default AuthInterceptor;

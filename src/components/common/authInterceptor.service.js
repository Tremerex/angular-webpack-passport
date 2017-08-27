class AuthInterceptor {
    constructor($window) {
        this.$window = $window;
    }
    request = config => {
        config.headers = config.headers || {};
        var token = this.$window.localStorage.getItem('accessToken');
        if (token && config.useAuthModule) {
            config.headers.Authorization = 'bearer ' + token;
        }
        return config;
    }
    response = response => {
        if (response.status === 401) {
            console.log('Unauthorize');
        }
        return response;
    }
}

AuthInterceptor.$inject = ['$window'];

export default AuthInterceptor;

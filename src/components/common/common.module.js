import angular from 'angular';

import ResourceService from './resource.service';
import AuthInterceptor from './authInterceptor.service';

export default angular.module('passport.common', [ 'ngResource' ])
                .service('AuthInterceptor', AuthInterceptor)
                .service('ResourceService', ResourceService)
                .config(['$httpProvider', $httpProvider => $httpProvider.interceptors.push('AuthInterceptor') ]);
                


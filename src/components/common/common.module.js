import angular from 'angular';

import ResourceService from './resource.service';
import AuthInterceptor from './authInterceptor.factory';

export default angular.module('passport.common', [ 'ngResource' ])
                .factory('AuthInterceptor', AuthInterceptor)
                .service('ResourceService', ResourceService)
                .config(['$httpProvider', $httpProvider => $httpProvider.interceptors.push('AuthInterceptor') ]);

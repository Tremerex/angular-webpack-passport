import angular from 'angular';
import { StartController, StartService } from './components/start';

import common from './components/common/common.module';

angular.module('angular-webpack', [ 'passport.common' ])
    .constant('API_URL', '/api/')
    .service('StartService', StartService)
    .controller('StartController', StartController);

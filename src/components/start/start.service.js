export class StartService {
    constructor($q, ResourceService, API_URL) {
        this.$q = $q;
        this.ResourceService = ResourceService;
        this.API_URL = API_URL;
    }
    userLogin(userName, password) {
        let deferred = this.$q.defer();
        let login = this.ResourceService.rest(this.API_URL + 'login', null, false);
        let data = {
            email: userName,
            password: password
        };
        login.save(data, data => {
            deferred.resolve(data);
        }, e => {
            deferred.reject(e);
        });
        return deferred.promise;
    }
    userInfo() {
        let deferred = this.$q.defer();
        let info = this.ResourceService.rest(this.API_URL + 'info', null, true);
        info.get(data => {
            deferred.resolve(data);
        }, e => {
            deferred.reject(e);
        });
        return deferred.promise;
    }
}

StartService.$inject = ['$q', 'ResourceService', 'API_URL']

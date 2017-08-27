export class StartController {
    constructor($window, StartService) {
        this.$window = $window;
        this.StartService = StartService;
    }
    userLogin = () => {
        let _this = this;
        _this.StartService.userLogin(_this.userName, _this.password)
            .then(data => {
                _this.$window.localStorage.setItem('accessToken', data.token);
                _this.message = 'Authorize';
            }).catch(e => {
                _this.message = 'Unauthorize';
            });
    }
    userInfo = () => {
        let _this = this;
        _this.StartService.userInfo(_this.userName).then(data => {
            _this.messageInfo = data.message;
        }).catch(e => {
            _this.message = 'Unauthorize';
        });
    }
}

StartController.$inject = ['$window', 'StartService'];

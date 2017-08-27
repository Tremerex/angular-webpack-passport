class ResourceService {
    constructor($resource) {
        this.$resource = $resource;
    }
    rest(url, params, useAuthModule) {
        return this.$resource(url, params, {
            get: {
                method: 'GET',
                cancellable: true,
                useAuthModule: useAuthModule
            },
            query: {
                method: 'GET',
                cancellable: true,
                isArray: true,
                useAuthModule: useAuthModule
            },
            update: {
                method: 'PUT',
                cancellable: true,
                useAuthModule: useAuthModule
            },
            save: {
                method: 'POST',
                cancellable: true,
                useAuthModule: useAuthModule
            },
            remove: {
                method: 'DELETE',
                cancellable: true,
                useAuthModule: useAuthModule
            }
        });
    }
}

ResourceService.$inject = ['$resource'];

export default ResourceService;

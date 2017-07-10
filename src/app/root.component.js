    angular
        .module('root')
        .component('root', {
            templateUrl: './root.component.html',
            controller: rootController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    function rootController() {
        var $ctrl = this;
    }

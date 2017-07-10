    angular
        .module('root')
        .component('menu', {
            templateUrl: './menu.component.html',
            controller: menuController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    function menuController() {
        var $ctrl = this;
        $ctrl.Name = "Menu";
    }

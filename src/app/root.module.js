angular
    .module('root', ['templates','ui.router'       
    ])
    .config(function($stateProvider,$urlRouterProvider){
        
        $urlRouterProvider.otherwise('/menu');

          $stateProvider

        .state('menu', {
            url: '/menu',
            component: 'menu'
        });
    });
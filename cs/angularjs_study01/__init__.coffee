mainModule = angular.module 'ApplicationMain', []
mainModule.config ($interpolateProvider) ->
    $interpolateProvider.startSymbol '[['
    $interpolateProvider.endSymbol ']]'    


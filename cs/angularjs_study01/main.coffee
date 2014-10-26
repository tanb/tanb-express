#import __init__


class BaseView
    @register: (module) ->
        ctlName = @toString().match(/function\s*(.*?)\(/)?[1]
        module.controller ctlName, @


class MainView extends BaseView
    @register mainModule
    constructor: ->
        @tokens = [1..10]

        
class HelloView extends BaseView
    @register mainModule
    
    initWithAngle: (token) ->
        @_setName token
        
    _setName: (token) ->
        @name = "I'm " + token

    buttonClicked: ->
        @name = "button was clicked"






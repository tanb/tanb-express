#import views

class MainViewController extends BNViewController
    constructor: () ->
        super

    loadView: () ->
        super
        myView = new MainView()
        this.view = myView

    viewDidLoad: () ->
        super
        # register for resize event handler.
        self = this
        $(window).bind('resize', (event)-> 
            self.resizeWindow(event)
        );
        this.view.githubBtn._$elm.bind('click', (event) ->
            location.href = 'http://github.com/tanb'
        );
    resizeWindow: (event) ->
        this.layoutSubviews()

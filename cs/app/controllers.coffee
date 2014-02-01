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
        this.view.githubBtn._$elm.bind('click', (event) ->
            location.href = 'http://github.com/tanb'
        );


class RootViewController extends BNNavigationController
    constructor: (firstViewController) ->
        super(firstViewController)

    didResizeWindow: (event) ->
        # rootViewController protocol
        this.layoutSubviews()

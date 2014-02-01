#import views

class SubViewController extends BNNavigationController
    constructor: (firstViewController) ->
        super(firstViewController)

    loadView: () ->
        super
        this.view.frame = {
            x: 0,
            y: 0,
            width: 320,
            height: 480
        }


class MainViewController extends BNViewController
    constructor: () ->
        super

    loadView: () ->
        super
        this.view = new MobileFirstView()


class RootViewController extends BNViewController
    constructor: () ->
        super
        firstViewController = new MainViewController()
        this.subViewController = new SubViewController(firstViewController)

    loadView: () ->
        super
        myView = new MainView()
        this.view = myView
        this.mobileView = this.subViewController.view
        this.view.addSubview(this.mobileView)

    viewDidLoad: () ->
        super
        # register for resize event handler.
        this.view.githubBtn._$elm.bind('click', (event) ->
            location.href = 'http://github.com/tanb'
        );

    didResizeWindow: (event) ->
        # rootViewController protocol
        this.layoutSubviews()

    layoutSubviews: () ->
        super
        x = (this.view.frame.width - this.mobileView.frame.width) / 2
        y = (this.view.frame.height - this.mobileView.frame.height) / 2
        frame = this.mobileView.frame
        frame.x = x
        frame.y = y
        this.mobileView.frame = frame
        this.subViewController.layoutSubviews()

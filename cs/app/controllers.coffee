#import views

class MobileRootViewController extends BNNavigationController
    constructor: (firstViewController) ->
        super(firstViewController)

    loadView: () ->
        super
        this.view.frame = {
            x: 0,
            y: 0,
            width: 320,
            height: 568,
        }

    didResizeWindow: (event) ->
        # rootViewController protocol
        if $(window).outerHeight() <= 320
            $('html, body').css({
                'height': 320,
            });
        else if $(window).outerHeight() <= 568
            $('html, body').css({
                'height': 568,
            });
        this.layoutSubviews()


class MainViewController extends BNViewController
    constructor: () ->
        super

    loadView: () ->
        super
        this.view = new MobileFirstView()
        githubBtn = new BNButton()
        githubBtn.setTitle("tanB's Github Profile")
        githubBtn.frame = {
            x: 0,
            y: 0,
            width: 160,
            height: 35,
        }
        this._rightBarButton = githubBtn

    viewDidLoad: () ->
        super
        # register for resize event handler.
        this._rightBarButton._$elm.bind('click', (event) ->
            location.href = 'http://github.com/tanb'
        );


class RootViewController extends BNViewController
    constructor: () ->
        super
        firstViewController = new MainViewController()
        this.subViewController = new MobileRootViewController(firstViewController)

    loadView: () ->
        super
        myView = new MainView()
        
        this.view = myView
        this.mobileView = this.subViewController.view
        this.mobileView.clipsToBounds = true
        this.mobileView._$elm.css({
            'box-sizing': 'border-box',
            'border-radius': 5,
            'border': '1px solid #ccc'
        })
        this.view.addSubview(this.mobileView)

    viewDidLoad: () ->
        super

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

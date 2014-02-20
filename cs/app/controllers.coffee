#import views


class MobileMainViewController extends BNViewController
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


class MobileRootViewController extends BNNavigationController
    constructor: () ->
        super(new MobileMainViewController())

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
        this.view = new MainView()
        githubBtn = new BNButton()
        githubBtn.setTitle("tanB's Github Profile")
        githubBtn.frame = {
            x: 0,
            y: 0,
            width: 160,
            height: 35,
        }
        this._rightBarButton = githubBtn

        iconView = new BNImageView()
        iconView.frame = {
            x: 0,
            y: 0,
            width: 35,
            height: 35,
        }
        iconView.src = '/img/logo.png'
        iconView.circularize = true;
        this._leftBarButton = iconView

    viewDidLoad: () ->
        super
        # register for resize event handler.
        this._rightBarButton._$elm.bind('click', (event) ->
            location.href = 'http://github.com/tanb'
        );


class RootViewController extends BNNavigationController
    constructor: () ->
        super(new MainViewController())

    loadView: () ->
        super

    viewDidLoad: () ->
        super

    didResizeWindow: (event) ->
        # rootViewController protocol
        this.layoutSubviews()

    layoutSubviews: () ->
        super

class @BNView
    constructor: () ->
        this._$elm = $('<div />')
        this._$elm.addClass(this.constructor.name)
        this._subviews = []
        this._$elm.css({
            position: 'absolute',
                })
        this.superview = null
        this._clipsToBounds = false
        
    @property 'frame',
        get: () ->
            origin = this._$elm.offset()
            frame = {
                x: origin.left,
                y: origin.top,
                width: this._$elm.outerWidth(),
                height: this._$elm.outerHeight()
            }
            return frame
        set: (frame) ->
            this._$elm.css({
                left: frame.x + "px",
                top: frame.y + "px",
            });
            this._$elm.outerWidth(frame.width)
            this._$elm.outerHeight(frame.height)

    addSubview: (view) ->
        this._$elm.append(view._$elm)
        this._subviews.push(view)
        view.superview = this

    @property 'subviews',
        get: () ->
            return this._subviews
        set: () ->
            # do nothing
            return

    layoutSubviews: () ->
        if this._clipsToBounds
            this._$elm.css({
                'overflow': 'hidden'
            })
        else
            this._$elm.css({
                'overflow': 'auto'
            })

        $.each this._subviews,
            (idx, view) ->
                view.layoutSubviews()

    @property 'clipsToBounds',
        get: () ->
            return this._clipsToBounds
        set: (clip) ->
            this._clipsToBounds = clip

class @BNImageView extends BNView
    constructor: () ->
        super
        this._$img = $('<img />')
        this._$img.bind('load', $.proxy(() ->
            this.didLoadImage()
        , this))
        this._$img.css({
            'display': 'inline-block',
            'position': 'absolute',
            '-webkit-user-select': 'none',
            '-webkit-user-drag': 'none',
        })
        this._$elm.append(this._$img)
        this._circularize = false

    didLoadImage: () ->
        this.sizeToFit()

    sizeToFit: () ->
        orgW = this._$img[0].naturalWidth
        orgH = this._$img[0].naturalHeight
        imgW = this.frame.width
        imgH = this.frame.height

        absDW = imgW - orgW
        absDH = imgH - orgH
        scale = 1
        if absDW < absDH
            scale = imgH / orgH
        else
            scale = imgW / orgW
        
        newW = orgW * scale
        newH = orgH * scale

        cX = ((imgW - newW) / 2)
        cY = ((imgH - newH) / 2)

        this._$img.css({
            'left': cX,
            'top': cY,
            'width': newW,
            'height': newH,
        })

    @property 'src',
        get: () ->
            return this._$img.attr('src')
        set: (src) ->
            this._$img.attr('src', src)

    @property 'frame',
        get: () ->
            BNImageView.__super__.__lookupGetter__('frame').apply(this, arguments)
        set: (frame) ->
            BNImageView.__super__.__lookupSetter__('frame').apply(this, arguments)

    @property 'circularize',
        get: () ->
            return this._circularize;
        set: (bool) ->
            this._circularize = bool;
            if bool
                this._$img.css({'border-radius': '100%'});
            else
                this._$img.css({'border-radius': '0%'});


class @BNViewController
    constructor: () ->
        this._view = null
        this._rightBarButton = null
        
    @property 'view',
        get: () ->
            if this._view
                return this._view
    
            this.loadView()
            this.viewDidLoad()
            return this._view

        set: (view) ->
            this._view = view

    loadView: () ->
        this._view = new BNView();

    viewDidLoad: () ->
        this.layoutSubviews()

    layoutSubviews: () ->
        this._view.layoutSubviews()


class @BNNavigationController extends BNViewController
    constructor: (firstViewController) ->
        super
        this.viewControllers = [firstViewController]
        this._containerView = null
        this._BAR_HEIGHT = 50
        
    @property 'view',
        get: () ->
            if this._containerView
                return this._containerView
    
            this.loadView()
            this.viewDidLoad()
            return this._containerView

        set: (frame) ->
            # do nothing
            return

    loadView: () ->
        this._containerView = new BNView();
        view = this.topViewController.view
        view.frame = {
            x: 0,
            y: 0,
            width: this._containerView.frame.width,
            height: this._containerView.frame.height
        }
        this._containerView.addSubview(view)

        # discussion: should create _NavigationContainerView
        this.navigationBar = new BNView();
        this.navigationBar._$elm.addClass('navbar navbar-static-top')
        this.navigationBar._$elm.css({
            'background-color': 'rgba(221, 221, 221, 0.5)'
        })
        navContainer = $('<div />')
        navContainer.addClass('container')
        this.navigationBar._$elm.append(navContainer)

        this.navigationBar.frame = {
            x: 0,
            y: 0,
            width: this._containerView.frame.width,
            height: this._BAR_HEIGHT
        }
        this._containerView.addSubview(this.navigationBar)
        
    @property 'topViewController',
        get: () ->
            return this.viewControllers[0]

        set: () ->
            # do nothing
            return

    layoutSubviews: () ->
        # discussion: should create _NavigationContainerView
        this.topViewController.view.frame = {
            x: 0,
            y: 0,
            width: this._containerView.frame.width,
            height: this._containerView.frame.height
        }
        this.navigationBar.frame = {
            x: 0,
            y: 0,
            width: this._containerView.frame.width,
            height: this._BAR_HEIGHT
        }

        if this.topViewController._rightBarButton
            _rightBarButton = this.topViewController._rightBarButton
            rBtnX = this._containerView.frame.width - _rightBarButton.frame.width - 8
            rBtnY = 8
            rBtnFrame = _rightBarButton.frame
            rBtnFrame.x = rBtnX
            rBtnFrame.y = rBtnY
            _rightBarButton.frame = rBtnFrame

            this.navigationBar.addSubview(_rightBarButton)

        this._containerView.layoutSubviews()


class @BNControl extends BNView
    constructor: () ->
        super
        this.enabled = true
        this.selected = false


class @BNButton extends BNControl
    constructor: () ->
        super
        this._$elm.addClass('btn btn-default')

    setTitle: (title) ->
        this._$elm.text(title)

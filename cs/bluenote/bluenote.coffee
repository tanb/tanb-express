class @BNView
    constructor: () ->
        this._$elm = $('<div />')
        this._$elm.addClass(this.constructor.name)
        this._subviews = []
        this._$elm.css({
            position: 'absolute',
                })
        this.superview = null
        
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
        $.each this._subviews,
            (idx, view) ->
                view.layoutSubviews


class @BNImageView extends BNView
    constructor: () ->
        super
        this._$img = $('<img />')
        this._$img.css({
            '-webkit-user-select': 'none',
            '-webkit-user-drag': 'none',
        })
        this._$elm.append(this._$img)
        this._circularize = false
        
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
            this._$img.css({
                'width': frame.width,
                'height': frame.height,
            })

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

    @property 'view',
        get: () ->
            if this._view
                return this._view
    
            this.loadView()
            this.viewDidLoad()
            return this._view
        set: (view) ->
            view._$elm.css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': $(window).outerWidth(),
                'height': $(window).outerHeight(),
            });
            this._view = view

    loadView: () ->
        this._view = new BNView();
        this._view._$elm.css({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': $(window).outerWidth(),
            'height': $(window).outerHeight(),
        });    

    viewDidLoad: () ->
        this.layoutSubviews()

    layoutSubviews: () ->
        frame = this._view.frame
        frame.width = $(window).outerWidth()
        frame.height = $(window).outerHeight()
        this._view.frame = frame
        this._view.layoutSubviews()



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

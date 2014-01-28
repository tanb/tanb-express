class @BNView
    constructor: () ->
        this._$elm = $('<div />')
        this._$elm.addClass(this.constructor.name)
        this._subviews = []
    
    @property 'frame',
        get: () ->
            frame = {
                width: this._$elm.width(),
                height: this._$elm.height()
            }
            return frame
        set: (frame) ->
            this._$elm.width(frame.width)
            this._$elm.height(frame.height)

    addSubView: (view) ->
        this._$elm.append(view._$elm)
        this._subviews.push(view)

    @property 'subviews',
        get: () ->
            return this._subviews
        set: () ->
            return


class @BNImageView extends BNView
    constructor: () ->
        super
        this._$img = $('<img />')
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
                'top': '0px',
                'left': '0px',
                'width': '100%',
                'height': '100%',
            });
            this._view = view

    loadView: () ->
        this._view = new BNView();
        this._view._$elm.css({
            'position': 'absolute',
            'top': '0px',
            'left': '0px',
            'width': '100%',
            'height': '100%',
        });    
    viewDidLoad: () ->
        return

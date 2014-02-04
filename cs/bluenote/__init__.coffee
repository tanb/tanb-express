# init
$('document').ready ->
    $('html, body').css({
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        '-webkit-user-select': 'none',
        '-webkit-user-drag': 'none',
    });
    window._$elm = $('body')
    window._subviews = []
    window.superview = null;
    window.__resize_event_timer = false;
    window.addSubview = (view) ->
        view.frame = {
            x: 0,
            y: 0,
            width: $(window).outerWidth(),
            height: $(window).outerHeight(),
        }
        # discussion: should not reference rootViewController directly
        window.rootViewController.layoutSubviews()
        window._$elm.append(view._$elm)
        window._subviews.push(view)
        view.superview = window

    $(window).bind('resize', (event)->
        if window.__resize_event_timer
            clearTimeout(window.__resize_event_timer);
        
        window.__resize_event_timer = setTimeout(() ->
            if window.rootViewController
                window.rootViewController.view.frame = {
                    x: 0,
                    y: 0,
                    width: $(window).outerWidth(),
                    height: $(window).outerHeight(),
                }
                window.rootViewController.didResizeWindow(event)
        , 300); 
    );

Function::property = (prop, desc) ->
    Object.defineProperty @prototype, prop, desc

Object.defineProperty window, 'subviews',
    get: () ->
        return window._subviews
    set: () ->
        return

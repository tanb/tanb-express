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
    window.addSubview = (view) ->
        window._$elm.append(view._$elm)
        window._subviews.push(view)
        view.superview = window

Function::property = (prop, desc) ->
    Object.defineProperty @prototype, prop, desc

Object.defineProperty window, 'subviews',
    get: () ->
        return window._subviews
    set: () ->
        return

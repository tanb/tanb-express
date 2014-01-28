# init

$('document').ready ->
  $('html, body').css({
    'width': '100%',
    'height': '100%',
  });
  
Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

Object.defineProperty window, 'subviews',
  get: () ->
    return window._subviews
  set: () ->
    return

window._subviews = []
window.addSubView = (view) ->
  $('body').append(view._$elm)
  window._subviews.push(view)

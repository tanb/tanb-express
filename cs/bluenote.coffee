# namespace for bluenote
window.BN = {'__domain__': 'bluenote'}

Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

window._subviews = []
window.addSubView = (view) ->
  $('body').append(view._$elm)
  window._subviews.push(view)

Object.defineProperty window, 'subviews',
  get: () ->
    return window._subviews
  set: () ->
    return

class BN.View
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

class BN.ViewController
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
      this._view = view

  loadView: () ->
    console.log "loadView"
    this._view = new BN.View();

  viewDidLoad: () ->
    console.log "viewDidLoad"


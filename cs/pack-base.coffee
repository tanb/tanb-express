UI = window

Function::property = (prop, desc) ->
    Object.defineProperty @prototype, prop, desc

class UI.View
  constructor: () ->
    this._$elm = $('<div />')
    this._$elm.addClass(this.constructor.name)

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

class UI.CustomView extends UI.View
  constructor: () ->
    super



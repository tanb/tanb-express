TB = window
  
class TB.View
  constructor: () ->
    console.log('TBView')

class TB.CustomView extends TB.View
  constructor: () ->
    super
    console.log('TBCustomView')

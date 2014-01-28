class TB.MainViewController extends BN.ViewController
  constructor: () ->
    super
  loadView: () ->
    super
    myView = new TB.CustomView()
    this.view.addSubView(myView)
    image = new BN.ImageView();
    frame = {
      'width': '100px',
      'height': '100px',
    }
    image.frame = frame
    image.src = '/img/logo.png'
    image.circularize = true;
    myView.addSubView(image)


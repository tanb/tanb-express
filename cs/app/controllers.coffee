#import views.coffee

class MainViewController extends BNViewController
    constructor: () ->
        super
    loadView: () ->
        super
        myView = new CustomView()
        this.view.addSubView(myView)
        image = new BNImageView();
        frame = {
            'width': '100px',
            'height': '100px',
        }
        image.frame = frame
        image.src = '/img/logo.png'
        image.circularize = true;
        myView.addSubView(image)


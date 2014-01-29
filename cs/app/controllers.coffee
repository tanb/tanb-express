#import views

class MainViewController extends BNViewController
    constructor: () ->
        super
    loadView: () ->
        myView = new MainView()
        this.view = myView


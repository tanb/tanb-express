class MainView extends BNView
    constructor: () ->
        super
        image = new BNImageView()
        frame = {
            'width': '45px',
            'height': '45px',
        }
        image.frame = frame
        image.src = '/img/logo.png'
        image.circularize = true;
        this.addSubView(image)

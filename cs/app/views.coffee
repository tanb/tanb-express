class MobileFirstView extends BNView
    constructor: () ->
        super

        this.backgroundView = new BNImageView()
        this.backgroundView.frame = {
            x: 0,
            y: 0,
            width: this.frame.width,
            height: this.frame.height,
        }
        this.backgroundView.src = 'http://distilleryimage6.ak.instagram.com/1ac7562c8c4d11e3b8b3124b6b221cf2_8.jpg'
        this.backgroundView.clipsToBounds = true
        this.addSubview(this.backgroundView)

        agent = navigator.userAgent;
        this.imageView = null
        
        if agent.search(/iPhone/) != -1        
            this.imageView = new BNImageView()
            this.imageView.frame = {
                x: 0,
                y: 0,
                width: 45,
                height: 45,
            }
            this.imageView.src = '/img/logo.png'
            this.imageView.circularize = true;
            this.addSubview(this.imageView)

    layoutSubviews: () ->
        super

        this.backgroundView.frame = {
            x: 0,
            y: 0,
            width: this.frame.width,
            height: this.frame.height,
        }

        if this.imageView
            imgFrame = this.imageView.frame
            imgX = 8
            imgY = this.frame.height - imgFrame.height - 8
            imgFrame.x = imgX
            imgFrame.y = imgY
            this.imageView.frame = imgFrame


class MainView extends BNView
    constructor: () ->
        super

        this.topFaceView = new TopFaceView()
        this.topFaceView.frame = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
        this.addSubview(this.topFaceView)

        this.pageName = new BNView()
        this.pageName.frame = {
            x: 0,
            y: 0,
            width: 500,
            height: 85,
        }
        this.pageName._$elm.text('RATS IN THE GRID')
        this.pageName._$elm.css({
            'font-family': "'Oswald', sans-serif",
            'font-size': 70,
        })
        this.pageName.clipsToBounds = true
        this.addSubview(this.pageName)
                                                
        this.imageView = new BNImageView()
        this.imageView.frame = {
            x: 0,
            y: 0,
            width: 45,
            height: 45,
        }
        this.imageView.src = '/img/logo.png'
        this.imageView.circularize = true;
        this.addSubview(this.imageView)

    layoutSubviews: () ->
        super

        topFaceViewSize = this.topFaceView.getSize();

        pageNameFrame = this.pageName.frame
        pageNameFrame.x = ($(window).outerWidth() - topFaceViewSize.width) / 2
        pageNameFrame.y = ($(window).outerHeight() - topFaceViewSize.height) / 2 - pageNameFrame.height - 5

        this.pageName.frame = pageNameFrame
        
        imgFrame = this.imageView.frame
        imgX = 8
        imgY = this.frame.height - imgFrame.height - 8
        imgFrame.x = imgX
        imgFrame.y = imgY
        this.imageView.frame = imgFrame


class TopFaceView extends BNView
    constructor: () ->
        super
        this.imageSize = {
            width: 320,
            height: 568,
        }
        this.margin = 8
        this.imagePaths = [
            'http://distilleryimage6.ak.instagram.com/1ac7562c8c4d11e3b8b3124b6b221cf2_8.jpg',
            'http://distilleryimage9.ak.instagram.com/b36dce02f35011e1942b123138190f7f_7.jpg',
            'http://distilleryimage0.ak.instagram.com/4b0d27c68d0b11e3a36d0efe2ecb7f88_8.jpg',
        ]
        this.imageViews = [];
        for path, idx in this.imagePaths
            backgroundView = new BNImageView()
            backgroundView.frame = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }
            backgroundView.src = path
            backgroundView.clipsToBounds = true
            backgroundView._$img.css({
                '-webkit-filter': 'brightness(1) grayscale(1)',
            })
            this.imageViews.push(backgroundView)
            this.addSubview(backgroundView)

    getSize: () ->
        size = {
            width: (this.imageSize.width + this.margin) * this.imageViews.length - this.margin,
            height: this.imageSize.height
        }
        return size

    layoutSubviews: () ->
        super
        size = this.getSize()
        
        mainFrame = this.frame
        mainFrame.width = size.width
        mainFrame.height = size.height
        mainFrame.x = ($(window).outerWidth() - mainFrame.width) / 2
        mainFrame.y = ($(window).outerHeight() - mainFrame.height) / 2
        this.frame = mainFrame

        for imageView, idx in this.imageViews
            imageView.frame = {
                x: idx * (this.imageSize.width + this.margin),
                y: 0,
                width: this.imageSize.width,
                height: this.imageSize.height,
            }

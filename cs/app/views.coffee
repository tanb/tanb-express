class MainView extends BNView
    constructor: () ->
        super

        agent = navigator.userAgent;
        this.imageView = null
        
        if agent.search(/iPhone/) == -1        
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

        if this.imageView
            imgFrame = this.imageView.frame
            imgX = 8
            imgY = this.frame.height - imgFrame.height - 8
            imgFrame.x = imgX
            imgFrame.y = imgY
            this.imageView.frame = imgFrame


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

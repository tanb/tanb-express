#import __init__
#import controllers

$(document).ready ->
    window.viewController = new MainViewController()
    window.addSubview(viewController.view)

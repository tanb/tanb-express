#import __init__
#import controllers

$(document).ready ->
    window.rootViewController = new RootViewController(new MainViewController())
    window.addSubview(window.rootViewController.view)

#import __init__
#import controllers

$(document).ready ->
    window.rootViewController = new RootViewController()
    window.addSubview(window.rootViewController.view)

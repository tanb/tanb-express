#import __init__
#import controllers

$(document).ready ->
    agent = navigator.userAgent;
    if agent.search(/iPhone/) != -1
        window.rootViewController = new MobileRootViewController()
    else
        window.rootViewController = new RootViewController()
    window.addSubview(window.rootViewController.view)

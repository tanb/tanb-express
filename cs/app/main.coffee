#import __init__
#import controllers

$(document).ready ->
    agent = navigator.userAgent;
    if agent.search(/iPhone/) != -1
        window.rootViewController = new MobileRootViewController(new MainViewController())
        $('html, body').css({
            'height': 568,
        });
    else
        window.rootViewController = new RootViewController()
    window.addSubview(window.rootViewController.view)

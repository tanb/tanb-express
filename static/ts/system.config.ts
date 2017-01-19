declare class System {
    static config(object: any): void;
    static import(path: string): Promise<void>;
}

var map = {
    '@angular': 'static/lib/js/@angular',
};
var packages = {
    'static/js': {
        defaultExtension: 'js'
    },
};
var bundles = {
    'static/js/Rx.min.js': [
        'rxjs/*',
        'rxjs/operator/*',
        'rxjs/observable/*',
        'rxjs/add/operator/*',
        'rxjs/add/observable/*',
        'rxjs/util/*'
    ]
};
var ngPackageNames = [
    'common',
    'core',
    'router-deprecated',
    'compiler',
    'platform-browser-dynamic',
    'http',
    'platform-browser',
    'router',
    'upgrade',
];
ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
});
var config = {
    map: map,
    packages: packages,
    bundles: bundles
}

System.config(config);
System.import("static/js/main").then(null, console.error.bind(console));

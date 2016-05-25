declare class System {
    static config(object: any): void;
    static import(path: string): Promise<void>;
}

var map = {
    '@angular': 'static/lib/js/@angular',
    'rxjs': 'static/lib/js/rxjs',
};
var packages = {
    'rxjs': { defaultExtension: 'js' },
    'static/js': {
        defaultExtension: 'js'
    },
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
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
});
var config = {
    map: map,
    packages: packages
}

System.config(config);
System.import("static/js/main").then(null, console.error.bind(console));

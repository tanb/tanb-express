// declare class Promise<T> {
//     then<U>(onFulfilled?: any, onRejected?: (error: any) => void): void;
// }
declare class System {
    static config(object: any): void;
    static import(path: string): Promise<void>;
}
System.config({
    packages: {
        'static/js': {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import("static/js/main").then(null, console.error.bind(console));

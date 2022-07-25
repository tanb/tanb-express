# tanb.express

Powered by [Netlify](https://www.netlify.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/f41a796c-7455-452d-bad8-e151144f6b90/deploy-status)](https://app.netlify.com/sites/eloquent-fermi-3b5ccc/deploys)

Automated deployment using Netlify.

All photos and pictures are copyrighted material. Code released under the MIT license. [See LICENSE file](LICENSE.md).


## Development server

Run `ng build --watch` and Run `ng scully --watch`

The server is available on "http://localhost:1668/". The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-c production` option for a production build.

## SEO

### SSG (Static Site Generator)

[Scully](https://scully.io/): The Static Site Generator for Angular apps.

This is the perfect article for creating an Angular static site with scully on netlify. https://www.netlify.com/blog/2020/07/14/creating-an-angular-jamstack-blog/

## v13 to v14 Migration log

** Executing migrations of package '@angular/core' **

❯ As of Angular version 13, `entryComponents` are no longer necessary.
  Migration completed.

❯ In Angular version 14, the `pathMatch` property of `Routes` was updated to be a strict union of the two valid options: `'full'|'prefix'`.
  `Routes` and `Route` variables need an explicit type so TypeScript does not infer the property as the looser `string`.
  Migration completed.

❯ As of Angular version 14, Forms model classes accept a type parameter, and existing usages must be opted out to preserve backwards-compatibility.
UPDATE src/app/modal/contact-me/contact-me.component.ts (2445 bytes)
  Migration completed.

** Executing migrations of package '@angular/cli' **

❯ Remove 'defaultProject' option from workspace configuration.
  The project to use will be determined from the current working directory.
UPDATE angular.json (4541 bytes)
  Migration completed.

❯ Remove 'showCircularDependencies' option from browser and server builders.
  Migration completed.

❯ Replace 'defaultCollection' option in workspace configuration with 'schematicCollections'.
  Migration completed.

❯ Update Angular packages 'dependencies' and 'devDependencies' version prefix to '^' instead of '~'.
UPDATE package.json (2385 bytes)
✔ Packages installed successfully.
  Migration completed.

❯ Remove 'package.json' files from library projects secondary entrypoints.
  Migration completed.

❯ Update TypeScript compilation target to 'ES2020'.
UPDATE tsconfig.json (543 bytes)
  Migration completed.

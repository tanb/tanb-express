# Makefile
# tanb.github.io

STATIC_LIB_DIR=static/lib
STATIC_COMPILED_JS_DIR=static/js
STATIC_COMPILED_CSS_DIR=static/css
NODE_MODULES=$(CURDIR)/node_modules
GULP=$(NODE_MODULES)/.bin/gulp

DEST=

DEVHOST=localhost
DEVPORT=8080

# Versions
JQUERY_VERSION=1.12.2
BOOTSTRAP_VERSION=3.3.6

node-modules:
	npm install

dir:
	mkdir -p $(STATIC_LIB_DIR)/css
	mkdir -p $(STATIC_LIB_DIR)/js
	mkdir -p $(STATIC_LIB_DIR)/fonts
	mkdir -p $(STATIC_LIB_DIR)/img

lib: dir cp-lib-angular2
	curl https://code.jquery.com/jquery-$(JQUERY_VERSION).min.js -o "$(STATIC_LIB_DIR)/js/jquery.min.js"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/css/{bootstrap.css} -o "$(STATIC_LIB_DIR)/css/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/css/{bootstrap.min.css} -o "$(STATIC_LIB_DIR)/css/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/css/{bootstrap.min.css.map} -o "$(STATIC_LIB_DIR)/css/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/js/{bootstrap.js} -o "$(STATIC_LIB_DIR)/js/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/js/{bootstrap.min.js} -o "$(STATIC_LIB_DIR)/js/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/fonts/{glyphicons-halflings-regular.eot} -o "$(STATIC_LIB_DIR)/fonts/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/fonts/{glyphicons-halflings-regular.svg} -o "$(STATIC_LIB_DIR)/fonts/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/fonts/{glyphicons-halflings-regular.ttf} -o "$(STATIC_LIB_DIR)/fonts/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/fonts/{glyphicons-halflings-regular.woff} -o "$(STATIC_LIB_DIR)/fonts/#1"
	curl https://maxcdn.bootstrapcdn.com/bootstrap/$(BOOTSTRAP_VERSION)/fonts/{glyphicons-halflings-regular.woff2} -o "$(STATIC_LIB_DIR)/fonts/#1"
	curl https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/{jquery.cookie.js} -o "$(STATIC_LIB_DIR)/js/#1"

cp-lib-angular2: node-modules
	mkdir -p $(STATIC_LIB_DIR)/js/es6-shim
	cp  $(NODE_MODULES)/es6-shim/es6-shim.min.js $(STATIC_LIB_DIR)/js/es6-shim/es6-shim.min.js
	cp $(NODE_MODULES)/es6-shim/es6-shim.map $(STATIC_LIB_DIR)/js/es6-shim/es6-shim.map
	mkdir -p $(STATIC_LIB_DIR)/js/systemjs/dist
	cp $(NODE_MODULES)/systemjs/dist/system-polyfills.js $(STATIC_LIB_DIR)/js/systemjs/dist/system-polyfills.js
	cp $(NODE_MODULES)/systemjs/dist/system-polyfills.js.map $(STATIC_LIB_DIR)/js/systemjs/dist/system-polyfills.js.map
	mkdir -p $(STATIC_LIB_DIR)/js/angular2/es6/dev/src/testing
	cp $(NODE_MODULES)/angular2/es6/dev/src/testing/shims_for_IE.js $(STATIC_LIB_DIR)/js/angular2/es6/dev/src/testing/shims_for_IE.js
	mkdir -p $(STATIC_LIB_DIR)/js/angular2/bundles
	cp $(NODE_MODULES)/angular2/bundles/angular2-polyfills.js $(STATIC_LIB_DIR)/js/angular2/bundles/angular2-polyfills.js
	mkdir -p $(STATIC_LIB_DIR)/js/systemjs/dist
	cp $(NODE_MODULES)/systemjs/dist/system.src.js $(STATIC_LIB_DIR)/js/systemjs/dist/system.src.js
	mkdir -p $(STATIC_LIB_DIR)/js/rxjs/bundles
	cp $(NODE_MODULES)/rxjs/bundles/Rx.js $(STATIC_LIB_DIR)/js/rxjs/bundles/Rx.js
	mkdir -p $(STATIC_LIB_DIR)/js/angular2/bundles
	cp $(NODE_MODULES)/angular2/bundles/angular2.dev.js $(STATIC_LIB_DIR)/js/angular2/bundles/angular2.dev.js
	cp $(NODE_MODULES)/angular2/bundles/router.dev.js $(STATIC_LIB_DIR)/js/angular2/bundles/router.dev.js
	cp $(NODE_MODULES)/angular2/bundles/http.dev.js $(STATIC_LIB_DIR)/js/angular2/bundles/http.dev.js

run-with-watch:
	$(GULP) run-with-watch --host=$(DEVHOST) --port=$(DEVPORT)

static-build:
	$(GULP) build


#
# Deploy
#
build: clean-dist clean-compiled-dir static-build package

package: clean-dist
	rm -rf $(CURDIR)/dist
	mkdir -p $(CURDIR)/dist
	cp $(CURDIR)/index.html $(CURDIR)/dist/
	cp $(CURDIR)/keybase.txt $(CURDIR)/dist/
	cp $(CURDIR)/robots.txt $(CURDIR)/dist/
	mkdir $(CURDIR)/dist/static
	cp -r $(CURDIR)/static/js $(CURDIR)/dist/static/
	cp -r $(CURDIR)/static/css $(CURDIR)/dist/static/
	cp -r $(CURDIR)/static/templates $(CURDIR)/dist/static/
	cp -r $(CURDIR)/static/img $(CURDIR)/dist/static/
	cp -r $(CURDIR)/static/lib $(CURDIR)/dist/static/

#
# Clean up
#
clean-dist:
	rm -rf $(CURDIR)/dist/

clean-compiled-dir:
	rm -rf $(STATIC_COMPILED_JS_DIR)
	rm -rf $(STATIC_COMPILED_CSS_DIR)

clean-lib:
	rm -rf $(STATIC_LIB_DIR)

clean-node-modules:
	rm -rf $(CURDIR)/node_modules

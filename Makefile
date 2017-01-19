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
	$(GULP) cp-lib-angular2

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

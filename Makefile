# Makefile
# tanb.github.io

NODE_MODULES=$(CURDIR)/node_modules

node-modules:
	yarn install

clean-node-modules:
	rm -rf $(CURDIR)/node_modules

clean-dist:
	rm -rf $(CURDIR)/dist

build:
	yarn ng build
	yarn run prerender

release-build:
	yarn ng build --prod
	yarn run prerender

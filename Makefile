# Makefile
# tanb.github.io

NODE_MODULES=$(CURDIR)/node_modules

node-modules:
	yarn install --production=false

node-modules-production:
	yarn install --production=true

clean-node-modules:
	rm -rf $(CURDIR)/node_modules

clean-dist:
	rm -rf $(CURDIR)/dist

build:
	ng build

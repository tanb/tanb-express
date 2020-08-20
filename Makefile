# Makefile
# tanb.github.io

NODE_MODULES=$(CURDIR)/node_modules

PHONY: 

run:
	yarn run start

node-modules:
	yarn install

clean-node-modules:
	rm -rf $(CURDIR)/node_modules

clean-dist:
	rm -rf $(CURDIR)/dist

build:
	yarn run build

release-build:
	yarn run build:release

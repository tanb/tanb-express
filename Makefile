#
# Makefile for tanb.github.io
#


NODEDIR = $(CURDIR)/node
NPM = `which npm`
JEKYLL = `whitch jekyll`
COFFEE = $(NODEDIR)/node_modules/coffee-script/bin/coffee
JSDIR = $(CURDIR)/js
CSDIR = $(CURDIR)/cs

install_requisite:
	cd $(NODEDIR);\
	$(NPM) install coffee-script;

run:
	$(JEKYLL) serve;

watch:
	$(COFFEE) --join packed.js -cw $(CSDIR)/*.coffee
